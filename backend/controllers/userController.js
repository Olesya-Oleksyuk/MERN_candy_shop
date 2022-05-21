import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

// @desc Аутентификация пользователя и токен
// @route POST /api/users/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // res.send({ email, password, })

  // Аутентификация email & password
  try {
    await User.findOne({ email })
  } catch (e) {
    throw new Error('Invalid email or password')
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
    throw new Error('Invalid email or password')
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
    throw new Error('User not found');
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

export { authUser, getUserProfile };