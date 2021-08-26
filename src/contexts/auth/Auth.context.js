import {
  useContext, createContext, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import * as firebaseUtils from '../../firebase/firebase.utils';

const AuthContext = createContext();
const { auth } = firebaseUtils;

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [customClaims, setCustomClaims] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [preventRedirect, setPreventRedirect] = useState(false);
  const [preventUsernamePrompt, setPreventUsernamePrompt] = useState(false);

  const setUsernameBackend = async (formattedUsername) => {
    const retrievedIdToken = await auth.currentUser.getIdToken();
    await axios.post(
      `${process.env.REACT_APP_BACKEND_API}users`,
      {
        username: formattedUsername,
      },
      {
        headers: {
          Authorization: `Bearer ${retrievedIdToken}`,
        },
      },
    );
    await auth.currentUser.getIdTokenResult(true).then((idTokenResult) => {
      if (idTokenResult.claims) {
        setCustomClaims(idTokenResult.claims);
      }
    });
  };

  const register = async (email, password, name = '', username) => {
    const userCredentials = await firebaseUtils.createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    await firebaseUtils.updateProfile(userCredentials.user, {
      displayName: name,
    });
    await firebaseUtils.sendEmailVerification(userCredentials.user);
    await setUsernameBackend(username);
  };

  const login = (email, password) => (
    firebaseUtils.signInWithEmailAndPassword(auth, email, password)
  );

  const logout = async () => {
    await auth.signOut();
    setCustomClaims(null);
  };

  const resetPassword = (email) => firebaseUtils.sendPasswordResetEmail(auth, email);

  const reauthenticateWithCredential = (email, password) => {
    const credential = firebaseUtils.EmailAuthProvider.credential(
      email,
      password,
    );

    return firebaseUtils.reauthenticateWithCredential(currentUser, credential);
  };

  const updatePassword = async (currentPassword, newPassword) => {
    const userCredential = await reauthenticateWithCredential(
      currentUser.email,
      currentPassword,
    );
    await firebaseUtils.updatePassword(userCredential.user, newPassword);
  };

  const updateProfile = (name, photoUrl) => firebaseUtils.updateProfile(currentUser, {
    displayName: name,
    photoURL: photoUrl,
  });

  const checkUsernameAvailability = async (username) => {
    const formattedUsername = username.toLowerCase().trim();

    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_API}users/check`,
      { username: formattedUsername },
    );

    const status = response.data.usernameStatus;

    if (status === 'Available') {
      return true;
    }
    return false;
  };

  const value = {
    currentUser,
    register,
    login,
    logout,
    resetPassword,
    updatePassword,
    updateProfile,
    customClaims,
    checkUsernameAvailability,
    setUsernameBackend,
    preventRedirect,
    setPreventRedirect,
    preventUsernamePrompt,
    setPreventUsernamePrompt,
  };

  useEffect(() => {
    const unSubscribe = firebaseUtils.onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      if (user) {
        user.getIdTokenResult().then((idTokenResult) => {
          if (idTokenResult.claims) {
            setCustomClaims(idTokenResult.claims);
          }
        });
      }
      setIsLoading(false);
      console.log(user);
    });
    // clean up
    return unSubscribe;
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthProvider, useAuth };
