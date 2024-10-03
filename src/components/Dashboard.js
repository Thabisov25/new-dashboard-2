import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Badge,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import EventIcon from '@mui/icons-material/Event';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import SchoolIcon from '@mui/icons-material/School';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useStudent } from '../contexts/StudentContext';
import { Fade, Slide } from '@mui/material';
import { NotificationContext } from '../contexts/NotificationContext';

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentStudent } = useStudent(); // Use context to get the current student
  const { sendNotification } = React.useContext(NotificationContext); // Use notification context
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null); // Track if there's an error loading student data
  const [alerts, setAlerts] = useState(() => {
    // Load stored alerts from localStorage when the component mounts
    const storedAlerts = localStorage.getItem('alerts');
    return storedAlerts ? JSON.parse(storedAlerts) : [];
  });

  useEffect(() => {
    // Load student data dynamically based on the current student's ID
    const loadStudentData = async () => {
      if (currentStudent && currentStudent.id) {
        try {
          console.log(`Loading student data for: ${currentStudent.id}`);
          const data = await import(`../data/students/${currentStudent.id}.js`); // Dynamically import student file
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

  useEffect(() => {
    if (student) {
      handleReminders(); // Schedule reminders only when student data is available
    }
  }, [student]);

  // Reminder handling logic, including quiz reminders 2 hours 30 minutes after session start
  const handleReminders = () => {
    const { tutoringHistory = [] } = student;
    const currentDate = new Date();

    // Filter upcoming sessions
    const upcomingSessions = tutoringHistory.filter((session) => new Date(session.date) > currentDate);

    // 1. Sessions ending soon (remind 25% before)
    upcomingSessions.forEach((session) => {
      const sessionDateTime = new Date(`${session.date}T${session.time || '00:00:00'}`);
      const sessionDuration = 2 * 60 * 60 * 1000; // Assume 2-hour session in milliseconds

      // Calculate when the session will end
      const sessionEndTime = sessionDateTime.getTime() + sessionDuration;

      // Calculate time for sending the quiz reminder 2 hours 30 minutes after session start time
      const quizReminderTime = sessionDateTime.getTime() + (2 * 60 * 60 * 1000) + (30 * 60 * 1000); // 2 hours + 30 minutes

      // Schedule quiz reminder 2 hours 30 minutes after session start
      const timeUntilQuizReminder = quizReminderTime - currentDate.getTime();
      if (timeUntilQuizReminder > 0) {
        setTimeout(() => {
          sendNotification('Quiz Reminder', `Please don't forget to take your quiz for the topic: ${session.topic}.`);
          addAlert('Quiz Reminder', `Please don't forget to take your quiz for the topic: ${session.topic}.`);
        }, timeUntilQuizReminder);
      }
    });

    // 2. Notify when the last session of the month happens
    const lastSessionOfMonth = tutoringHistory.reduce((lastSession, session) => {
      const sessionDate = new Date(session.date);
      return sessionDate.getMonth() === currentDate.getMonth() && sessionDate > lastSession ? sessionDate : lastSession;
    }, new Date(0));

    if (lastSessionOfMonth > new Date(0)) {
      const timeUntilLastSession = lastSessionOfMonth - currentDate;
      if (timeUntilLastSession > 0) {
        setTimeout(() => {
          sendNotification('Last Session of the Month', `Your last session this month is on ${lastSessionOfMonth.toLocaleDateString()}.`);
          addAlert('Last Session of the Month', `Your last session this month is on ${lastSessionOfMonth.toLocaleDateString()}.`);
        }, timeUntilLastSession);
      }
    }

    // 3. Notify when a new session for the month begins
    const firstSessionOfMonth = tutoringHistory.reduce((firstSession, session) => {
      const sessionDate = new Date(session.date);
      return sessionDate.getMonth() === currentDate.getMonth() && sessionDate < firstSession ? sessionDate : firstSession;
    }, new Date(9999, 11, 31));

    if (firstSessionOfMonth < new Date(9999, 11, 31)) {
      const timeUntilFirstSession = firstSessionOfMonth - currentDate;
      if (timeUntilFirstSession > 0) {
        setTimeout(() => {
          sendNotification('New Session Starting', `Your first session this month starts on ${firstSessionOfMonth.toLocaleDateString()}.`);
          addAlert('New Session Starting', `Your first session this month starts on ${firstSessionOfMonth.toLocaleDateString()}.`);
        }, timeUntilFirstSession);
      }
    }

    // 4. Remind students to take quizzes (default 5-minute reminder after login)
    setTimeout(() => {
      sendNotification('Quiz Reminder', 'Don’t forget to take your quizzes to sharpen your mind!');
      addAlert('Quiz Reminder', 'Don’t forget to take your quizzes to sharpen your mind!');
    }, 5 * 60 * 1000); // Remind after 5 minutes
  };

  // Helper function to add an alert to the alerts state and localStorage
  const addAlert = (title, body) => {
    const newAlert = { title, body };
    setAlerts((prevAlerts) => {
      const updatedAlerts = [...prevAlerts, newAlert];
      localStorage.setItem('alerts', JSON.stringify(updatedAlerts)); // Persist to localStorage
      return updatedAlerts;
    });
  };

  // Show an error message if there's a problem loading the student data
  if (error) {
    return <Typography sx={{ color: '#ffffff', textAlign: 'center', marginTop: '20px' }}>{error}</Typography>;
  }

  // If student data is still loading, show a fun and modern loader
  if (!student) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: '#2c2c2c',
          color: '#fff',
        }}
      >
        Loading...
      </Box>
    );
  }

  // Deconstruct data from the student object
  const { personalDetails, paymentInformation = [], tutoringHistory = [], quizHistory = [] } = student;

  // Extract the first letter of the student's name
  const firstLetter = personalDetails?.name?.charAt(0).toUpperCase() || 'S';

  // Get the latest payment session information
  const latestPayment = paymentInformation.length > 0 ? paymentInformation[paymentInformation.length - 1] : null;
  const endDate = latestPayment ? new Date(latestPayment.endDate) : null;

  const hasActiveSession = latestPayment && endDate && endDate > new Date();

  const balance = hasActiveSession ? latestPayment.amountPaid : '00';
  const sessionType = hasActiveSession ? latestPayment.sessionType : 'No active session';
  const startDate = hasActiveSession ? new Date(latestPayment.startDate).toLocaleDateString() : 'N/A';
  const endDateDisplay = hasActiveSession ? new Date(latestPayment.endDate).toLocaleDateString() : 'N/A';

  const noActiveSessionMessage = !hasActiveSession
    ? 'No active payments. Please make a payment to continue your sessions.'
    : '';

  const totalCorrect = quizHistory.reduce((acc, quiz) => acc + quiz.score, 0);
  const totalQuestions = quizHistory.reduce((acc, quiz) => acc + quiz.numQuestions, 0);
  const totalPercentage = totalQuestions > 0 ? ((totalCorrect / totalQuestions) * 100).toFixed(2) : 'N/A';

  const upcomingSessions = tutoringHistory
    .filter((session) => new Date(session.date) > new Date())
    .slice(0, 4);

  const handleQuizzesClick = () => {
    navigate('/ai-quiz');
  };
  const handleStudentProfileClick = () => {
    navigate('/student-profile');
  };

  const handleFlashcardsClick = () => {
    navigate('/flashcards');
  };

  const handlePaymentSessionClick = () => {
    navigate('/payment-session');
  };

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        ml: { xs: 0, md: '240px' }, // Add margin-left on larger screens to make space for the sidebar
        backgroundColor: '#2c2c2c',
        color: '#ffffff',
        minHeight: '100vh',
      }}
    >
      <Grid container spacing={2}>
        {/* Welcome Message */}
        <Grid item xs={12}>
          <Fade in={true} timeout={1000}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" sx={{ color: '#ffffff' }}>
                {personalDetails?.name ? `Hello, ${personalDetails.name}!` : 'Hello, Student!'}
              </Typography>
              <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <IconButton color="primary">
                  <Badge
                    badgeContent={alerts.length}
                    color="error"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                    }}
                  >
                    <NotificationsIcon sx={{ color: 'teal' }} />
                  </Badge>
                </IconButton>
                <IconButton onClick={handleStudentProfileClick}>
                  <Avatar sx={{ cursor: 'pointer', backgroundColor: 'teal', color: '#fff', width: 48, height: 48 }}>
                    {firstLetter}
                  </Avatar>
                </IconButton>
              </Box>
            </Box>
          </Fade>
        </Grid>

        {/* Balance and Session Details */}
        <Grid item xs={12}>
          <Slide direction="up" in={true} timeout={1000}>
            <StyledPaper>
              <Typography
                variant="body1"
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  color: '#ffffff',
                  '&:hover': { color: 'teal', cursor: 'pointer' },
                }}
                onClick={handlePaymentSessionClick}
              >
                <AccountBalanceWalletIcon sx={{ mr: 1, color: hasActiveSession ? 'teal' : 'darkgray' }} />
                Your Balance: {balance !== 'N/A' ? `R${balance}` : '00'}
              </Typography>
              <Typography variant="body2" sx={{ color: '#ffffff', mt: 1 }}>
                Session Type: {sessionType}
              </Typography>
              <Typography variant="body2" sx={{ color: '#ffffff' }}>
                Start Date: {startDate}
              </Typography>
              <Typography variant="body2" sx={{ color: '#ffffff' }}>
                End Date: {endDateDisplay}
              </Typography>
              {!hasActiveSession && (
                <Typography variant="body2" sx={{ color: 'red', mt: 1 }}>
                  {noActiveSessionMessage}
                </Typography>
              )}
            </StyledPaper>
          </Slide>
        </Grid>

        {/* Active Progress Section */}
        <Grid item xs={12} md={6}>
          <Slide direction="left" in={true} timeout={800}>
            <StyledPaper>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
                <FlashOnIcon sx={{ mr: 1, color: 'teal' }} /> Active Progress
              </Typography>
              <List>
                <ListItem onClick={handleFlashcardsClick} sx={{ cursor: 'pointer' }}>
                  <ListItemIcon>
                    <FlashOnIcon sx={{ color: 'teal' }} />
                  </ListItemIcon>
                  <ListItemText primary="Flashcards: 0% Completed" primaryTypographyProps={{ color: '#ffffff' }} />
                </ListItem>
                <ListItem onClick={handleQuizzesClick} sx={{ cursor: 'pointer' }}>
                  <ListItemIcon>
                    <SchoolIcon sx={{ color: 'teal' }} />
                  </ListItemIcon>
                  <ListItemText primary={`Quizzes: ${totalPercentage}% Total Pass Rate`} primaryTypographyProps={{ color: '#ffffff' }} />
                </ListItem>
              </List>
            </StyledPaper>
          </Slide>
        </Grid>

        {/* Upcoming Sessions Section */}
        <Grid item xs={12} md={6}>
          <Slide direction="right" in={true} timeout={800}>
            <StyledPaper>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
                <EventIcon sx={{ mr: 1, color: 'teal' }} /> Upcoming Sessions
              </Typography>
              <List>
                {upcomingSessions.length > 0 ? (
                  upcomingSessions.map((session, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={`${session.subject} - ${session.topic}`}
                        secondary={`Date: ${new Date(session.date).toLocaleDateString()}`}
                        primaryTypographyProps={{ color: '#ffffff', fontSize: '0.9rem' }}
                        secondaryTypographyProps={{ color: '#ffffff', fontSize: '0.8rem' }}
                      />
                    </ListItem>
                  ))
                ) : (
                  <Typography sx={{ color: '#ffffff' }}>No upcoming sessions.</Typography>
                )}
              </List>
            </StyledPaper>
          </Slide>
        </Grid>

        {/* Messaging Section */}
        <Grid item xs={12}>
          <Slide direction="up" in={true} timeout={1000}>
            <StyledPaper>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
                <ChatBubbleOutlineIcon sx={{ mr: 1, color: 'teal' }} /> Messages
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="John Doe"
                    secondary="Hi, can you help me with my assignment?"
                    primaryTypographyProps={{ color: '#ffffff', fontSize: '0.9rem' }}
                    secondaryTypographyProps={{ color: '#ffffff', fontSize: '0.8rem' }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Tutor Anna"
                    secondary="Don't forget your session tomorrow at 10 AM!"
                    primaryTypographyProps={{ color: '#ffffff', fontSize: '0.9rem' }}
                    secondaryTypographyProps={{ color: '#ffffff', fontSize: '0.8rem' }}
                  />
                </ListItem>
              </List>
            </StyledPaper>
          </Slide>
        </Grid>

        {/* Additional Section: Alerts or Reminders */}
        <Grid item xs={12}>
          <Slide direction="up" in={true} timeout={1000}>
            <StyledPaper>
              <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
                <NotificationsIcon sx={{ mr: 1, color: 'teal' }} /> Alerts & Reminders
              </Typography>
              <List>
                {alerts.length > 0 ? (
                  alerts.map((alert, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={alert.title}
                        secondary={alert.body}
                        primaryTypographyProps={{ color: '#ffffff', fontSize: '0.9rem' }}
                      />
                    </ListItem>
                  ))
                ) : (
                  <Typography sx={{ color: '#ffffff' }}>No alerts at the moment.</Typography>
                )}
              </List>
            </StyledPaper>
          </Slide>
        </Grid>
      </Grid>
    </Box>
  );
};

// Styled components and Loader definition
const StyledPaper = styled(Paper)({
  padding: '20px',
  marginBottom: '20px',
  backgroundColor: '#333',
  color: '#ffffff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
});

export default Dashboard;
