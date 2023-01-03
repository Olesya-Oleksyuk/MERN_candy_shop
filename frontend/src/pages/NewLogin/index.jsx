import React, { useEffect, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import DefaultLayout from '../../layout/Default';
import AuthorizationScreenWrapper from '../../components/AuthorizationScreenWrapper';
import Message from '../../components/Message';
import LoaderSpinner from '../../components/LoaderSpinner';
import FormGroupBorderless from '../../components/formElements/FormGroupBorderless';
import ButtonCandyPrimary from '../../components/buttons/ButtonCandyPrimary';

import WelcomeLogoLogin from '../../svg/welcomeLogoLogin';
import HumanLogin from '../../svg/human-login';

import useBreakpoints from '../../hooks/useBreakpoints';
import { login } from '../../actions/userActions';

import { pink } from '../../styles/colors.module.scss';
import './style.scss';

const NewLogin = () => {
  const history = useHistory();
  const location = useLocation();
  const viewport = useBreakpoints(window);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/home';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [dispatch, history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  const viewportsDesktop = ['lg', 'xl'];

  const loginFormContent = () => {
    if (loading) {
      return (
        <>
          <h1>Авторизация</h1>
          <LoaderSpinner pageCenter />
        </>
      );
    }

    if (!userInfo) {
      return (
        <>
          { error && <Message variant="danger">{error}</Message>}
          <AuthorizationScreenWrapper headerLogo={WelcomeLogoLogin}>
            {viewportsDesktop.includes(viewport)
            && (
              <>
                <p className="authorization-content__header-logo">
                  <WelcomeLogoLogin />
                </p>
                { viewportsDesktop.includes(viewport) && (
                  <div className="authorization-content__human-logo">
                    <HumanLogin
                      colors={{ circle: pink, body: '#faefee', head: '#faefee' }}
                      strokeColor="none"
                      size={{ height: '100px', width: '100px' }}
                    />
                  </div>
                ) }
              </>
            )}
            <div className="authorization-content__content-wrapper">
              <Form onSubmit={submitHandler} className="authorization__form-wrapper">
                <FormGroupBorderless
                  valueAsPlaceholder
                  inputValue={email}
                  setInputValue={setEmail}
                  controlId="email"
                  inputType="email"
                  variant="dark"
                  positioning="mt-0"
                  inputPositioning="ms-0 pt-2_5"
                >
                  Электронная почта
                </FormGroupBorderless>

                <FormGroupBorderless
                  controlId="name"
                  inputValue={password}
                  setInputValue={setPassword}
                  valueAsPlaceholder
                  inputType="password"
                  variant="dark"
                  inputPositioning="ms-0 pt-2_5"
                >
                  Пароль
                </FormGroupBorderless>
                <ButtonCandyPrimary type="submit" fullWidth className="mt-5">Вход</ButtonCandyPrimary>
              </Form>
            </div>
            <p className="authorization__redirect">
              Впервые у нас?
              <Link
                to={redirect ? `/register?redirect=${redirect}` : '/register'}
                style={{ marginLeft: '0.5rem' }}
                className="inline-link"
              >
                Зарегистрироваться
              </Link>
            </p>
          </AuthorizationScreenWrapper>
        </>
      );
    }

    return <></>;
  };

  return (
    <DefaultLayout noFooter>
      {loginFormContent()}
    </DefaultLayout>
  );
};

export default NewLogin;
