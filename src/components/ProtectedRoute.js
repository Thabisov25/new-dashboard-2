// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';  // Use AuthContext for authentication

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();  // Check if the student is authenticated

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/student-login" />;
  }

  // Otherwise, render the protected component
  return children;
};

export default ProtectedRoute;
