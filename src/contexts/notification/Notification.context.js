import {
  useContext, createContext, useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';

const NotificationContext = createContext();

const useNotification = () => useContext(NotificationContext);

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState('');
  const [notificationType, setNotificationType] = useState('');

  const handleNotification = (message, type = 'primary') => {
    setNotification(message);
    setNotificationType(type);
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setNotification('');
      setNotificationType('');
    }, 5000);
    return () => clearTimeout(timeOut);
  }, [notification, setNotificationType]);

  const value = {
    handleNotification,
    notification,
    notificationType,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

NotificationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { NotificationProvider, useNotification };
