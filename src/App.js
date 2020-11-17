import { Switch, Route } from 'react-router-dom';
import NavBar from './components/navBar/NavBar.component';
import LoginPage from './pages/loginPage/LoginPage.component';
import HomePage from './pages/homePage/HomePage.component';
import RegisterPage from './pages/registerPage/RegisterPage.component';
import Footer from './components/footer/Footer.component';
import ResetPasswordPage from './pages/resetPasswordPage/ResetPasswordPage.component';
import { AuthProvider } from './contexts/auth/Auth.context';

function App() {
  return (
    <div>
      <AuthProvider>
        <NavBar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/reset-password" component={ResetPasswordPage} />
        </Switch>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;
