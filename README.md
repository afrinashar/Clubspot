Event Ticketing System
This is a full-stack Event Ticketing System built with React on the frontend and Node.js with MongoDB on the backend. The system allows users to register, authenticate, view events, book tickets, and manage events based on their roles (Admin/Customer).

Features
1. User Management:
Registration: Users can register with roles (Admin/Customer).
Login: Users can log in, authenticate, and maintain their session using JWT tokens.
Profile: Users can view and update their profile information.
2. Event Management (Admin Only):
Create: Admin can create new events.
Read: Admin can view events and their details.
Update: Admin can update event details such as name, description, date, venue, and available tickets.
Delete: Admin can delete events.
3. Ticket Booking (Customer Only):
View Events: Customers can see the list of available events with available tickets.
Book Tickets: Customers can book tickets for an event, which decreases the available ticket count.
Cancel Booking: Customers can cancel their bookings and restore the available ticket count.
4. Frontend Interface:
User-friendly and responsive frontend built with React.
Form validation for inputs such as event date, ticket counts, etc.
Clear navigation for registration, login, viewing events, and managing events.
5. Database and Persistence:
MongoDB for storing users, events, and bookings.
Proper data modeling with user roles (Admin/Customer) and event availability.
Data integrity and validation on both frontend and backend.
6. Error Handling & Validation:
Informative error messages (e.g., "Insufficient tickets available").
Input validation (e.g., event date must be in the future, tickets count must be positive).
Tech Stack
Frontend: React, React Router, Axios
Backend: Node.js, Express, MongoDB, JWT (JSON Web Tokens)
Authentication: JWT-based authentication for secure login and role management.
Form Validation: React hooks for form handling and validation.
Setup and Installation
1. Frontend Setup (React)
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/event-ticketing-system.git
cd event-ticketing-system
cd frontend
Install dependencies:

bash
Copy code
npm install
Start the development server:

bash
Copy code
npm start
The app should now be running on http://localhost:3000.

2. Backend Setup (Node.js & MongoDB)
Navigate to the backend directory:

bash
Copy code
cd backend
Install dependencies:

bash
Copy code
npm install
Create a .env file to configure your environment variables (e.g., MongoDB URI, JWT secret):

makefile
Copy code
MONGODB_URI=mongodb://localhost:27017/event-ticketing
JWT_SECRET=your_jwt_secret
PORT=5000
Start the backend server:

bash
Copy code
npm start
The server should now be running on http://localhost:5000.

3. Database Setup
You can use MongoDB Atlas for cloud database hosting or run MongoDB locally.
Ensure MongoDB is running before starting the backend server.
4. Authentication
JWT Authentication is used for securing API routes. Upon successful login, a token is issued and must be included in the Authorization header for requests requiring authentication.
Folder Structure
Frontend:
src/components/: Contains the React components such as Login, Register, EventList, etc.
src/context/: Contains AuthContext.js for managing authentication state.
src/pages/: Contains the main pages like Home, Login, Profile, EventDetails, etc.
src/services/: Contains Axios service for making API calls to the backend.
Backend:
models/: Contains Mongoose models for User, Event, and Booking.
routes/: Contains Express routes for handling user registration, authentication, event management, and ticket booking.
controllers/: Contains the logic for user and event-related operations (e.g., creating events, booking tickets).
middleware/: Contains middleware functions like authMiddleware.js for token validation and roleMiddleware.js for role-based access control.
config/: Contains configuration for MongoDB connection and JWT secret.
API Endpoints
Authentication:
POST /api/auth/register: Register a new user.
POST /api/auth/login: Login an existing user and receive a JWT token.
GET /api/auth/user: Get user information (protected route).
Event Management (Admin):
POST /api/events: Create a new event.
GET /api/events: Get a list of events.
GET /api/events/:id: Get event details by ID.
PUT /api/events/:id: Update an event.
DELETE /api/events/:id: Delete an event.
Ticket Booking (Customer):
POST /api/bookings: Book tickets for an event.
DELETE /api/bookings/:id: Cancel a booking.
Role-Based Access Control
Admin: Can manage events, view all bookings, and create/update/delete events.
Customer: Can view events, book tickets, and cancel bookings.
Error Handling
Errors are handled gracefully with informative messages (e.g., "Insufficient tickets available", "Event date must be in the future").
API responses contain the necessary error message for debugging.
