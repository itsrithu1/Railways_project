import Container from 'react-bootstrap/Container';

 

import Nav from 'react-bootstrap/Nav';

 

import Navbar from 'react-bootstrap/Navbar';

 

import NavDropdown from 'react-bootstrap/NavDropdown';

 

import '../styles/Navbar.css';

 

import logo from './Rail_Logo.png';

 

 

function NavbarComponent() {

 

  return (

 

    <Navbar expand="lg" className="bg-body-tertiary">

 

      <Container>

 

        <Navbar.Brand href="/LandingPage">

          <img

            src={logo}

            alt="Logo"

            className="d-inline-block align-top logo-image"

          />

          First Class Railways

        </Navbar.Brand>

 

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

 

        <Navbar.Collapse id="basic-navbar-nav">

 

          <Nav className="ml-auto">

 

            <Nav.Link href="/LandingPage">Modify Seach</Nav.Link>

            <Nav.Link href="/AboutUs">About Us</Nav.Link>
 

            {/* <Nav.Link href="#link">Destinations</Nav.Link> */}

 

            {/* <Nav.Link href="#link">Features</Nav.Link> */}

 

            <Nav.Link href="/">Logout </Nav.Link>

 

          </Nav>

 

        </Navbar.Collapse>

 

      </Container>

 

    </Navbar>

 

  );

 

}

 

 

 

export default NavbarComponent;