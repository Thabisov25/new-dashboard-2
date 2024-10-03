import React, { useEffect, useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Divider, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useStudent } from '../contexts/StudentContext'; // Import the custom hook

const logo = process.env.PUBLIC_URL + '/logo.png'; // Reference to the logo

const PaymentHistory = () => {
  const { currentStudent } = useStudent(); // Get the current student from context
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null); // For error handling

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

  // Display an error message if there's an issue
  if (error) {
    return <Typography sx={{ color: '#ffffff', textAlign: 'center', marginTop: '20px' }}>{error}</Typography>;
  }

  // If student data is still loading, show "Loading..."
  if (!student) {
    return <Typography sx={{ color: '#ffffff', textAlign: 'center', marginTop: '20px' }}>Loading...</Typography>;
  }

  const { paymentInformation = [] } = student; // Safeguard for empty payment information

  return (
    <Box
      sx={{
        flexGrow: 1,
        p: 3,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2c2c2c',
        backgroundImage: `url(${logo})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundBlendMode: 'overlay',
        filter: 'blur(8px)', // Apply blur to the background logo
        position: 'relative',
      }}
    >
      {/* Background overlay */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(44, 44, 44, 0.8)',
          zIndex: -1, // Keep behind the content
        }}
      />
      
      <StyledPaper>
        <Typography variant="h6" sx={{ color: 'teal', fontWeight: 'bold' }}>Payment History</Typography>
        <List>
          {paymentInformation.length > 0 ? (
            paymentInformation.map((payment) => (
              <React.Fragment key={payment.paymentId}>
                <ListItem>
                  <ListItemText
                    primary={`Paid: R${payment.amountPaid}`}
                    secondary={`Date: ${payment.datePaid}`}
                    primaryTypographyProps={{ style: { color: '#fff' } }}
                    secondaryTypographyProps={{ style: { color: '#ccc' } }}
                  />
                </ListItem>
                <Typography variant="body2" sx={{ color: '#fff', marginLeft: 2 }}>
                  Sessions Covered:
                </Typography>
                {payment.sessionsCovered.map((session) => (
                  <Typography key={session.sessionId} variant="body2" sx={{ color: '#fff', marginLeft: 4 }}>
                    {session.subject} - {session.topic} ({session.startDate} to {session.endDate})
                  </Typography>
                ))}
                <Divider sx={{ backgroundColor: '#555' }} />
              </React.Fragment>
            ))
          ) : (
            <Typography variant="body2" sx={{ color: '#ccc', textAlign: 'center' }}>
              No payment history available.
            </Typography>
          )}
        </List>
      </StyledPaper>
    </Box>
  );
};

const StyledPaper = styled(Paper)({
  padding: '20px',
  backgroundColor: '#333',
  color: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
});

export default PaymentHistory;
