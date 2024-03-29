import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc Аутентификация (логгирование) пользователя и генерация токена
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Аутентификация email & password
  try {
    await User.findOne({ email });
  } catch (e) {
    throw new Error('Неверный адрес электронной почты или пароль');
  }

  const user = await User.findOne({ email });
  if (user && !user.isActive) throw new Error('Пользователь был удалён');

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Неверный адрес электронной почты или пароль');
  }
});

// @desc Регистрация пользователя
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error('Заполните поля');
  }

  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error('Пользователь с таким email-ом уже зарегистрирован');
  }

  const newUser = await User.create({
    name,
    email,
    password,
  });

  if (newUser) {
    res.status(201).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      token: generateToken(newUser._id),
    });
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
    });
  }
});

// @desc Измененить детали профиля пользователя
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  try {
    await User.findById(req.user._id);
  } catch (e) {
    res.status(404);
    throw new Error('Пользователь не найден');
  }

  const user = await User.findById(req.user._id);

  if (user) {
    // если имя не поменялось, оставляем старое имя
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      // автоматическая дешифровка благодаря методу модели user
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  }
});

// @desc Получить список всех пользователей сайта
// @route GET /api/users
// @access Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({"isActive": true});
  res.json(users);
});

// @desc Удалить пользователя из БД
// @route DELETE /api/user/:id
// @access Private/Admin
const deleteUserDB = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: 'Пользователь удален' });
  } else {
    res.status(404);
    throw new Error('Пользователь не найдем');
  }
});

// @desc Удалить пользователя (не удаляя из БД)
// @route DELETE /api/user/delete/:id
// @access Private/Admin
const deleteUser = asyncHandler(async (req, res) => {

  const user = await User.findById(req.params.id);

  if (user) {
    user.isActive = false;
    await user.save();
    res.json({ message: 'Пользователь удален' });
  } else {
    res.status(404);
    throw new Error('Пользователь не найдем');
  }
});

// @desc Получить пользователя по ID
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  try {
    await User.findById(req.params._id);
  } catch (e) {
    res.status(404);
    throw new Error('Пользователь не найден');
  }

  // fetch all info except the password
  const user = await User.findById(req.params.id).select('-password');
  if (user) {
    res.json(user);
  }
});

// @desc Измененить пользователя
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  try {
    await User.findById(req.params.id);
  } catch (e) {
    res.status(404);
    throw new Error('Пользователь не найден');
  }

  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
