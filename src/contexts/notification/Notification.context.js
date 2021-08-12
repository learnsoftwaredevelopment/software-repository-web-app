import {
  useContext, createContext, useState, useEffect,
} from 'react';
import PropTypes from 'prop-types';

const NotificationContext = createContext();

const useNotification = () => useContext(NotificationContext);

const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState('');
  const [notificationType, setNotificationType] = useState('');
  const [timer, setTimer] = useState(null);
  const [timeToLive, setTimeToLive] = useState(null);
  const [isNotificationShown, setIsNotificationShown] = useState(false);

  const handleNotification = (message, type = 'primary', ttl = 5000) => {
    setNotification(message);
    setNotificationType(type);
    setTimeToLive(ttl);
    setIsNotificationShown(true);
  };

  const handleDismissNotification = () => {
    setNotification('');
    setNotificationType('');
    setIsNotificationShown(false);
    clearTimeout(timer);
  };

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setNotification('');
      setNotificationType('');
      setIsNotificationShown(false);
    }, timeToLive);
    setTimer(timeOut);
    return () => {
      clearTimeout(timeOut);
    };
  }, [notification, setNotificationType, timeToLive]);

  const value = {
    handleNotification,
    notification,
    notificationType,
    handleDismissNotification,
    isNotificationShown,
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
