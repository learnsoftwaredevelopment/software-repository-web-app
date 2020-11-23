import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { useAuth } from '../../contexts/auth/Auth.context';
import { useNotification } from '../../contexts/notification/Notification.context';

const LoginForm = () => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const { handleNotification } = useNotification();

  const history = useHistory();

  const handleSubmit = async (event) => {
    const form = event.currentTarget;

    event.preventDefault();

    if (form.checkValidity() === false) {
      event.stopPropagation();
      setValidated(true);
      return false;
    }

    setValidated(false);

    try {
      setIsLoading(true);
      await login(email, password);
      handleNotification('Login successful.', 'success');
      history.push('/');
    } catch (err) {
      console.log(err);
      handleNotification('Login not successful.', 'danger');
      setIsLoading(false);
      setEmail('');
      setPassword('');
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
          <h2 className="text-center mb-4">Login</h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
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
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please input your password.
              </Form.Control.Feedback>
            </Form.Group>
            <Button disabled={isLoading} variant="primary" type="submit">
              {isLoading ? 'Logging In' : 'Login'}
            </Button>
            <div className="mt-2">
              Forget your password?{' '}
              <Link to="/reset-password">Reset Password</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-4">
        New to our website? <Link to="/register">Register</Link>
      </div>
    </>
  );
};
export default LoginForm;
