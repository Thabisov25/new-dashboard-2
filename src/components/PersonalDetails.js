import React, { useEffect, useState } from 'react';
import { Paper, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useStudent } from '../contexts/StudentContext'; // Import the custom hook

const PersonalDetails = () => {
  const { currentStudent } = useStudent(); // Get the current student from context
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadStudentData = async () => {
      if (currentStudent && currentStudent.id) {
        try {
          const data = await import(`../data/students/${currentStudent.id}.js`);
          setStudent(data.default); // Set the student data
        } catch (err) {
          console.error('Error loading student data:', err);
          setError('Failed to load student data.');
        }
      } else {
        setError('No current student data available.');
      }
    };

    loadStudentData();
  }, [currentStudent]);

  // Show error if there's an issue loading the student data
  if (error) {
    return <Typography sx={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</Typography>;
  }

  // If data is still loading, show "Loading..."
  if (!student) {
    return <Typography sx={{ color: '#ffffff', textAlign: 'center', marginTop: '20px' }}>Loading...</Typography>;
  }

  const { personalDetails } = student;

  // Check if personalDetails are available
  if (!personalDetails || Object.keys(personalDetails).length === 0) {
    return <Typography sx={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>Personal details are not available.</Typography>;
  }

  return (
    <StyledPaper>
      <Typography variant="h6" sx={{ color: 'teal', fontWeight: 'bold' }}>Personal Details</Typography>
      <Typography>Name: {personalDetails.name || 'N/A'}</Typography>
      <Typography>Age: {personalDetails.age || 'N/A'}</Typography>
      <Typography>Grade: {personalDetails.grade || 'N/A'}</Typography>
      <Typography>Email: {personalDetails.contact?.email || 'N/A'}</Typography>
      <Typography>Phone: {personalDetails.contact?.phone || 'N/A'}</Typography>
      <Typography>Address: {personalDetails.contact?.address || 'N/A'}</Typography>
    </StyledPaper>
  );
};

const StyledPaper = styled(Paper)({
  padding: '20px',
  margin: 'auto',
  backgroundColor: '#333',
  color: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  maxWidth: '600px',
  marginTop: '20px',
});

export default PersonalDetails;
