import Alert from 'react-bootstrap/Alert';
import { useNotification } from '../../contexts/notification/Notification.context';

import './Notification.styles.css';

const Notification = () => {
  const { notification, notificationType } = useNotification();

  return (
    <div className="text-center fixed-top ml-auto mr-auto mt-5 notification-container">
      <Alert show={notification !== ''} variant={notificationType}>
        {notification}
      </Alert>
    </div>
  );
};

export default Notification;
