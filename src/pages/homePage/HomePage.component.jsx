import { Helmet } from 'react-helmet-async';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import MainSearchBar from '../../components/mainSearchBar/MainSearchBar.component';
import RecentlyAddedSoftware from '../../components/recentlyAddedSoftware/RecentlyAddedSoftware.component';
import RecentlyUpdatedSoftware from '../../components/recentlyUpdatedSoftware/RecentlyUpdatedSoftware.component';

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
    <Row className="justify-content-center mt-5">
      <Col className="my-2" md={8} xl={6}>
        <RecentlyAddedSoftware />
      </Col>
      <Col className="my-2" md={8} xl={6}>
        <RecentlyUpdatedSoftware />
      </Col>
    </Row>
  </Container>
);

export default HomePage;
