 import EventsList from '../components/EventsList.jsx';
import BookTickets from '../components/Customer/BookTickets';

const CustomerDashboard = () => {
  return (
    <div className="container mt-5">
      <h2>Customer Dashboard</h2>
      <EventsList />
      <BookTickets />
    </div>
  );
};

export default CustomerDashboard;
