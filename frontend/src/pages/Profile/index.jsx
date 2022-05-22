import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Form, Button, Row, Col, FormGroup, FormLabel, FormControl,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { getUserDetails, updateUserProfile } from '../../actions/userActions';

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
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (!user.name) {
      dispatch(getUserDetails('profile'));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, history, userInfo, user]);

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
            { success && <Message variant="success">Профиль обновлён</Message>}
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
