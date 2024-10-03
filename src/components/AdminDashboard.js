// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';
import axios from 'axios';

const AdminDashboard = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    age: '',
    grade: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    sessionEnd: '',
  });

  // Fetch students from the backend API
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/students', {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        });
        setStudents(response.data);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []);

  // Function to add a new student using the backend API
  const handleAddStudent = async () => {
    console.log('Add Student Button Clicked'); // Debugging: Ensure this log shows up
    try {
      const response = await axios.post(
        'http://localhost:5000/api/admin/students/register',
        {
          name: newStudent.name,
          age: parseInt(newStudent.age),
          grade: parseInt(newStudent.grade),
          contact: {
            email: newStudent.email,
            phone: newStudent.phone,
            address: newStudent.address,
            dateOfBirth: newStudent.dateOfBirth,
          },
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        }
      );

      // Update state with new student data from response
      setStudents([...students, { ...newStudent, id: response.data.studentId }]);
      
      // Reset the newStudent form fields
      setNewStudent({
        name: '',
        age: '',
        grade: '',
        email: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        sessionEnd: '',
      });
    } catch (error) {
      console.error('Error adding student:', error); // Debugging: Log any error encountered
      alert('Failed to add student. Please check the console for details.');
    }
  };

  // Function to update payment status and session end date for a student
  const handleUpdateStudent = async (id, key, value) => {
    try {
      const updatedStudents = students.map((student) =>
        student.personalDetails.id === id ? { ...student, [key]: value } : student
      );
      setStudents(updatedStudents);

      await axios.put(
        `http://localhost:5000/api/admin/students/${id}`,
        { [key]: value },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem('adminToken')}` },
        }
      );
    } catch (error) {
      console.error('Error updating student:', error);
    }
  };

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" sx={{ marginBottom: '20px' }}>
        Admin Dashboard
      </Typography>

      <Grid container spacing={2}>
        {/* Add New Student Section */}
        <Grid item xs={12}>
          <Paper sx={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h6">Add New Student</Typography>
            <TextField
              label="Name"
              fullWidth
              value={newStudent.name}
              onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
              sx={{ marginTop: '10px' }}
            />
            <TextField
              label="Age"
              type="number"
              fullWidth
              value={newStudent.age}
              onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
              sx={{ marginTop: '10px' }}
            />
            <TextField
              label="Grade"
              type="number"
              fullWidth
              value={newStudent.grade}
              onChange={(e) => setNewStudent({ ...newStudent, grade: e.target.value })}
              sx={{ marginTop: '10px' }}
            />
            <TextField
              label="Email"
              fullWidth
              value={newStudent.email}
              onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
              sx={{ marginTop: '10px' }}
            />
            <TextField
              label="Phone"
              fullWidth
              value={newStudent.phone}
              onChange={(e) => setNewStudent({ ...newStudent, phone: e.target.value })}
              sx={{ marginTop: '10px' }}
            />
            <TextField
              label="Address"
              fullWidth
              value={newStudent.address}
              onChange={(e) => setNewStudent({ ...newStudent, address: e.target.value })}
              sx={{ marginTop: '10px' }}
            />
            <TextField
              label="Date of Birth"
              type="date"
              fullWidth
              value={newStudent.dateOfBirth}
              onChange={(e) => setNewStudent({ ...newStudent, dateOfBirth: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{ marginTop: '10px' }}
            />
            <TextField
              label="Session End Date"
              type="date"
              fullWidth
              value={newStudent.sessionEnd}
              onChange={(e) => setNewStudent({ ...newStudent, sessionEnd: e.target.value })}
              InputLabelProps={{ shrink: true }}
              sx={{ marginTop: '10px' }}
            />
            <Button
              variant="contained"
              color="primary"
              sx={{ marginTop: '10px' }}
              onClick={handleAddStudent}
            >
              Add Student
            </Button>
          </Paper>
        </Grid>

        {/* Manage Students Section */}
        <Grid item xs={12}>
          <Paper sx={{ padding: '20px', marginBottom: '20px' }}>
            <Typography variant="h6">Manage Students</Typography>
            <List>
              {students.map((student) => (
                <React.Fragment key={student.personalDetails.id}>
                  <ListItem>
                    <ListItemText
                      primary={`${student.personalDetails.name} (${student.personalDetails.id})`}
                      secondary={`Email: ${student.personalDetails.contact.email} - Payment Status: ${student.paymentStatus || 'Unpaid'}`}
                    />
                    <TextField
                      label="Payment Status"
                      fullWidth
                      value={student.paymentStatus || 'Unpaid'}
                      onChange={(e) => handleUpdateStudent(student.personalDetails.id, 'paymentStatus', e.target.value)}
                      sx={{ marginTop: '10px', width: '150px', marginLeft: '10px' }}
                    />
                    <TextField
                      label="Session End Date"
                      type="date"
                      fullWidth
                      value={student.sessionEnd || ''}
                      onChange={(e) => handleUpdateStudent(student.personalDetails.id, 'sessionEnd', e.target.value)}
                      sx={{ marginTop: '10px', width: '150px', marginLeft: '10px' }}
                      InputLabelProps={{ shrink: true }}
                    />
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AdminDashboard;
