import { Helmet } from 'react-helmet-async';
import { Col, Container, Row } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
  <Container>
    <Helmet>
      <title>Software Repository | Page not found</title>
    </Helmet>
    <Row className="justify-content-center text-center mt-5">
      <Col md={8} xl={6}>
        <div className="d-flex align-items-center justify-content-center mt-5 mb-2">
          <Image
            src="https://plchldr.co/i/128x128?&bg=000000&fc=808080"
            width="128px"
            height="128px"
            rounded
          />
        </div>
        <h1>Not Found (404)</h1>
        <p>
          Our apologises, we are unable to find the page you are looking for.
          Please ensure that you have input a valid url. Thank you.
        </p>
        <Link to="/">Back to Homepage</Link>
      </Col>
    </Row>
  </Container>
);

export default NotFoundPage;
