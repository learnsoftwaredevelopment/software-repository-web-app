import _ from 'lodash';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Col, Container, Row, Image, Button,
} from 'react-bootstrap';
import { useParams } from 'react-router-dom';

import './SoftwareInformation.styles.css';

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
      <Helmet>
        <title>
          {`Software Repository | ${_.startCase(softwareObject.name)}`}
        </title>
      </Helmet>
      <Row className="mt-5">
        <Col md={8} xl={6} id="app-description-header-col">
          <Image
            src="https://plchldr.co/i/128x128?&bg=000000&fc=808080"
            width="128px"
            height="128px"
          />
          <div id="app-description-header-info">
            <h1>{_.startCase(softwareObject.name)}</h1>
            <p className="text-muted">{softwareObject.shortDescription}</p>
            {softwareObject.pricing ? (
              <Button
                variant={
                  softwareObject.pricing.toLowerCase().includes('free')
                    ? 'success'
                    : 'primary'
                }
                disabled
              >
                {_.startCase(softwareObject.pricing)}
              </Button>
            ) : null}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default SoftwareInformationPage;
