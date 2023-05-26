import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import LogoutButton from './LogoutButton';
import './css.css';

const NavBar = () => {

  const getNavLinkClass = (path) => {
    return window.location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <>
      <Navbar className="custom-navbar-color p-2" expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} to="/home" className={getNavLinkClass("/home")}><h2 className='me-3 text-primary'>Money Monitor</h2></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavLink to="/home" className={getNavLinkClass("/home")}><h3>Home</h3></NavLink>
              <NavLink to="/movimenti" className={getNavLinkClass("/movimenti")}><h3>Movimenti</h3></NavLink>
              <NavLink to="/conti" className={getNavLinkClass("/conti")}><h3>Conti</h3></NavLink>
              <NavLink to="/grafici" className={getNavLinkClass("/grafici")}><h3>Grafici</h3></NavLink>
            </Nav>
            <Nav className="ml-auto">
              <Nav.Link><LogoutButton /></Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavBar;
