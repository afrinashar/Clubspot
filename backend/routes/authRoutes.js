import express from 'express';
import { updateProfile } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Route to update user profile
router.put('/update', authMiddleware, updateProfile);

export default router;
