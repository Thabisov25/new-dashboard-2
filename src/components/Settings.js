import React, { useContext, useState, useEffect } from 'react';
import { Box, Grid, Typography, Paper, Button, Switch, FormControlLabel, Divider, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Notifications, CalendarToday, AccountCircle, Security, Payment } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { NotificationContext } from '../contexts/NotificationContext';  // Import the notification context

// Transition for notification popup
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Settings = () => {
  const navigate = useNavigate();
  const { pushEnabled, togglePushNotifications } = useContext(NotificationContext);  // Get push state and toggle function
  const [isBlocked, setIsBlocked] = useState(false);  // State to check if notifications are blocked
  const [isNotificationDialogOpen, setIsNotificationDialogOpen] = useState(false);  // Dialog state for blocked notifications
  const [isPushSupported, setIsPushSupported] = useState(true);  // State to check if browser supports notifications

  // On component mount, check for stored push notification preference and set it
  useEffect(() => {
    const storedPushEnabled = localStorage.getItem('pushEnabled');
    if (storedPushEnabled !== null) {
      togglePushNotifications(JSON.parse(storedPushEnabled));  // Set the stored preference
    }

    // Check if notifications are supported in the browser
    if (!('Notification' in window)) {
      setIsPushSupported(false);  // Notifications are not supported
      setIsNotificationDialogOpen(true);  // Open dialog to notify user
    }
  }, [togglePushNotifications]);

  // Check if notifications are blocked and handle toggle
  const handleTogglePushNotifications = (isEnabled) => {
    if (Notification.permission === 'denied') {
      setIsBlocked(true);  // If notifications are blocked, show guidance
      setIsNotificationDialogOpen(true);  // Open the notification dialog
    } else {
      togglePushNotifications(isEnabled);  // Enable or disable push notifications
      localStorage.setItem('pushEnabled', JSON.stringify(isEnabled));  // Persist the user's choice
    }
  };

  // Function to close the notification dialog
  const closeNotificationDialog = () => {
    setIsNotificationDialogOpen(false);
  };

  // Handlers for button actions
  const handleUpdatePersonalDetails = () => {
    navigate('/personal-details');
  };

  const handleUpdatePaymentDetails = () => {
    alert('Update Payment Details clicked');
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        ml: { xs: 0, md: '240px' },
        backgroundColor: '#2c2c2c',
        color: '#fff',
        minHeight: '100vh',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h4">Settings</Typography>
          </Box>
        </Grid>

        {/* Personal Details Button at the top of Account Management */}
        <Grid item xs={12}>
          <StyledPaper>
            <Button 
              variant="contained" 
              sx={{ mb: 2, backgroundColor: 'teal', color: '#fff' }} 
              onClick={handleUpdatePersonalDetails}
            >
              Personal Details
            </Button>
            <Box display="flex" alignItems="center">
              <AccountCircle sx={{ color: 'teal', marginRight: 2 }} />
              <Typography variant="h6">Account Management</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1">Manage your account settings.</Typography>
            <FormControlLabel
              control={<Switch color="primary" />}
              label="Link Google Account"
            />
            <FormControlLabel
              control={<Switch color="primary" />}
              label="Link Facebook Account"
            />
          </StyledPaper>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12}>
          <StyledPaper>
            <Box display="flex" alignItems="center">
              <Notifications sx={{ color: 'teal', marginRight: 2 }} />
              <Typography variant="h6">Notifications</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <FormControlLabel
              control={<Switch color="primary" checked={pushEnabled} onChange={(e) => handleTogglePushNotifications(e.target.checked)} />}
              label="Push Notifications"
            />
            <FormControlLabel
              control={<Switch color="primary" />}
              label="Email Notifications"
            />
          </StyledPaper>
        </Grid>

        {/* Calendar Integration */}
        <Grid item xs={12}>
          <StyledPaper>
            <Box display="flex" alignItems="center">
              <CalendarToday sx={{ color: 'teal', marginRight: 2 }} />
              <Typography variant="h6">Calendar Integration</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1">Sync your study schedule with Google Calendar.</Typography>
            <FormControlLabel
              control={<Switch color="primary" />}
              label="Sync with Google Calendar"
            />
          </StyledPaper>
        </Grid>

        {/* Privacy and Security */}
        <Grid item xs={12}>
          <StyledPaper>
            <Box display="flex" alignItems="center">
              <Security sx={{ color: 'teal', marginRight: 2 }} />
              <Typography variant="h6">Privacy and Security</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <FormControlLabel
              control={<Switch color="primary" />}
              label="Enable Two-Factor Authentication"
            />
          </StyledPaper>
        </Grid>

        {/* Payment Details */}
        <Grid item xs={12}>
          <StyledPaper>
            <Box display="flex" alignItems="center">
              <Payment sx={{ color: 'teal', marginRight: 2 }} />
              <Typography variant="h6">Payment Details</Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1">Manage your payment methods and billing information.</Typography>
            <Button 
              variant="contained" 
              sx={{ mt: 2, backgroundColor: 'teal', color: '#fff' }} 
              onClick={handleUpdatePaymentDetails}
            >
              Update Payment Details
            </Button>
          </StyledPaper>
        </Grid>
      </Grid>

      {/* Notification Blocked/Unsupported Dialog */}
      <Dialog
        open={isNotificationDialogOpen}
        onClose={closeNotificationDialog}
        TransitionComponent={Transition}
        keepMounted
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: '#2c2c2c',
            color: '#fff',
            borderRadius: '12px',  // Softer edges
            padding: '20px',
            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.4)',
          },
        }}
      >
        <DialogTitle
          sx={{
            color: 'teal',
            fontWeight: 'bold',
            fontSize: '1.5rem',
            textAlign: 'center',
          }}
        >
          {isPushSupported ? 'Notifications Disabled' : 'Notifications Not Supported'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              color: '#ccc',
              textAlign: 'center',
              fontSize: '1rem',
            }}
          >
            {isPushSupported
              ? 'Push notifications are currently disabled in your browser settings. To enable notifications, please go to your browser settings and allow notifications for this site.'
              : 'Push notifications are not supported by your browser. Please switch to a supported browser to use push notifications.'}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            onClick={closeNotificationDialog}
            sx={{
              backgroundColor: 'teal',
              color: '#fff',
              borderRadius: '25px',
              padding: '8px 20px',
              fontWeight: 'bold',
              '&:hover': {
                backgroundColor: '#008080',
              },
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

const StyledPaper = styled(Paper)({
  padding: '20px',
  marginBottom: '20px',
  backgroundColor: '#333',
  color: '#fff',
  borderRadius: '12px',  // Softer edges
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
});

export default Settings;
