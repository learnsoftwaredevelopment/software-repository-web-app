import _ from 'lodash';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import ReactPlayer from 'react-player';
import isURL from 'validator/lib/isURL';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useEffect, useState } from 'react';
import {
  Col,
  Container,
  Row,
  Image,
  Badge,
  Button,
  Card,
  Form,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { useHistory, useParams } from 'react-router-dom';
import {
  AiOutlineDelete,
  AiOutlineEdit,
  AiOutlineHome,
  AiOutlineTwitter,
} from 'react-icons/ai';
import { useAuth } from '../../contexts/auth/Auth.context';
import { useNotification } from '../../contexts/notification/Notification.context';
import { parseSoftwarePlatform } from '../../utils/utils';
import { ALLOWED_VIDEO_HOST_WHITELIST } from '../../utils/config';

import './SoftwareInformationPage.styles.css';

const SoftwareInformationPage = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const { handleNotification } = useNotification();
  const history = useHistory();

  dayjs.extend(relativeTime);

  const [softwareObject, setSoftwareObject] = useState(null);

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
    <>
      {!softwareObject ? (
        <Container>
          <Helmet>
            <title>Software Repository | Loading</title>
          </Helmet>
          <Row className="justify-content-center mt-5">
            <Col md={10} id="app-description-header-col">
              Loading...
            </Col>
            )
          </Row>
        </Container>
      ) : (
        <Container>
          <Helmet>
            <title>
              {`Software Repository | ${_.startCase(softwareObject.name)}`}
            </title>
          </Helmet>
          <Row className="justify-content-center mt-5">
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
                    </Badge>{' '}
                    <Badge variant="info">
                      {`Platform: ${parseSoftwarePlatform(
                        softwareObject.platform,
                      )}`}
                    </Badge>{' '}
                    <Badge variant="info">
                      {`Latest Version: ${softwareObject.version}`}
                    </Badge>
                  </h5>
                ) : null}
              </div>
            </Col>
          </Row>
          {softwareObject.videoLink
          && isURL(softwareObject.videoLink, {
            protocols: ['http', 'https'],
            host_whitelist: ALLOWED_VIDEO_HOST_WHITELIST,
          }) ? (
            <Row className="justify-content-center mt-5">
              <Col md={10}>
                <Card>
                  <Card.Header as="h4">Video Preview</Card.Header>
                  <Card.Body>
                    <Card.Text>
                      <div className="player-wrapper">
                        <ReactPlayer
                          className="react-player"
                          url={softwareObject.videoLink}
                          height="100%"
                          width="100%"
                          controls
                          pip
                        />
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            ) : null}
          <Row className="justify-content-center mt-5">
            <Col md={10}>
              <Card>
                <Card.Header as="h4">Description</Card.Header>
                <Card.Body>
                  <Card.Text>{softwareObject.description}</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-center mt-5">
            <Col md={10}>
              <Card>
                <Card.Header as="h4">Information</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <Form>
                      <Form.Row>
                        <Form.Group
                          as={Col}
                          controlId="alternative-software-names"
                        >
                          <Form.Label className="font-weight-bold">
                            Alternative Software Names
                          </Form.Label>
                          {softwareObject.alternativeNames
                          && softwareObject.alternativeNames.length > 0 ? (
                            <Form.Control
                              as="textarea"
                              className="borderless-text-area"
                              rows={softwareObject.alternativeNames.length || 3}
                              plaintext
                              readOnly
                              defaultValue={softwareObject.alternativeNames
                                .map((name) => _.startCase(name))
                                .join('\n')}
                            />
                            ) : null}
                        </Form.Group>
                      </Form.Row>

                      <Form.Row>
                        <Form.Group as={Col} controlId="build-on">
                          <Form.Label className="font-weight-bold">
                            Build On
                          </Form.Label>
                          {softwareObject.buildOn
                          && softwareObject.buildOn.length > 0 ? (
                            <Form.Control
                              as="textarea"
                              className="borderless-text-area"
                              rows={softwareObject.buildOn.length || 3}
                              plaintext
                              readOnly
                              defaultValue={softwareObject.buildOn
                                .map((item) => _.startCase(item))
                                .join('\n')}
                            />
                            ) : null}
                        </Form.Group>
                      </Form.Row>

                      <Form.Row>
                        <Form.Group as={Col} controlId="is-active-dev">
                          <Form.Label className="font-weight-bold">
                            Development Status
                          </Form.Label>

                          <Form.Control
                            className="borderless-input"
                            plaintext
                            readOnly
                            defaultValue={
                              softwareObject.isActiveDevelopment
                                ? 'Active'
                                : 'Inactive'
                            }
                          />
                        </Form.Group>
                      </Form.Row>

                      <Form.Row>
                        <Form.Group as={Col} controlId="developed-by">
                          <Form.Label className="font-weight-bold">
                            Developed By
                          </Form.Label>
                          {softwareObject.developedBy
                          && softwareObject.developedBy.length > 0 ? (
                            <Form.Control
                              as="textarea"
                              className="borderless-text-area"
                              rows={softwareObject.developedBy.length || 3}
                              plaintext
                              readOnly
                              defaultValue={softwareObject.developedBy
                                .map((developer) => _.startCase(developer))
                                .join('\n')}
                            />
                            ) : null}
                        </Form.Group>

                        <Form.Group as={Col} controlId="maintained-by">
                          <Form.Label className="font-weight-bold">
                            Maintained By
                          </Form.Label>
                          {softwareObject.maintainedBy
                          && softwareObject.maintainedBy.length > 0 ? (
                            <Form.Control
                              as="textarea"
                              className="borderless-text-area"
                              rows={softwareObject.maintainedBy.length || 3}
                              plaintext
                              readOnly
                              defaultValue={softwareObject.maintainedBy
                                .map((maintainer) => _.startCase(maintainer))
                                .join('\n')}
                            />
                            ) : null}
                        </Form.Group>
                      </Form.Row>
                    </Form>

                    <OverlayTrigger
                      overlay={(
                        <Tooltip>
                          {softwareObject.twitterUsername.length > 0
                            ? 'Access Software Twitter'
                            : 'Software Twitter Not found'}
                        </Tooltip>
                      )}
                    >
                      <span className="d-inline-block mt-2">
                        <Button
                          className="mr-2"
                          variant="outline-primary"
                          href={`https://twitter.com/${softwareObject.twitterUsername}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          disabled={softwareObject.twitterUsername.length === 0}
                        >
                          <AiOutlineTwitter /> Software Twitter
                        </Button>
                      </span>
                    </OverlayTrigger>
                    <OverlayTrigger
                      overlay={<Tooltip>Access Software Homepage</Tooltip>}
                    >
                      <span className="d-inline-block mt-2">
                        <Button
                          variant="outline-primary"
                          href={softwareObject.homePage}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <AiOutlineHome /> Software Homepage
                        </Button>
                      </span>
                    </OverlayTrigger>

                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-center mt-5">
            <Col md={10}>
              <Card>
                <Card.Header as="h4">Meta</Card.Header>
                <Card.Body>
                  <Card.Text>
                    <Form>
                      <Form.Row>
                        <Form.Group as={Col} controlId="added-by-user">
                          <Form.Label className="font-weight-bold">
                            Added By User
                          </Form.Label>
                          {softwareObject.meta
                          && softwareObject.meta.addedByUser ? (
                            <Form.Control
                              plaintext
                              className="borderless-input"
                              readOnly
                              defaultValue={_.startCase(
                                softwareObject.meta.addedByUser.username,
                              )}
                            />
                            ) : null}
                        </Form.Group>

                        <Form.Group as={Col} controlId="updated-by-user">
                          <Form.Label className="font-weight-bold">
                            Updated By User
                          </Form.Label>
                          {softwareObject.meta
                          && softwareObject.meta.updatedByUser ? (
                            <Form.Control
                              className="borderless-input"
                              plaintext
                              readOnly
                              defaultValue={_.startCase(
                                softwareObject.meta.updatedByUser.username,
                              )}
                            />
                            ) : null}
                        </Form.Group>
                      </Form.Row>

                      <Form.Row>
                        <Form.Group as={Col} controlId="added-on">
                          <Form.Label className="font-weight-bold">
                            Added
                          </Form.Label>
                          <Form.Control
                            className="borderless-input"
                            plaintext
                            readOnly
                            defaultValue={dayjs(
                              softwareObject.createdAt,
                            ).fromNow()}
                          />
                        </Form.Group>

                        <Form.Group as={Col} controlId="last-updated">
                          <Form.Label className="font-weight-bold">
                            Last Updated
                          </Form.Label>
                          <Form.Control
                            className="borderless-input"
                            plaintext
                            readOnly
                            defaultValue={dayjs(
                              softwareObject.updatedAt,
                            ).fromNow()}
                          />
                        </Form.Group>
                      </Form.Row>

                      <Form.Row>
                        <Form.Group as={Col} controlId="tags">
                          <Form.Label className="font-weight-bold">
                            Tags
                          </Form.Label>
                          {softwareObject.meta
                          && softwareObject.meta.tags.length > 0 ? (
                            <Form.Control
                              as="textarea"
                              className="borderless-text-area"
                              rows={softwareObject.meta.tags.length || 3}
                              plaintext
                              readOnly
                              defaultValue={softwareObject.meta.tags
                                .map((tag) => _.startCase(tag))
                                .join('\n')}
                            />
                            ) : null}
                        </Form.Group>
                      </Form.Row>
                    </Form>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <Row className="justify-content-center mt-4 mb-3 text-right">
            <Col md={10} id="edit-delete-buttons">
              <Button
                className="mr-2"
                variant="outline-secondary"
                onClick={() => {
                  history.push(`/edit/software/${id}`);
                }}
              >
                <AiOutlineEdit /> Edit
              </Button>
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
      )}
    </>
  );
};

export default SoftwareInformationPage;
