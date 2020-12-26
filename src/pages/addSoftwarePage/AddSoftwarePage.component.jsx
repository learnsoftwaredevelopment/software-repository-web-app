import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AddSoftwareForm from '../../components/addSoftwareForm/AddSoftwareForm.component';

const AddSoftwarePage = () => (
  <Container>
    <Row className="justify-content-center mt-5">
      <Col md={8} xl={6}>
        <AddSoftwareForm />
      </Col>
    </Row>
  </Container>
);

export default AddSoftwarePage;
