import express from 'express';
import { createEvent, getEvents } from '../controllers/eventController.js';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();

router.post('/', authMiddleware, roleMiddleware('admin'), createEvent);
router.get('/', getEvents);

export default router;
