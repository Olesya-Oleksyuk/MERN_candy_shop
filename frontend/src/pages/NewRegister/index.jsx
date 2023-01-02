import React, { useEffect, useRef, useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Form } from 'react-bootstrap';

import DefaultLayout from '../../layout/Default';
import LoaderSpinner from '../../components/LoaderSpinner';
import Message from '../../components/Message';
import LoginRegisterContainer from '../../components/LoginRegisterContainer';
import FormGroupBorderless from '../../components/formElements/FormGroupBorderless';
import ButtonCandyPrimary from '../../components/buttons/ButtonCandyPrimary';

import RegistrationCandyshopLogo from '../../svg/registrationCandyshopLogo';

import useInputAutocomplete from '../../hooks/useInputAutocomplete';
import useBreakpoints from '../../hooks/useBreakpoints';

import { register } from '../../actions/userActions';

import './style.scss';

const NewRegister = () => {
  const history = useHistory();
  const location = useLocation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const viewport = useBreakpoints(window);
  const viewportsDesktop = ['lg', 'xl'];

  const passwordRef = useRef();
  const confirmPasswordRef = useRef();

  useInputAutocomplete(passwordRef, 'new-password');
  useInputAutocomplete(confirmPasswordRef, 'new-password');

  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo: userRegisteredInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userRegisteredInfo) {
      history.push(redirect);
    }
  }, [dispatch, history, userRegisteredInfo, redirect]);

  const submitHandler = (e) => {
    setMessage(null);
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Пароли не совпадают!');
    } else {
      dispatch(register(name, email, password));
    }
  };

  const newRef = useRef();

  const loginFormContent = () => {
    if (loading) {
      return (
        <>
          <LoaderSpinner pageCenter />
        </>
      );
    }

    if (!userRegisteredInfo) {
      return (
        <>
          { message && <Message variant="danger">{message}</Message>}
          { error && <Message variant="danger">{error}</Message>}
          <LoginRegisterContainer registerPage>
            {viewportsDesktop.includes(viewport)
            && (
              <>
                <p className="login__login-logo mb-5">
                  <RegistrationCandyshopLogo />
                </p>
              </>
            )}
            <div className="login-form__content-wrapper">
              <Form onSubmit={submitHandler} ref={newRef} className="login-form__form-wrapper">
                <FormGroupBorderless
                  inputValue={name}
                  setInputValue={setName}
                  controlId="name"
                  inputType="name"
                  variant="dark"
                  // positioning="mt-0"
                  inputPositioning="ms-0 pt-2_5"
                  positioning="mt-0"
                >
                  Введите имя
                </FormGroupBorderless>
                <FormGroupBorderless
                  inputValue={email}
                  setInputValue={setEmail}
                  controlId="email"
                  inputType="email"
                  variant="dark"
                  // positioning="mt-0"
                  inputPositioning="ms-0 pt-2_5"
                >
                  Введите электронную почту
                </FormGroupBorderless>
                <FormGroupBorderless
                  controlId="name"
                  inputValue={password}
                  setInputValue={setPassword}
                  inputType="password"
                  variant="dark"
                  inputPositioning="ms-0 pt-2_5"
                  inputRef={passwordRef}
                >
                  Введите пароль
                </FormGroupBorderless>
                <FormGroupBorderless
                  controlId="confirmPassword"
                  inputValue={confirmPassword}
                  setInputValue={setConfirmPassword}
                  inputType="password"
                  variant="dark"
                  inputPositioning="ms-0 pt-2_5"
                  inputRef={confirmPasswordRef}
                >
                  Повторите пароль
                </FormGroupBorderless>
                <ButtonCandyPrimary type="submit" fullWidth className="mt-5 register-screen__button">Создать</ButtonCandyPrimary>
              </Form>
            </div>
            <p className="login-form__redirect">
              Уже зарегистрированы?
              <Link
                to={redirect ? `/login?redirect=${redirect}` : '/login'}
                style={{ marginLeft: '0.5rem' }}
                className="inline-link"
              >
                Авторизироваться
              </Link>
            </p>
          </LoginRegisterContainer>
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

export default NewRegister;
