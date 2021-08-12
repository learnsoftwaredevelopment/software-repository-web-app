import { Helmet } from 'react-helmet-async';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ResetPasswordForm from '../../components/resetPasswordForm/ResetPasswordForm.component';

const ResetPasswordPage = () => (
  <Container>
    <Helmet>
      <title>Software Repository | Reset Password</title>
    </Helmet>
    <Row className="justify-content-center mt-5">
      <Col md={8} xl={6}>
        <ResetPasswordForm />
      </Col>
    </Row>
  </Container>
);

export default ResetPasswordPage;
