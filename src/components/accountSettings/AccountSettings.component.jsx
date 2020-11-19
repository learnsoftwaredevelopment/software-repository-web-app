import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../contexts/auth/Auth.context';
import { useNotification } from '../../contexts/notification/Notification.context';

const AccountSettings = () => {
  const [validated, setValidated] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { updatePassword } = useAuth();
  const { handleNotification } = useNotification();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;

    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return false;
    }

    if (newPassword !== confirmNewPassword) {
      handleNotification(
        'Please ensure the new password and confirm new password matches.',
        'danger',
      );
      return false;
    }

    try {
      setIsLoading(true);
      await updatePassword(oldPassword, newPassword);
      handleNotification('Password change successful.', 'success');
    } catch (err) {
      console.log(err);
      handleNotification('Password change not successful.', 'danger');
    } finally {
      setIsLoading(false);
      setOldPassword('');
      setNewPassword('');
      setConfirmNewPassword('');
      setValidated(false);
    }

    return true;
  };

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Account Settings</h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="oldPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(event) => setOldPassword(event.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please input your old password.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please input your new password.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="confirmNewPassword">
              <Form.Label>Confirm New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm New Password"
                value={confirmNewPassword}
                onChange={(event) => setConfirmNewPassword(event.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please confirm your new password.
              </Form.Control.Feedback>
            </Form.Group>
            <Button disabled={isLoading} variant="primary" type="submit">
              {isLoading ? 'Loading' : 'Submit'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </>
  );
};

export default AccountSettings;
