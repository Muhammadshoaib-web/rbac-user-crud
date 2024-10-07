import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  timeout: 5000,
});

export const login = async (username, password) => {
  try {
    const response = await axiosInstance.post('/login', { username, password });
    return response.data;
  } catch (error) {
    console.error('Login error:', error.message);
    if (error.code === 'ECONNABORTED') {
      throw new Error('Login request timed out. Please try again.');
    } else if (error.response) {
      throw new Error(error.response.data.message || 'An unknown error occurred');
    } else if (error.request) {
      throw new Error('No response received from the server. Please check your internet connection.');
    } else {
      throw error;
    }
  }
};

export const register = async (userId, username, password, role) => {
  try {
    const response = await axiosInstance.post('/register', { userId, username, password, role }); // Include userId
    return response.data;
  } catch (error) {
    console.error('Registration error:', error.message);
    throw error;
  }
};
