import express from 'express';
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} from '../controllers/userController.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(registerUser).get(protect, isAdmin, getUsers);

router.post('/login', authUser);

// get & put request (to update the user profile)
router
  .route('/profile/')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// GET /api/users
export default router;
