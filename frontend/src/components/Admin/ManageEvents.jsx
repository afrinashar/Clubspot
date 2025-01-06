/* eslint-disable no-unused-vars */
import  { useState, useEffect } from 'react';
import API from '../../api';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    venue: '',
    availableTickets: 0,
  });

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

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/events', formData);
      fetchEvents();
      alert('Event created successfully');
      setFormData({
        name: '',
        description: '',
        date: '',
        venue: '',
        availableTickets: 0,
      });
    } catch (err) {
      alert('Error creating event');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/events/${id}`);
      fetchEvents();
      alert('Event deleted successfully');
    } catch (err) {
      alert('Error deleting event');
    }
  };

  return (
    <div>
      <h3>Manage Events</h3>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Description</label>
          <textarea
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Date</label>
          <input
            type="date"
            name="date"
            className="form-control"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Venue</label>
          <input
            type="text"
            name="venue"
            className="form-control"
            value={formData.venue}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-3">
          <label>Available Tickets</label>
          <input
            type="number"
            name="availableTickets"
            className="form-control"
            value={formData.availableTickets}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Create Event</button>
      </form>
      <h3>Event List</h3>
      <ul className="list-group">
        {events.map((event) => (
          <li key={event.id} className="list-group-item">
            <div>
              <strong>{event.name}</strong> - {event.date} - {event.venue} - {event.availableTickets} tickets
            </div>
            <button
              className="btn btn-danger btn-sm mt-2"
              onClick={() => handleDelete(event.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageEvents;
