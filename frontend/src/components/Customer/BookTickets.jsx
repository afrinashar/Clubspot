/* eslint-disable no-unused-vars */
import   { useState } from 'react';
import API from '../../api';

const BookTickets = () => {
  const [eventId, setEventId] = useState('');
  const [ticketCount, setTicketCount] = useState(1);

  const handleBook = async () => {
    try {
      await API.post(`/events/${eventId}/book`, { ticketCount });
      alert('Tickets booked successfully');
    } catch (err) {
      alert('Error booking tickets');
    }
  };

  return (
    <div className="mt-4">
      <h3>Book Tickets</h3>
      <div className="mb-3">
        <label>Event ID</label>
        <input
          type="text"
          className="form-control"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label>Number of Tickets</label>
        <input
          type="number"
          className="form-control"
          value={ticketCount}
          onChange={(e) => setTicketCount(e.target.value)}
          min="1"
          required
        />
      </div>
      <button className="btn btn-success" onClick={handleBook}>Book Tickets</button>
    </div>
  );
};

export default BookTickets;
