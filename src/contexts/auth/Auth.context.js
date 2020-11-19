import {
  useContext, createContext, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import { firebase, auth } from '../../firebase/firebase.utils';

const AuthContext = createContext();

const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const register = async (email, password, name = '') => {
    const userCredentials = await auth.createUserWithEmailAndPassword(
      email,
      password,
    );
    await userCredentials.user.updateProfile({
      displayName: name,
    });
    await userCredentials.user.sendEmailVerification();
  };

  const login = (email, password) => auth.signInWithEmailAndPassword(email, password);

  const logout = async () => {
    await auth.signOut();
  };

  const resetPassword = (email) => auth.sendPasswordResetEmail(email);

  const reauthenticateWithCredential = (email, password) => {
    const credential = firebase.auth.EmailAuthProvider.credential(
      email,
      password,
    );

    return currentUser.reauthenticateWithCredential(credential);
  };

  const updatePassword = async (currentPassword, newPassword) => {
    const userCredential = await reauthenticateWithCredential(
      currentUser.email,
      currentPassword,
    );
    await userCredential.user.updatePassword(newPassword);
  };

  const updateProfile = (name, photoUrl) => currentUser.updateProfile({
    displayName: name,
    photoURL: photoUrl,
  });

  const value = {
    currentUser,
    register,
    login,
    logout,
    resetPassword,
    updatePassword,
    updateProfile,
  };

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
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
