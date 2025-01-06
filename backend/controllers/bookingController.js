import Event from '../models/Event.js';
import Booking from '../models/Booking.js';

export const bookTickets = async (req, res) => {
  const { eventId, ticketsBooked } = req.body;
  const user = req.user;

  try {
    const event = await Event.findById(eventId);
    if (event.ticketsAvailable < ticketsBooked) {
      return res.status(400).json({ message: 'Not enough tickets available' });
    }

    const booking = await Booking.create({ user: user.id, event: eventId, ticketsBooked });
    event.ticketsAvailable -= ticketsBooked;
    await event.save();

    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Cancel Booking
export const cancelBooking = async (req, res) => {
  const { bookingId } = req.body;
  const user = req.user;

  try {
    const booking = await Booking.findById(bookingId).populate('event');
    if (booking.user.toString() !== user.id) {
      return res.status(403).json({ message: 'You cannot cancel this booking' });
    }

    booking.event.ticketsAvailable += booking.ticketsBooked;
    await booking.event.save();
    await booking.remove();

    res.status(200).json({ message: 'Booking canceled' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
