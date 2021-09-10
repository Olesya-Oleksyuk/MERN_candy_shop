import React from 'react';
import {
  Container, Nav, Navbar,
} from 'react-bootstrap';

const NavBar = () => (
  <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
    <Container>
      <Navbar.Brand href="#home">Device Store</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <Nav.Link href="/cart">
            <i className="fas fa-shopping-cart pe-1" />
            Корзина
          </Nav.Link>
          <Nav.Link href="/login">
            <i className="fas fa-user pe-1" />
            Регистрация
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavBar;
