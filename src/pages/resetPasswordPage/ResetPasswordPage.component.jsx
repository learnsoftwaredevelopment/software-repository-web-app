import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ResetPasswordForm from '../../components/resetPasswordForm/ResetPasswordForm.component';

const ResetPasswordPage = () => (
  <Container className="d-flex align-items-center justify-content-center min-vh-100">
    <Row className="w-50">
      <Col>
        <ResetPasswordForm />
      </Col>
    </Row>
  </Container>
);

export default ResetPasswordPage;
