// src/components/AdminLogin.js
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import useAuth hook

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { adminLogin } = useAuth(); // Get the adminLogin function from AuthContext
  const navigate = useNavigate();

  const handleLogin = () => {
    // Example: Hardcoded admin credentials (replace with real authentication logic)
    if (username === 'admin' && password === 'admin123') {
      adminLogin(); // Set admin authentication state
      navigate('/admin-dashboard'); // Redirect to admin dashboard
    } else {
      alert('Invalid admin credentials');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper sx={{ padding: '30px', width: '300px' }}>
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>Admin Login</Typography>
        <TextField 
          label="Username" 
          fullWidth 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
          sx={{ marginBottom: '15px' }} 
        />
        <TextField 
          label="Password" 
          type="password" 
          fullWidth 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          sx={{ marginBottom: '15px' }} 
        />
        <Button variant="contained" color="primary" onClick={handleLogin} fullWidth>Login</Button>
      </Paper>
    </Box>
  );
};

export default AdminLogin;
