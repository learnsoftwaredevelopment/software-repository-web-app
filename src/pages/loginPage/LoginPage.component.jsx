import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoginForm from '../../components/loginForm/LoginForm.component';

const LoginPage = () => (
  <Container className="d-flex align-items-center justify-content-center min-vh-100">
    <Row className="w-50">
      <Col>
        <LoginForm />
      </Col>
    </Row>
  </Container>
);

export default LoginPage;
