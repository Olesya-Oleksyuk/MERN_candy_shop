import express from 'express';
import { authUser, getUserProfile } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', authUser);

// get & put request (to update the user profile)
router.route('/profile/').get(getUserProfile);

export default router;
