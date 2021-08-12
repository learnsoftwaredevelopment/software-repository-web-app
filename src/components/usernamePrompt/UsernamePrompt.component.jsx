import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useAuth } from '../../contexts/auth/Auth.context';
import { useNotification } from '../../contexts/notification/Notification.context';
import { ALLOWED_USERNAME_REGEX } from '../../utils/config';

const UsernamePrompt = () => {
  const [show, setShow] = useState(true);
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { logout, setUsernameBackend, checkUsernameAvailability } = useAuth();

  const { handleNotification } = useNotification();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;

    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return false;
    }

    setValidated(false);
    const formattedUsername = username.toLowerCase().trim();

    if (!RegExp(ALLOWED_USERNAME_REGEX).test(formattedUsername)) {
      handleNotification(
        <>
          Please ensure the username only contains{' '}
          <strong>alphanumeric characters and/or underscores</strong>.
        </>,
        'danger',
      );
      return false;
    }

    try {
      setIsLoading(true);
      const isAvailable = await checkUsernameAvailability(formattedUsername);
      if (!isAvailable) {
        handleNotification(
          'The username is already in use. Please input a different username.',
          'danger',
        );
        setIsLoading(false);
        setUsername('');
        return false;
      }
      await setUsernameBackend(formattedUsername);
      handleNotification('Username Setup successful.', 'success');
    } catch (err) {
      console.log(err);
      handleNotification('Username Setup not successful.', 'danger');
      setIsLoading(false);
      setUsername('');
    }

    return true;
  };

  const handleClose = async () => {
    setShow(false);
    await logout();
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        onExit={handleClose}
      >
        <Modal.Header>
          <Modal.Title>Username Setup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            It seems your account is currently not linked to any username.
            Please set up your username by filling in the form below.
          </p>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            id="usernamePromptForm"
          >
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter desired username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
              <Form.Text className="text-muted">
                Your username should only contain{' '}
                <strong>alphanumeric characters and/or underscores.</strong>
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Please input your desired username.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
          <p className="mt-3">
            <strong>Note: </strong> As every account must have a valid username
            linked to it, closing the prompt will log you out of the Account.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={isLoading}
            variant="secondary"
            onClick={handleClose}
          >
            Close
          </Button>
          <Button
            disabled={isLoading}
            variant="primary"
            form="usernamePromptForm"
            type="submit"
          >
            {isLoading ? 'Registering Username' : 'Register Username'}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UsernamePrompt;
