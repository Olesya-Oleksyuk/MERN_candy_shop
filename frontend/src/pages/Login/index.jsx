import React, { useState, useEffect } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  Form, Button, Row, Col, FormGroup, FormLabel, FormControl,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { login } from '../../actions/userActions';
import FormContainer from '../../components/FormContainer';

const LoginScreen = () => {
  const history = useHistory();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [dispatch, history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const loginFormContent = () => {
    if (loading) {
      return (
        <>
          <h1>Авторизация</h1>
          <Loader />
        </>
      );
    }

    if (!userInfo) {
      return (
        <>
          { error && <Message variant="danger">{error}</Message>}
          <Form onSubmit={submitHandler}>
            <FormGroup controlId="email" className="my-3">
              <FormLabel>Электронная почта</FormLabel>
              <FormControl type="email" placeholder="Введите email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormGroup>
            <FormGroup controlId="password" className="my-3">
              <FormLabel>Пароль</FormLabel>
              <FormControl type="password" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormGroup>
            <Button type="submit" variant="primary" className="mt-3">
              Вход
            </Button>
          </Form>

          <Row className="py-3">
            <Col>
              Впервые у нас?
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
                style={{ marginLeft: '10px' }}
                className="regular-link"
              >
                Зарегистрироваться
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

export default LoginScreen;
