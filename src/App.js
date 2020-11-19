import { Switch, Route } from 'react-router-dom';
import NavBar from './components/navBar/NavBar.component';
import LoginPage from './pages/loginPage/LoginPage.component';
import HomePage from './pages/homePage/HomePage.component';
import RegisterPage from './pages/registerPage/RegisterPage.component';
import Footer from './components/footer/Footer.component';
import ResetPasswordPage from './pages/resetPasswordPage/ResetPasswordPage.component';
import { AuthProvider } from './contexts/auth/Auth.context';
import ProfilePage from './pages/profilePage/ProfilePage.component';
import SettingsPage from './pages/settingsPage/SettingsPage.component';
import { NotificationProvider } from './contexts/notification/Notification.context';
import Notification from './components/notification/Notification.component';

import './App.css';

function App() {
  return (
    <div>
      <NotificationProvider>
        <AuthProvider>
          <div className="content">
            <NavBar />
            <Notification />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/login" component={LoginPage} />
              <Route exact path="/register" component={RegisterPage} />
              <Route
                exact
                path="/reset-password"
                component={ResetPasswordPage}
              />
              <Route exact path="/profile" component={ProfilePage} />
              <Route exact path="/settings" component={SettingsPage} />
            </Switch>
          </div>
          <div className="d-flex align-items-center footer">
            <Footer />
          </div>
        </AuthProvider>
      </NotificationProvider>
    </div>
  );
}

export default App;
