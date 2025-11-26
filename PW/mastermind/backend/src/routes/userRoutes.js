import express from 'express';
import { registerUser, loginUser, updateUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.put('/update/:userId', updateUser);

export default router;
