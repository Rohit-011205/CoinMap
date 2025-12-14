import express from 'express';
import { signup,login,getProfile } from '../controllers/auth.controller.js';
import authMiddleware from '../middlewares/user.middleware.js';
// import react-ro

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

router.get('/profile', authMiddleware, getProfile);

export default router;