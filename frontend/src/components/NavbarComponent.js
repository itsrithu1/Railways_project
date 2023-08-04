import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';

import Navbar from 'react-bootstrap/Navbar';

import NavDropdown from 'react-bootstrap/NavDropdown';

import '../styles/Navbar.css';
 

function NavbarComponent() {

  return (

    <Navbar expand="lg" className="bg-body-tertiary">

      <Container>

        <Navbar.Brand href="#home">First Class Railways</Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

          <Nav className="me-auto">

            <Nav.Link href="/LandingPage">Modify Seach</Nav.Link>

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