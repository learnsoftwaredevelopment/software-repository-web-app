import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import LoginForm from '../../components/loginForm/LoginForm.component';

const LoginPage = () => (
  <Container>
    <Row className="justify-content-center mt-5">
      <Col md={8} xl={6}>
        <LoginForm />
      </Col>
    </Row>
  </Container>
);

export default LoginPage;
