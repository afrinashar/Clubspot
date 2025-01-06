import express from 'express';
import { bookTickets, cancelBooking } from '../controllers/bookingController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/book', authMiddleware, bookTickets);
router.post('/cancel', authMiddleware, cancelBooking);

export default router;
