/* eslint-disable no-unused-vars */
import  { useEffect, useState } from 'react';
import API from '../api';

const EventsList = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      const { data } = await API.get('/events');
      setEvents(data);
    } catch (err) {
      alert('Error fetching events');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div>
      <h3>Available Events</h3>
      <ul className="list-group">
        {events.map((event) => (
          <li key={event.id} className="list-group-item">
            <strong>{event.name}</strong> - {event.date} - {event.venue} - {event.availableTickets} tickets
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventsList;
