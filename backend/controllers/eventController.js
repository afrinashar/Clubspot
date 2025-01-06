import Event from '../models/Event.js';

export const createEvent = async (req, res) => {
  const { name, description, date, venue, ticketsAvailable } = req.body;

  try {
    const event = await Event.create({ name, description, date, venue, ticketsAvailable });
    res.status(201).json(event);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

 