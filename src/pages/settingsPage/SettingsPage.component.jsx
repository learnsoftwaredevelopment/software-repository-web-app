import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AccountSettings from '../../components/accountSettings/AccountSettings.component';
import ProfileSettings from '../../components/profileSettings/ProfileSettings.component';

const SettingsPage = () => (
  <>
    <Container>
      <Row className="justify-content-center mt-5">
        <Col md={8} xl={6}>
          <Tabs defaultActiveKey="account" id="uncontrolled-tab-example">
            <Tab eventKey="account" title="Account">
              <AccountSettings />
            </Tab>
            <Tab eventKey="profile" title="Profile">
              <ProfileSettings />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  </>
);

export default SettingsPage;
