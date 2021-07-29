import axios from 'axios';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';

const SoftwareInformationPage = () => {
  const { id } = useParams();
  const [softwareObject, setSoftwareObject] = useState({});

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_API}software/${id}`)
      .then((response) => setSoftwareObject(response.data));
  }, [id]);

  return (
    <Container>
      <Row className="mt-5">
        <Col md={8} xl={6}>
          <h1>{softwareObject.name}</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default SoftwareInformationPage;
