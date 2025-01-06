/* eslint-disable react/prop-types */
import   { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create the context for auth state
const AuthContext = createContext();

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to wrap the app and provide the auth context
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if there's a token stored in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and fetch user data
      axios
        .get('/api/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUser(response.data.user);  // Set user data from response
        })
        .catch(() => {
          localStorage.removeItem('token');  // Remove invalid token
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // Login function to authenticate the user and set the token
  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', { email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);  // Store token in localStorage
      setUser(user);  // Set user data in context
      navigate('/');  // Redirect to the home page after login
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  // Register function to create a new user
  const register = async (username, email, password) => {
    try {
      const response = await axios.post('/api/auth/register', { username, email, password });
      const { token, user } = response.data;

      localStorage.setItem('token', token);  // Store token in localStorage
      setUser(user);  // Set user data in context
      navigate('/');  // Redirect to the home page after registration
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  // Logout function to clear the user data and token
  const logout = () => {
    localStorage.removeItem('token');  // Remove token from localStorage
    setUser(null);  // Clear user data from context
    navigate('/login');  // Redirect to the login page after logout
  };

  // Provide context values to child components
  const value = {
    user,
    loading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};
