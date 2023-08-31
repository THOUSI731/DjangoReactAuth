import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import jwtDecode  from 'jwt-decode';
import { useContext } from 'react';
import AuthContext from '../Context/AuthContext';
import { Link } from 'react-router-dom';


function BasicExample() {
  const {user,logOutUser} = useContext(AuthContext)
  const token = localStorage.getItem("authTokens")
  if (token) {
    const decoded = jwtDecode(token)
    let user_id = decoded.user_id
  } 
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <NavDropdown title="Account" id="basic-nav-dropdown">
            {token === null &&
              <>
                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                <NavDropdown.Item href="/register">Register</NavDropdown.Item>
              </>
            }
            {token !== null &&
              <>
                <NavDropdown.Item href="/dashboard">Dashboard</NavDropdown.Item>
                <NavDropdown.Item onClick={logOutUser}>Logout</NavDropdown.Item>
              </>
            }
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;