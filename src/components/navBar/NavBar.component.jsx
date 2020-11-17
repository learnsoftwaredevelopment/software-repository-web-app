import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, Link } from 'react-router-dom';
import AiOutlineHome from '@meronex/icons/ai/AiOutlineHome';

import './NavBar.styles.css';
import { useAuth } from '../../contexts/auth/Auth.context';

const NavBar = () => {
  const { currentUser, logout } = useAuth();

  const handleLogOut = async () => {
    try {
      await logout();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {console.log(currentUser)}
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Navbar.Brand as={Link} to="/">
          Software Repository
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={NavLink} to="/" className="custom-nav-link">
              <AiOutlineHome />
              <span className="ml-1">Home</span>
            </Nav.Link>
          </Nav>
          <Nav>
            {!currentUser ? (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Login
                </Nav.Link>
                <Nav.Link as={NavLink} to="/register">
                  Register
                </Nav.Link>
              </>
            ) : (
              <NavDropdown
                title="Account"
                id="collasible-nav-dropdown"
                alignRight
              >
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
