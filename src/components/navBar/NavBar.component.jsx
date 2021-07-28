import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Link, useHistory } from 'react-router-dom';
import { AiOutlineHome, AiOutlinePlus } from 'react-icons/ai';
import { useAuth } from '../../contexts/auth/Auth.context';
import { useNotification } from '../../contexts/notification/Notification.context';

import './NavBar.styles.css';

const NavBar = () => {
  const { currentUser, logout } = useAuth();
  const { handleNotification } = useNotification();

  const history = useHistory();

  const handleLogOut = async () => {
    try {
      await logout();
      handleNotification('Logout successful.', 'info');
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Navbar.Brand as={Link} to="/">
          Software Repository
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} exact to="/" className="custom-nav-link">
              <AiOutlineHome />
              <span className="ml-1">Home</span>
            </Nav.Link>
            <Nav.Link
              as={NavLink}
              exact
              to="/software/add"
              className="custom-nav-link"
            >
              <AiOutlinePlus />
              <span className="ml-1">Add Software</span>
            </Nav.Link>
          </Nav>
          <Nav>
            {!currentUser ? (
              <>
                <Nav.Link as={NavLink} exact to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} exact to="/register">
                  Register
                </Nav.Link>
              </>
            ) : (
              <NavDropdown
                title="Account"
                id="collasible-nav-dropdown"
                alignRight
              >
                <NavDropdown.Item onClick={() => history.push('/profile')}>
                  Profile
                </NavDropdown.Item>
                <NavDropdown.Item onClick={() => history.push('/settings')}>
                  Settings
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogOut}>
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
};

export default NavBar;
