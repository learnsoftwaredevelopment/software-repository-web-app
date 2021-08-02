import _ from 'lodash';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Col, Container, Row, Image, Badge, Button,
} from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';

import './SoftwareInformationPage.styles.css';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useAuth } from '../../contexts/auth/Auth.context';
import { useNotification } from '../../contexts/notification/Notification.context';

const SoftwareInformationPage = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const { handleNotification } = useNotification();
  const history = useHistory();

  const [softwareObject, setSoftwareObject] = useState({});

  const handleDelete = async () => {
    const retrievedIdToken = await currentUser.getIdToken();

    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_API}software/${id}`, {
        headers: {
          Authorization: `Bearer ${retrievedIdToken}`,
        },
      });
      handleNotification('Software successfully deleted.', 'success');
      history.push('/');
    } catch (err) {
      console.log(err);
      handleNotification('Deletion of Software not successful.', 'danger');
    }
  };

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
        <Col md={10} id="app-description-header-col">
          <Image
            src="https://plchldr.co/i/128x128?&bg=000000&fc=808080"
            width="128px"
            height="128px"
          />
          <div id="app-description-header-info">
            <h1>{_.startCase(softwareObject.name)}</h1>
            <p className="text-muted">{softwareObject.shortDescription}</p>
            {softwareObject.pricing ? (
              <h5>
                <Badge
                  variant={
                    softwareObject.pricing.toLowerCase().includes('free')
                      ? 'success'
                      : 'primary'
                  }
                  disabled
                >
                  {_.startCase(softwareObject.pricing)}
                </Badge>
              </h5>
            ) : null}
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col md={10} id="app-description-content-col">
          <h1>Description</h1>
          <p className="pt-2">{softwareObject.description}</p>
        </Col>
      </Row>
      <Row className="mt-5 text-right">
        <Col md={10} id="edit-delete-buttons">
          <Button
            variant="outline-secondary"
            onClick={() => {
              history.push(`/edit/software/${id}`);
            }}
          >
            <AiOutlineEdit /> Edit
          </Button>{' '}
          <Button
            variant="outline-danger"
            onClick={() => {
              handleDelete();
            }}
          >
            <AiOutlineDelete /> Delete
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default SoftwareInformationPage;
