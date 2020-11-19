import { Switch, Route, Redirect } from 'react-router-dom';
import NavBar from './components/navBar/NavBar.component';
import LoginPage from './pages/loginPage/LoginPage.component';
import HomePage from './pages/homePage/HomePage.component';
import RegisterPage from './pages/registerPage/RegisterPage.component';
import Footer from './components/footer/Footer.component';
import ResetPasswordPage from './pages/resetPasswordPage/ResetPasswordPage.component';
import { useAuth } from './contexts/auth/Auth.context';
import ProfilePage from './pages/profilePage/ProfilePage.component';
import SettingsPage from './pages/settingsPage/SettingsPage.component';
import Notification from './components/notification/Notification.component';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute.component';

import './App.css';

function App() {
  const { currentUser } = useAuth();

  return (
    <div>
      <div className="content">
        <NavBar />
        <Notification />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login">
            {currentUser ? <Redirect to="/" /> : <LoginPage />}
          </Route>
          <Route exact path="/register">
            {currentUser ? <Redirect to="/" /> : <RegisterPage />}
          </Route>
          <Route exact path="/reset-password">
            {currentUser ? <Redirect to="/" /> : <ResetPasswordPage />}
          </Route>
          <ProtectedRoute exact path="/profile" component={ProfilePage} />
          <ProtectedRoute exact path="/settings" component={SettingsPage} />
        </Switch>
      </div>
      <div className="d-flex align-items-center footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;
