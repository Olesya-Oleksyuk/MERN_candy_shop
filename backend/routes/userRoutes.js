import express from 'express';
import { authUser, registerUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);

router.post('/login', authUser);

// get & put request (to update the user profile)
router.route('/profile/').get(protect, getUserProfile);

export default router;
