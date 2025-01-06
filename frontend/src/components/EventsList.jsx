/* eslint-disable no-unused-vars */
import  { useState, useEffect } from 'react';
import api from '../api';

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      const { data } = await api.get('/events', {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setEvents(data);
    } catch (err) {
      setError('Failed to fetch events');
    }
  };

  const bookTicket = async (eventId) => {
    try {
      await api.post(`/events/${eventId}/book`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Ticket booked successfully');
      fetchEvents();
    } catch (err) {
      alert('Failed to book ticket');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Events</h2>
      {error && <p className="text-danger">{error}</p>}
      <ul className="list-group">
        {events.map((event) => (
          <li key={event._id} className="list-group-item d-flex justify-content-between align-items-center">
            {event.name} ({event.ticketsAvailable} tickets left)
            <button className="btn btn-primary btn-sm" onClick={() => bookTicket(event._id)}>
              Book Ticket
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
