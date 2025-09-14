import express from 'express';
import { signup, login, getMe, logout, signupWithInvite } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/me', authenticateToken, getMe);
router.post('/logout', logout);
router.post('/signup/:token', signupWithInvite);

export default router;