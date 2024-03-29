import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { useAuth } from '../../contexts/auth/Auth.context';
import { useNotification } from '../../contexts/notification/Notification.context';
import { ALLOWED_USERNAME_REGEX } from '../../utils/config';

const RegisterForm = () => {
  const [validated, setValidated] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isTermsChecked, setTermsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    checkUsernameAvailability,
    setPreventRedirect,
    setPreventUsernamePrompt,
  } = useAuth();
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

    if (password !== confirmPassword) {
      handleNotification('Please ensure the password matches.', 'danger');
      return false;
    }

    try {
      setIsLoading(true);
      setPreventRedirect(true);
      setPreventUsernamePrompt(true);
      const isAvailable = await checkUsernameAvailability(formattedUsername);
      if (!isAvailable) {
        handleNotification(
          'The username is already in use. Please input a different username.',
          'danger',
        );
        return false;
      }
      await register(email, password, name, formattedUsername);
      handleNotification(
        'Registration successful. Please check your inbox to verify your email address.',
        'success',
      );
    } catch (err) {
      console.log(err);
      handleNotification('Registration not successful.', 'danger');
    } finally {
      setIsLoading(false);
      setUsername('');
      setName('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setTermsChecked(false);
      setPreventUsernamePrompt(false);
      setPreventRedirect(false);
    }

    return true;
  };

  return (
    <>
      <Card>
        <div className="d-flex align-items-center justify-content-center mt-5 mb-2">
          <Image
            src="https://plchldr.co/i/128x128?&bg=000000&fc=808080"
            width="128px"
            height="128px"
            roundedCircle
          />
        </div>
        <Card.Body>
          <h2 className="text-center mb-4">Register</h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter desired username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please input your desired username.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
              <Form.Text className="text-muted">
                The name will be how we will address you in our mail to you.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                Please input your name.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please input your email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                minLength="6"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please input your password and ensure that it has a minimum
                length of 6 characters.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                minLength="6"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please confirm your password and ensure that it has a minimum
                length of 6 characters.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="termsAndConditionsCheckbox">
              <Form.Check
                type="checkbox"
                label="I agree to the Terms of Service and Privacy Policy"
                checked={isTermsChecked}
                onChange={() => setTermsChecked(!isTermsChecked)}
                required
              />
              <Form.Control.Feedback type="invalid">
                You must agree to the Terms and conditions.
              </Form.Control.Feedback>
            </Form.Group>
            <Button disabled={isLoading} variant="primary" type="submit">
              {isLoading ? 'Registering' : 'Register'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-4">
        Already have an Account? <Link to="/login">Login</Link>
      </div>
    </>
  );
};
export default RegisterForm;
