import { Helmet } from 'react-helmet-async';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RegisterForm from '../../components/registerForm/RegisterForm.component';

const RegisterPage = () => (
  <Container>
    <Helmet>
      <title>Software Repository | Register</title>
    </Helmet>
    <Row className="justify-content-center mt-5">
      <Col md={8} xl={6}>
        <RegisterForm />
      </Col>
    </Row>
  </Container>
);

export default RegisterPage;
