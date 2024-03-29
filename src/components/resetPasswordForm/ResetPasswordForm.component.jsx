import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { useAuth } from '../../contexts/auth/Auth.context';
import { useNotification } from '../../contexts/notification/Notification.context';

const ResetPasswordForm = () => {
  const [validated, setValidated] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { resetPassword } = useAuth();
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

    try {
      setIsLoading(true);
      await resetPassword(email);
      handleNotification(
        'Reset Password successful. Please check your inbox for the instructions to reset your password.',
        'success',
      );
    } catch (err) {
      console.log(err);
      handleNotification('Reset Password not successful.', 'danger');
    } finally {
      setIsLoading(false);
      setEmail('');
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
          <h2 className="text-center mb-4">Reset Password</h2>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please input your email.
              </Form.Control.Feedback>
            </Form.Group>
            <Button disabled={isLoading} variant="primary" type="submit">
              {isLoading ? 'Loading' : 'Reset Password'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-4">
        Return to <Link to="/login">Login</Link>
      </div>
    </>
  );
};
export default ResetPasswordForm;
