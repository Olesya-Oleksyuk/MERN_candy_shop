import React, { useEffect, useState } from 'react';
import {
  Button, Form, FormControl, FormGroup, FormLabel,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Message from '../Message';
import ButtonCandyPrimary from '../buttons/ButtonCandyPrimary';
import LoaderSpinner from '../LoaderSpinner';

import { getUserDetails, updateUserProfile } from '../../actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../../constants/userConstants';

import './style.scss';

const EditProfileInfoForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else if (!user?.name) {
      dispatch(getUserDetails('profile'));
    } else {
      setName(user.name);
      setEmail(user.email);
    }
  }, [dispatch, history, userInfo, user]);

  // удаляем сообщение об "обновлении профиля", если оно есть при уходе со страницы
  useEffect(() => function removeUpdateMessage() {
    if (success) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
    }
  }, [history, success]);

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

  const getFormContent = () => {
    if (loading) {
      return (
        <LoaderSpinner center />
      );
    }
    return (
      <>
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
          <div className="edit-profile__update-btn">
            <ButtonCandyPrimary type="submit" variant="light" fullWidth>Обновить</ButtonCandyPrimary>
          </div>
        </Form>
      </>
    );
  };

  return (
    <>
      {getFormContent()}
    </>
  );
};

export default EditProfileInfoForm;
