import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useStudent } from '../contexts/StudentContext'; // Import the custom hook

const UpcomingSessions = () => {
  const { currentStudent } = useStudent(); // Get the current student from context
  const [student, setStudent] = useState(null);
  const [error, setError] = useState(null);
  const [upcomingSessions, setUpcomingSessions] = useState([]);

  useEffect(() => {
    const loadStudentData = async () => {
      if (currentStudent && currentStudent.id) {
        try {
          const data = await import(`../data/students/${currentStudent.id}.js`);
          setStudent(data.default);

          // Filter upcoming sessions
          const upcoming = data.default.comingSessions.filter(
            (session) => new Date(`${session.date}T${session.time || '00:00:00'}`) > new Date()
          );
          setUpcomingSessions(upcoming);

          // Schedule session reminders 2 hours before the session
          scheduleSessionReminders(upcoming);
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

  // Function to schedule reminders for upcoming sessions
  const scheduleSessionReminders = (sessions) => {
    sessions.forEach((session) => {
      const sessionDateTime = new Date(`${session.date}T${session.time || '00:00:00'}`); // Full date & time of session
      const now = new Date();

      // Calculate time for reminder (2 hours before the session)
      const twoHoursBefore = sessionDateTime.getTime() - 2 * 60 * 60 * 1000; // 2 hours in milliseconds
      const timeUntilReminder = twoHoursBefore - now.getTime();

      if (timeUntilReminder > 0) {
        setTimeout(() => {
          sendNotification(session.subject, session.date, session.time);
        }, timeUntilReminder);
      }
    });
  };

  // Function to send notification
  const sendNotification = (subject, sessionDate, sessionTime) => {
    const timeText = sessionTime ? `at ${sessionTime.slice(0, 5)}` : ''; // Format time as HH:mm
    if (Notification.permission === 'granted') {
      const options = {
        body: `You have an upcoming session for ${subject} in 2 hours ${timeText}.`,
        icon: '/logo192.png', // Your app's logo
      };
      new Notification('Upcoming Session Reminder', options);
    } else if (Notification.permission === 'default') {
      // If permission has not been requested yet, request it
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          sendNotification(subject, sessionDate, sessionTime);
        }
      });
    } else {
      console.log('Push notifications are disabled.');
    }
  };

  // Show error if there's an issue loading the student data
  if (error) {
    return <Typography sx={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</Typography>;
  }

  // If data is still loading, show "Loading..."
  if (!student) {
    return <Typography sx={{ color: '#ffffff', textAlign: 'center', marginTop: '20px' }}>Loading...</Typography>;
  }

  const totalSessions = student.comingSessions.length;
  const sessionsLeft = upcomingSessions.length;

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        ml: { xs: 0, md: '240px' }, // Add margin-left on larger screens to account for sidebar
        backgroundColor: '#2c2c2c',
        color: '#fff',
        minHeight: '100vh',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ fontSize: '1.8rem', textAlign: 'center', fontWeight: 'bold' }}> {/* Reduced from h1 to h5 */ }
            Upcoming Sessions
          </Typography>
        </Grid>

        {/* Summary Box */ }
        <Grid item xs={12} md={6}>
          <SummaryPaper>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'teal' }}>Sessions Overview</Typography>
            <Typography variant="body2" sx={{ fontSize: '1rem' }}> {/* Reduced from body1 to body2 */ }
              Total Sessions: {totalSessions}
            </Typography>
            <Typography variant="body2" sx={{ fontSize: '1rem' }}> {/* Reduced from body1 to body2 */ }
              Sessions Left: {sessionsLeft}
            </Typography>
          </SummaryPaper>
        </Grid>

        {/* Upcoming Sessions List */ }
        <Grid item xs={12} md={6}>
          <SessionListPaper>
            <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'teal' }}>Upcoming Sessions</Typography>
            {upcomingSessions.length > 0 ? (
              <List>
                {upcomingSessions.map((session) => (
                  <React.Fragment key={session.id}>
                    <ListItem>
                      <ListItemText
                        primary={session.subject}
                        secondary={
                          <>
                            <Typography variant="body2" sx={{ color: '#ccc' }}>
                              Date: {new Date(session.date).toLocaleDateString()}
                            </Typography>
                            {session.time && (
                              <Typography variant="body2" sx={{ color: '#ccc' }}>
                                Time: {session.time.slice(0, 5)} {/* Show HH:mm format */}
                              </Typography>
                            )}
                          </>
                        }
                        primaryTypographyProps={{ style: { color: '#fff', fontSize: '1rem', fontWeight: 'bold' } }} // Reduced font size
                        secondaryTypographyProps={{ style: { color: '#ccc', fontSize: '0.9rem' } }} // Reduced font size
                      />
                    </ListItem>
                    <Divider sx={{ backgroundColor: '#555' }} />
                  </React.Fragment>
                ))}
              </List>
            ) : (
              <Typography sx={{ color: '#ccc' }}>No upcoming sessions available.</Typography>
            )}
          </SessionListPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

const SummaryPaper = styled(Paper)({
  padding: '20px',
  backgroundColor: '#333',
  color: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  textAlign: 'center',
});

const SessionListPaper = styled(Paper)({
  padding: '20px',
  backgroundColor: '#333',
  color: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
});

export default UpcomingSessions;
