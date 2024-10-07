import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Login from '../Pages/Auth/Login';
import Register from '../Pages/Auth/Register';
import Dashboard from '../Pages/Dashboard/Dashboard';


const PrivateRoute = ({ element }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? element : <Navigate to="/login" />;
};

// Main AppRoutes component
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} />
      <Route path="/" element={<Navigate to="/login" />} />
      {/* You can add more routes here as needed */}
    </Routes>
  );
};

export default AppRoutes;
