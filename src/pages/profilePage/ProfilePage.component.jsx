import { Helmet } from 'react-helmet-async';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileInformation from '../../components/profileInformation/ProfileInformation.component';

const ProfilePage = () => (
  <Container>
    <Helmet>
      <title>Software Repository | Profile</title>
    </Helmet>
    <Row className="justify-content-center mt-5">
      <Col md={8} xl={6}>
        <ProfileInformation />
      </Col>
    </Row>
  </Container>
);

export default ProfilePage;
