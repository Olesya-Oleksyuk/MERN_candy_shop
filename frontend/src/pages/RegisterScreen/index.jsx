import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  Form, Button, Row, Col, FormGroup, FormLabel, FormControl,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import FormContainer from '../../components/FormContainer';

import { register } from '../../actions/userActions';

const RegisterScreen = () => {
  const history = useHistory();
  const location = useLocation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [dispatch, history, userInfo, redirect]);

  const submitHandler = (e) => {
    setMessage(null);
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Пароли не совпадают!');
    } else {
      dispatch(register(name, email, password));
    }
  };

  const loginFormContent = () => {
    if (loading) {
      return (
        <>
          <h1>Регистрация</h1>
          <Loader />
        </>
      );
    }

    if (!userInfo) {
      return (
        <>
          { message && <Message variant="danger">{message}</Message>}
          { error && <Message variant="danger">{error}</Message>}
          <Form onSubmit={submitHandler}>
            <FormGroup controlId="name" className="my-3">
              <FormLabel>Имя пользователя</FormLabel>
              <FormControl type="name" placeholder="Введите имя" value={name} onChange={(e) => setName(e.target.value)} />
            </FormGroup>
            <FormGroup controlId="email" className="my-3">
              <FormLabel>Электронная почта</FormLabel>
              <FormControl type="email" placeholder="Введите email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormGroup>
            <FormGroup controlId="password" className="my-3">
              <FormLabel>Пароль</FormLabel>
              <FormControl type="password" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormGroup>
            <FormGroup controlId="confirmPassword" className="my-3">
              <FormLabel>Пароль</FormLabel>
              <FormControl type="password" placeholder="Подтвердите пароль" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </FormGroup>
            <Button type="submit" variant="primary" className="mt-3">
              Создать
            </Button>
          </Form>

          <Row className="py-3">
            <Col>
              Уже зарегистрированы?
              <Link
                to={redirect ? `/login?redirect=${redirect}` : '/login'}
                style={{ marginLeft: '10px' }}
                className="regular-link"
              >
                Авторизироваться
              </Link>
            </Col>
          </Row>
        </>
      );
    }

    return <></>;
  };

  return (
    <FormContainer>
      {loginFormContent()}
    </FormContainer>
  );
};

export default RegisterScreen;
