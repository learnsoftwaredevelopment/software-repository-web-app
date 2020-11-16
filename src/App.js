import { Switch, Route } from 'react-router-dom';
import NavBar from './components/navBar/NavBar.component';
import LoginPage from './pages/loginPage/LoginPage.component';
import HomePage from './pages/homePage/HomePage.component';
import RegisterPage from './pages/registerPage/RegisterPage.component';
import Footer from './components/footer/Footer.component';

function App() {
  return (
    <div>
      <NavBar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/register" component={RegisterPage} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
