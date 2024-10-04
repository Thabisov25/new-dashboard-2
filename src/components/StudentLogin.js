import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';  // Import AuthContext
import { useStudent } from '../contexts/StudentContext';  // Import StudentContext
import studentData from '../data/studentData';  // Import the student data

const StudentLogin = () => {
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();  // Get login function from AuthContext
  const { setCurrentStudent } = useStudent();  // Get the function to set the current student
  const navigate = useNavigate();

  const handleLogin = () => {
    // Check if the entered student ID and password match any entry in studentData
    const student = studentData.find(
      (student) => student.id === studentId && student.password === password
    );

    if (student) {
      // Set the current student in StudentContext
      setCurrentStudent(student);

      // Call the login function to set authentication
      login();

      // Navigate to the dashboard using HashRouter route
      navigate('/dashboard');  // This should work fine with HashRouter
    } else {
      alert('Invalid Student ID or Password');
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Paper sx={{ padding: '30px', width: '300px' }}>
        <Typography variant="h5" sx={{ marginBottom: '20px' }}>Student Login</Typography>
        <TextField 
          label="Student ID" 
          fullWidth 
          value={studentId} 
          onChange={(e) => setStudentId(e.target.value)} 
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

export default StudentLogin;
