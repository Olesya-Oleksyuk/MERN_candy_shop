import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

// В зависимости от токена, который мы передаем в запросе, мы получаем доступ
// к ip-пользователя, который закодирован в токене, запрашиваем (fetching) этого
// пользователя в аутентификационном мидлваре и присваиваем данные
// о его профиле к телу запроса и затем мы можем использовать эту информацию
// (через req.user) в ЛЮБОМ защищенном маршруте, к нам приедется обрабатывать
// например req.user.id
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      console.log('Token found: ', req.headers.authorization);
      token = req.headers.authorization.split(' ')[1];

      // верифицируем полученный токен на основе "секретной" подписи
      // если успешно => декодируем полученный токен
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded: ', decoded);

      // добавляем информацию о пользователе в тело запроса (кроме пароля)
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (err) {
      console.error(err);
      res.status(401);
      throw new Error('Ошибка авторизации! Токен повреждён');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Ошибка авторизации! Токен отсутствует');
  }
});

// для защиты маршрутов, доступных только пользователю-администратору
const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Пользователь не авторизован в качестве админа');
  }
};

export { protect, isAdmin };
