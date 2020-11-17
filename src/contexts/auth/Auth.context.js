import {
  useContext, createContext, useEffect, useState,
} from 'react';
import PropTypes from 'prop-types';
import { auth } from '../../firebase/firebase.utils';

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

  const logout = () => {
    auth.signOut();
  };

  const resetPassword = (email) => auth.sendPasswordResetEmail(email);

  const value = {
    currentUser,
    register,
    login,
    logout,
    resetPassword,
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
