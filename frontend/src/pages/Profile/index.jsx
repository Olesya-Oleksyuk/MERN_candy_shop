import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';

import {
  Form, Button, Row, Col, FormGroup, FormLabel, FormControl, Table,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { toCurrency } from '../../helpers/data';
import { CURRENCY } from '../../helpers/constants';

import { getUserDetails, updateUserProfile } from '../../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants';
import { listCustomerOrder } from '../../actions/orderAction';

const ProfileScreen = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success: userUpdatedSuccess } = userUpdateProfile;

  const orderListCustomer = useSelector((state) => state.orderListCustomer);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListCustomer;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (!user?.name) {
      dispatch(getUserDetails('profile'));
      dispatch(listCustomerOrder());
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, history, userInfo, user]);

  // удаляем сообщение об "обновлении профиля", если оно есть при уходе со страницы
  useEffect(() => function removeUpdateMessage() {
    if (userUpdatedSuccess) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
    }
  }, [history, userUpdatedSuccess]);

  const submitHandler = (e) => {
    setMessage(null);
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Пароли не совпадают!');
    } else {
      dispatch(updateUserProfile({
        id: user._id, name, email, password,
      }));
    }
  };

  const loginFormContent = () => {
    if (loading) {
      return (
        <Loader />
      );
    }

    if (userInfo) {
      return (
        <Row>
          <Col md={3}>
            <h2>Профиль</h2>
            { message && <Message variant="danger">{message}</Message>}
            { error && <Message variant="danger">{error}</Message>}
            { userUpdatedSuccess && <Message variant="success">Профиль обновлён</Message>}
            <Form onSubmit={submitHandler}>
              <FormGroup controlId="name" className="my-3">
                <FormLabel>Имя пользователя</FormLabel>
                <FormControl
                  type="name"
                  placeholder="Введите имя"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId="email" className="my-3">
                <FormLabel>Электронная почта</FormLabel>
                <FormControl
                  type="email"
                  placeholder="Введите email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId="password" className="my-3">
                <FormLabel>Пароль</FormLabel>
                <FormControl
                  type="password"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup controlId="confirmPassword" className="my-3">
                <FormLabel>Пароль</FormLabel>
                <FormControl
                  type="password"
                  placeholder="Подтвердите пароль"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </FormGroup>
              <Button type="submit" variant="primary" className="my-3">
                Обновить
              </Button>
            </Form>
          </Col>
          <Col>
            <h2>Мои заказы</h2>
            { loadingOrders ? <Loader /> : errorOrders ? <Message variant="danger">{errorOrders}</Message> : (
              <Table striped bordered hover responsive size="sm" style={{ textAlign: 'center' }}>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>DATE</th>
                    <th>TOTAL</th>
                    <th>PAID</th>
                    <th>DELIVERED</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{toCurrency(order.totalPrice, CURRENCY.USD)}</td>
                      <td>
                        {order.isPaid ? order.paidAt.substring(0, 10)
                          : <i className="fas fa-times" style={{ color: 'red' }} /> }
                      </td>
                      <td>
                        {order.isDelivered ? order.deliveredAt.substring(0, 10)
                          : <i className="fas fa-times" style={{ color: 'red' }} /> }
                      </td>
                      <td>
                        <LinkContainer to={`order/${order._id}`}>
                          <Button className="btn-sm" variant="light">Детали</Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) }
          </Col>
        </Row>
      );
    }

    return <></>;
  };

  return (
    <>
      {loginFormContent()}
    </>
  );
};

export default ProfileScreen;
