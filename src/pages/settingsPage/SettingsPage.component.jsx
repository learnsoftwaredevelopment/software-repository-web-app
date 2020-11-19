import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AccountSettings from '../../components/accountSettings/AccountSettings.component';

const SettingsPage = () => (
  <>
    <Tabs defaultActiveKey="account" id="uncontrolled-tab-example">
      <Tab eventKey="account" title="Account">
        <AccountSettings />
      </Tab>
      <Tab eventKey="profile" title="Profile">
        <AccountSettings />
      </Tab>
    </Tabs>
  </>
);

export default SettingsPage;
