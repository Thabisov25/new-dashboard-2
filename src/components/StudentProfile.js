import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography, Avatar, List, ListItem, ListItemText, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import dayjs from 'dayjs'; // For date comparisons
import { useStudent } from '../contexts/StudentContext'; // Import the student context

const StudentProfile = () => {
  const { currentStudent } = useStudent(); // Use context to get the current student
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Load student data dynamically based on the current student's ID
    const loadStudentData = async () => {
      if (currentStudent && currentStudent.id) {
        try {
          const data = await import(`../data/students/${currentStudent.id}.js`); // Dynamically import student data
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

  if (error) {
    return <Typography sx={{ color: '#ffffff', textAlign: 'center', marginTop: '20px' }}>{error}</Typography>;
  }

  if (!student) {
    return <Typography sx={{ color: '#ffffff', textAlign: 'center', marginTop: '20px' }}>Loading...</Typography>;
  }

  // Destructure student data according to the original data provided
  const {
    personalDetails: {
      id: studentId,
      name: fullName,
      age,
      grade,
      contact: { email, phone, address },
    },
    paymentInformation = [],
    academicPerformance: { averageGrade, bestSubject, subjectNeedingImprovement },
  } = student;

  // Determine the current session based on today's date
  const today = dayjs();
  const currentSession = paymentInformation.find(
    (session) => today.isAfter(dayjs(session.startDate)) && today.isBefore(dayjs(session.endDate))
  );

  return (
    <Box sx={{ p: 3, backgroundColor: '#2c2c2c', color: '#ffffff', minHeight: '100vh' }}>
      {/* Header Section */}
      <AnimatedPaper>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={4}>
            <Avatar alt={fullName} sx={{ width: 120, height: 120, mb: 2 }} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography variant="h4" sx={{ color: 'teal', transition: 'color 0.3s ease' }}>
              {fullName}
            </Typography>
            <Typography variant="h6" sx={{ color: '#ffffff' }}>Grade: {grade}</Typography>
            <Typography variant="body1" sx={{ color: '#ffffff' }}>Student ID: {studentId}</Typography>
            <Typography variant="body1" sx={{ color: '#ffffff' }}>Age: {age}</Typography>
          </Grid>
        </Grid>
      </AnimatedPaper>

      {/* Personal Information Section */}
      <AnimatedPaper sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, color: '#ffffff' }}>Personal Information</Typography>
        <List>
          <ListItem>
            <ListItemText primary="Full Name" secondary={fullName} primaryTypographyProps={{ color: '#ffffff' }} secondaryTypographyProps={{ color: 'teal' }} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Email Address" secondary={email} primaryTypographyProps={{ color: '#ffffff' }} secondaryTypographyProps={{ color: 'teal' }} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Phone Number" secondary={phone} primaryTypographyProps={{ color: '#ffffff' }} secondaryTypographyProps={{ color: 'teal' }} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Home Address" secondary={address} primaryTypographyProps={{ color: '#ffffff' }} secondaryTypographyProps={{ color: 'teal' }} />
          </ListItem>
        </List>
      </AnimatedPaper>

      {/* Current Session Section */}
      <AnimatedPaper sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, color: '#ffffff' }}>Current Session</Typography>
        {currentSession ? (
          <List>
            <ListItem>
              <ListItemText primary="Session Type" secondary={currentSession.sessionType} primaryTypographyProps={{ color: '#ffffff' }} secondaryTypographyProps={{ color: 'teal' }} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Start Date" secondary={dayjs(currentSession.startDate).format('YYYY-MM-DD')} primaryTypographyProps={{ color: '#ffffff' }} secondaryTypographyProps={{ color: 'teal' }} />
            </ListItem>
            <ListItem>
              <ListItemText primary="End Date" secondary={dayjs(currentSession.endDate).format('YYYY-MM-DD')} primaryTypographyProps={{ color: '#ffffff' }} secondaryTypographyProps={{ color: 'teal' }} />
            </ListItem>
          </List>
        ) : (
          <Typography variant="body1" sx={{ color: '#bbb' }}>
            No active session
          </Typography>
        )}
      </AnimatedPaper>

      {/* Payment History */}
      <AnimatedPaper sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, color: '#ffffff' }}>Payment History</Typography>
        <List>
          {paymentInformation.length > 0 ? (
            paymentInformation.map((payment, index) => (
              <Box key={index}>
                <ListItem>
                  <ListItemText
                    primary={`Payment ${index + 1}: R${payment.amountPaid}`}
                    secondary={`Date Paid: ${dayjs(payment.datePaid).format('YYYY-MM-DD')}`}
                    primaryTypographyProps={{ color: '#ffffff' }}
                    secondaryTypographyProps={{ color: 'teal' }}
                  />
                </ListItem>
                <Divider sx={{ backgroundColor: '#555', my: 1 }} />
              </Box>
            ))
          ) : (
            <Typography sx={{ color: '#ccc' }}>No payment history available.</Typography>
          )}
        </List>
      </AnimatedPaper>

      {/* Academic Insights Section */}
      <AnimatedPaper sx={{ mt: 4 }}>
        <Typography variant="h5" sx={{ mb: 2, color: '#ffffff' }}>Academic Insights</Typography>
        <List>
          <ListItem>
            <ListItemText primary="Average Grade/Score" secondary={averageGrade || 'N/A'} primaryTypographyProps={{ color: '#ffffff' }} secondaryTypographyProps={{ color: 'teal' }} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Best Performing Subject" secondary={bestSubject || 'N/A'} primaryTypographyProps={{ color: '#ffffff' }} secondaryTypographyProps={{ color: 'teal' }} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Subject Needing Improvement" secondary={subjectNeedingImprovement || 'N/A'} primaryTypographyProps={{ color: '#ffffff' }} secondaryTypographyProps={{ color: 'teal' }} />
          </ListItem>
        </List>
      </AnimatedPaper>
    </Box>
  );
};

// Styled component for the Paper sections with animation
const AnimatedPaper = styled(Paper)(({ theme }) => ({
  padding: '20px',
  backgroundColor: '#333',
  color: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  marginBottom: '20px',
  opacity: 0,
  transform: 'translateY(20px)',
  animation: 'fadeIn 0.5s ease forwards',

  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px)',
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

export default StudentProfile;
