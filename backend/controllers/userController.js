import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc Аутентификация пользователя и генерация токена
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Аутентификация email & password
  try {
    await User.findOne({ email })
  } catch (e) {
    throw new Error('Неверный адрес электронной почты или пароль')
  }

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401);
    throw new Error('Неверный адрес электронной почты или пароль')
  }

});

// @desc Регистрация пользователя
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({email});

  if (userExist) {
    res.status(400);
    throw new Error('Пользователь уже зарегистрирован');
  }

  const newUser = await User.create({
    name,
    email,
    password,
  })

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser._id),
    })
  } else {
    res.status(400);
    throw new Error('Неверные данные пользователя');
  }

});

// @desc Получить профиль пользователя
// @route GET /api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {

  try {
    await User.findById(req.user._id);
  } catch (e) {
    res.status(404);
    throw new Error('Пользователь не найден');
  }

  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  }
});

export { authUser, registerUser, getUserProfile };