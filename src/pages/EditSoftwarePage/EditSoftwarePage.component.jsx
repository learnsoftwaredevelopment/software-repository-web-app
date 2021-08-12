import _ from 'lodash';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import EditSoftwareForm from '../../components/editSoftwareForm/EditSoftwareForm.component';

const EditSoftwarePage = () => {
  const { id } = useParams();
  const [softwareObject, setSoftwareObject] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}software/${id}`)
      .then((response) => setSoftwareObject(response.data));
  }, [id]);

  return (
    <Container>
      <Helmet>
        <title>
          Software Repository | Edit Software |{' '}
          {_.startCase(softwareObject.name)}
        </title>
      </Helmet>
      <Row className="justify-content-center mt-5">
        <Col md={8} xl={6}>
          <EditSoftwareForm />
        </Col>
      </Row>
    </Container>
  );
};

export default EditSoftwarePage;
