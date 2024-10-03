// src/components/AdminProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Assuming you handle admin status in AuthContext

const AdminProtectedRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth(); // Checking for both authentication and admin status

  // If the user is not authenticated or not an admin, redirect to admin login
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/admin-login" />;
  }

  // Otherwise, render the children components (e.g., admin dashboard, etc.)
  return children;
};

export default AdminProtectedRoute;
