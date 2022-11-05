import React, { useDispatch, useSelector } from 'react-redux';
import {
  Container, Nav, Navbar, NavDropdown,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { logout } from '../../actions/userActions';
import './style.scss';

const NavBar = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  const userLoggedIn = () => {
    if (userInfo) {
      return (
        <NavDropdown title={userInfo.name} id="username">
          <LinkContainer to="/profile">
            <NavDropdown.Item>Профиль</NavDropdown.Item>
          </LinkContainer>
          <NavDropdown.Item onClick={logoutHandler}>Выход</NavDropdown.Item>
        </NavDropdown>
      );
    }
    return (
      <LinkContainer to="/login">
        <Nav.Link>
          <i className="fas fa-user pe-1" />
          Вход
        </Nav.Link>
      </LinkContainer>
    );
  };

  const userIsAdmin = () => {
    if (userInfo && userInfo.isAdmin) {
      return (
        <NavDropdown title="Админ" id="adminmenu">
          <LinkContainer to="/admin/userlist">
            <NavDropdown.Item>Пользователи</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/admin/productlist">
            <NavDropdown.Item>Продукты</NavDropdown.Item>
          </LinkContainer>
          <LinkContainer to="/admin/orderlist">
            <NavDropdown.Item>Заказы</NavDropdown.Item>
          </LinkContainer>
        </NavDropdown>
      );
    }
    return <></>;
  };

  return (
    <Navbar className="customNav" bg="primary" variant="dark" expand="lg" collapseOnSelect>
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>Candy Shop</Navbar.Brand>
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
            {userLoggedIn()}
            {userIsAdmin()}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
