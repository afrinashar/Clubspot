import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },
  ticketsAvailable: {
    type: Number,
    required: true,
    min: 0,
  },
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
export default Event;
