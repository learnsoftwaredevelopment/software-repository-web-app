import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RegisterForm from '../../components/registerForm/RegisterForm.component';

const RegisterPage = () => (
  <Container className="d-flex align-items-center justify-content-center min-vh-100">
    <Row className="w-50">
      <Col>
        <RegisterForm />
      </Col>
    </Row>
  </Container>
);

export default RegisterPage;
