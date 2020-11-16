import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

const RegisterForm = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setValidated(true);
  };

  return (
    <div>
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
            <Form.Group controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" required />
              <Form.Control.Feedback type="invalid">
                Please input your email.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required />
              <Form.Control.Feedback type="invalid">
                Please input your password.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm Password"
                required
              />
              <Form.Control.Feedback type="invalid">
                Please confirm your password.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="termsAndConditionsCheckbox">
              <Form.Check
                type="checkbox"
                label="I agree to the Terms of Service and Privacy Policy"
                required
              />
              <Form.Control.Feedback type="invalid">
                You must agree to the Terms and conditions.
              </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-4">
        Already have an Account? <Link to="/login">Login</Link>
      </div>
    </div>
  );
};
export default RegisterForm;
