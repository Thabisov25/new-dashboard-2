import React, { useEffect, useState } from 'react';
import { Box, Typography, Paper, List, ListItem, ListItemText, Slide, Fade } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import EventNoteIcon from '@mui/icons-material/EventNote';
import PaidIcon from '@mui/icons-material/Paid';
import HistoryIcon from '@mui/icons-material/History';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/HourglassEmpty';
import { useStudent } from '../contexts/StudentContext'; // Import the custom hook

const PaymentSession = () => {
  const { currentStudent } = useStudent(); // Get the current student from context
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const currentDate = new Date();

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
    return <Typography sx={{ color: '#ffffff', textAlign: 'center', marginTop: '20px' }}>{error}</Typography>;
  }

  // If data is still loading, show "Loading..."
  if (!student) {
    return <Typography sx={{ color: '#ffffff', textAlign: 'center', marginTop: '20px' }}>Loading...</Typography>;
  }

  const { paymentInformation = [] } = student;
  const latestPayment = paymentInformation.length > 0 ? paymentInformation[paymentInformation.length - 1] : null;
  const balance = latestPayment ? latestPayment.amountPaid : 0;
  const sessionType = latestPayment ? latestPayment.sessionType : 'N/A';
  const startDate = latestPayment ? new Date(latestPayment.startDate) : 'N/A';
  const endDate = latestPayment ? new Date(latestPayment.endDate) : 'N/A';
  const paymentDate = latestPayment ? new Date(latestPayment.datePaid).toLocaleDateString() : 'N/A';

  const isSessionExpired = endDate && endDate < currentDate;

  // If session has expired, set all icons and values to dark grey and empty values
  const paymentStatus = latestPayment && !isSessionExpired ? 'Paid' : 'Pending';
  const paymentIcon = latestPayment && !isSessionExpired
    ? <CheckCircleIcon sx={{ fontSize: 30, color: 'green' }} />
    : <PendingIcon sx={{ fontSize: 30, color: 'darkgrey' }} />;
  
  const sessionTypeValue = !isSessionExpired ? sessionType : 'N/A';
  const startDateValue = !isSessionExpired ? startDate.toLocaleDateString() : 'N/A';
  const endDateValue = !isSessionExpired ? endDate.toLocaleDateString() : 'N/A';
  const paymentDateValue = !isSessionExpired ? paymentDate : 'N/A';

  const noActiveSessionMessage = !latestPayment || isSessionExpired
    ? "No active payments. Please make a payment to continue your sessions."
    : "Here's your current payment status and session details.";

  // Sort the payment history by endDate, showing the latest session first
  const sortedPaymentHistory = [...paymentInformation].sort((a, b) => new Date(b.endDate) - new Date(a.endDate));

  return (
    <Box sx={{ p: 3, backgroundColor: '#1e1e1e', color: '#ffffff', minHeight: '100vh', display: 'flex', justifyContent: 'center' }}>
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <StyledPaper>
          <Fade in={true} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h4" sx={{ mb: 1, fontWeight: 'bold', color: 'teal' }}>
                Payment Session Overview
              </Typography>
              <Typography variant="body1" sx={{ color: '#bbb' }}>
                {noActiveSessionMessage}
              </Typography>
            </Box>
          </Fade>

          {/* Balance and Session Info - Only show if session is not expired */}
          {!isSessionExpired && latestPayment && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2, gap: 2 }}>
              <InfoCard 
                icon={<AccountBalanceWalletIcon sx={{ fontSize: 30, color: 'teal' }} />} 
                label="Your Balance" 
                value={`R${balance}`} 
              />
              <InfoCard 
                icon={<EventNoteIcon sx={{ fontSize: 30, color: 'grey' }} />} 
                label="Session Type" 
                value={sessionTypeValue} 
              />
              <InfoCard 
                icon={paymentIcon} 
                label="Payment Status" 
                value={paymentStatus} 
              />
            </Box>
          )}

          {/* Session Period - Only show if session is not expired */}
          {!isSessionExpired && latestPayment && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, gap: 2 }}>
              <InfoCard 
                icon={<EventNoteIcon sx={{ fontSize: 30, color: 'teal' }} />} 
                label="Start Date" 
                value={startDateValue} 
              />
              <InfoCard 
                icon={<EventNoteIcon sx={{ fontSize: 30, color: 'maroon' }} />} 
                label="End Date" 
                value={endDateValue} 
              />
              <InfoCard 
                icon={<HistoryIcon sx={{ fontSize: 30, color: 'lightblue' }} />} 
                label="Payment Date" 
                value={paymentDateValue} 
              />
            </Box>
          )}

          {/* Payment History */}
          <Typography variant="h6" sx={{ color: 'teal', mb: 2 }}>
            <HistoryIcon sx={{ verticalAlign: 'middle', mr: 1 }} /> Payment History
          </Typography>
          <List>
            {sortedPaymentHistory.length > 0 ? (
              sortedPaymentHistory.map((payment, index) => (
                <Fade in={true} timeout={800} key={index}>
                  <ListItem>
                    <ListItemText
                      primary={`Amount Paid: R${payment.amountPaid}`}
                      secondary={`Payment Date: ${new Date(payment.datePaid).toLocaleDateString() || 'N/A'}`}
                      primaryTypographyProps={{ color: '#ffffff', fontWeight: 'bold' }}
                      secondaryTypographyProps={{ color: '#cccccc' }}
                    />
                  </ListItem>
                </Fade>
              ))
            ) : (
              <Typography sx={{ color: '#ccc' }}>No payment history available.</Typography>
            )}
          </List>
        </StyledPaper>
      </Slide>
    </Box>
  );
};

// Styled component for the information card
const InfoCard = ({ icon, label, value }) => (
  <Box
    sx={{
      backgroundColor: '#333',
      padding: '15px', // Reduced padding
      borderRadius: '12px',
      width: '30%',
      textAlign: 'center',
      boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
      transition: 'transform 0.3s ease',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    }}
  >
    {icon}
    <Typography variant="body1" sx={{ color: '#fff', mt: 1, fontSize: '1rem' }}>{label}</Typography> {/* Smaller font size */}
    <Typography variant="body2" sx={{ color: '#ccc', mt: 1 }}>{value}</Typography> {/* Reduced font size */}
  </Box>
);

const StyledPaper = styled(Paper)({
  padding: '30px',
  backgroundColor: '#2c2c2c',
  color: '#ffffff',
  borderRadius: '12px',
  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
  maxWidth: '900px',
  width: '100%',
});

export default PaymentSession;
