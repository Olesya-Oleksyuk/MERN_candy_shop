import React from 'react';
import {
  Container, Nav, Navbar,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './style.scss';

const NavBar = () => (
  <Navbar className="customNav" bg="dark" variant="dark" expand="lg" collapseOnSelect>
    <Container>
      <LinkContainer to="/">
        <Navbar.Brand>Device Store</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <LinkContainer to="/cart">
            <Nav.Link>
              <i className="fas fa-shopping-cart pe-1" />
              Корзина
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/login">
            <Nav.Link>
              <i className="fas fa-user pe-1" />
              Регистрация
            </Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
);

export default NavBar;
