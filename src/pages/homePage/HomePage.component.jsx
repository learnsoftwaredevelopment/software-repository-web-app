import { Helmet } from 'react-helmet-async';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MainSearchBar from '../../components/mainSearchBar/MainSearchBar.component';

const HomePage = () => (
  <Container>
    <Helmet>
      <title>Software Repository | Home</title>
    </Helmet>
    <Row className="justify-content-center text-center mt-5">
      <Col md={8} xl={6}>
        <MainSearchBar />
      </Col>
    </Row>
  </Container>
);

export default HomePage;
