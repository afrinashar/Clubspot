import   { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';  // Assuming you have an AuthContext for JWT management

const Profile = () => {
  const { user, setUser } = useAuth(); // Using context to manage user state and JWT
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data on mount
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    } else {
      navigate('/login');  // Redirect to login if no user is authenticated
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const updatedUser = { username, email, password };

    try {
      const token = localStorage.getItem('token');  // Get token from localStorage or Context
      const response = await axios.put('/api/auth/update', updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(response.data.user); // Update the user in context after successful update
      setMessage('Profile updated successfully');
    } catch (error) {
      setMessage('Error updating profile');
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1>Profile</h1>

      {message && <div className="alert alert-info">{message}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password (Leave empty to keep current password)
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default Profile;
