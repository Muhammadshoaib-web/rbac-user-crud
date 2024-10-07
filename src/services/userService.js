import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const authHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const deleteUser = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/users/${id}`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};

// Keep other functions unchanged
export const getUsers = async () => {
  const response = await axios.get(`${API_URL}/users`, { headers: authHeader() });
  return response.data;
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/users/${id}`, { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
};

export const updateUser = async (id, userData) => {
  try {
    const response = await axios.put(`${API_URL}/users/${id}`, userData, { headers: authHeader() });
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error.response?.data || error.message);
    throw error.response?.data || error;
  }
};