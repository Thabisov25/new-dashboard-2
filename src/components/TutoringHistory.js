import React, { useState } from 'react';
import { Box, Grid, Typography, Paper, ListItem, ListItemText, Divider, TextField, InputAdornment, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';
import CommentIcon from '@mui/icons-material/Comment';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

const TutoringHistory = () => {
  // Dummy data for session feedback
  const [sessions] = useState([
    { id: 1, date: '2024-09-01', subject: 'Mathematics', topic: 'Algebra', feedback: 'Good', comments: 'Solid understanding of algebraic equations, but needs more practice on solving word problems.', improvements: 'Focus on word problem strategies.', moreTimeNeeded: false },
    { id: 2, date: '2024-09-03', subject: 'Biology', topic: 'Cell Structure', feedback: 'Average', comments: 'Understands basic cell structures but struggles with functions of organelles.', improvements: 'Review organelle functions and complete related exercises.', moreTimeNeeded: true },
    { id: 3, date: '2024-09-05', subject: 'Chemistry', topic: 'Periodic Table', feedback: 'Needs Improvement', comments: 'Needs to memorize the element groups.', improvements: 'Focus on element groups and periods.', moreTimeNeeded: true },
    { id: 4, date: '2024-09-07', subject: 'Physics', topic: 'Newton\'s Laws', feedback: 'Good', comments: 'Great understanding of the concepts but should solve more problems.', improvements: 'Practice more on application of Newton’s Laws.', moreTimeNeeded: false },
    { id: 5, date: '2024-09-09', subject: 'English', topic: 'Essay Writing', feedback: 'Average', comments: 'Writing skills are good, but needs to work on grammar.', improvements: 'Revise grammar rules and practice writing.', moreTimeNeeded: true },
    { id: 6, date: '2024-09-11', subject: 'Geography', topic: 'Weathering', feedback: 'Good', comments: 'Good grasp on the topic but needs more examples.', improvements: 'Study different types of weathering in detail.', moreTimeNeeded: false },
    { id: 7, date: '2024-09-13', subject: 'History', topic: 'World War II', feedback: 'Needs Improvement', comments: 'Needs to remember key dates and events.', improvements: 'Create a timeline of events to help memorize.', moreTimeNeeded: true },
    { id: 8, date: '2024-09-15', subject: 'Mathematics', topic: 'Geometry', feedback: 'Average', comments: 'Knows the basics but needs to work on proofs.', improvements: 'Practice geometry proofs and theorems.', moreTimeNeeded: true },
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  // Filter sessions based on search term
  const filteredSessions = sessions.filter(session =>
    session.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    session.date.includes(searchTerm) ||
    session.feedback.toLowerCase().includes(searchTerm)
  );

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        ml: { xs: 0, md: '240px' }, // Add margin-left on larger screens to make space for the sidebar
        backgroundColor: '#2c2c2c',
        color: '#fff',
        minHeight: '100vh',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h5" sx={{ fontSize: '2rem', fontWeight: 'bold' }}>Tutoring History</Typography>
            <TextField
              variant="outlined"
              placeholder="Search sessions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon style={{ color: '#fff' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ input: { color: '#fff' }, backgroundColor: '#444', borderRadius: 1 }}
            />
          </Box>
        </Grid>

        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="body1" sx={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
              Here you can see the history of your tutoring sessions.
            </Typography>

            {/* Detailed display for the first two sessions */}
            {filteredSessions.slice(0, 2).map((session) => (
              <React.Fragment key={session.id}>
                <ListItem>
                  <ListItemText
                    primary={`${session.subject} - ${session.topic}`}
                    secondary={`Date: ${session.date}`}
                    primaryTypographyProps={{ style: { color: '#fff', fontSize: '1.1rem', fontWeight: 'bold' } }}
                    secondaryTypographyProps={{ style: { color: '#ccc' } }}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center">
                        {session.feedback === 'Good' && <ThumbUpIcon sx={{ color: 'teal', marginRight: 1 }} />}
                        {session.feedback === 'Average' && <ThumbsUpDownIcon sx={{ color: 'teal', marginRight: 1 }} />}
                        {session.feedback === 'Needs Improvement' && <ThumbDownIcon sx={{ color: 'teal', marginRight: 1 }} />}
                        Feedback: {session.feedback}
                      </Box>
                    }
                    secondary={
                      <>
                        <Box display="flex" alignItems="center">
                          <CommentIcon sx={{ color: 'teal', marginRight: 1 }} />
                          <Typography variant="body2" sx={{ color: '#fff' }}>
                            Comments: {session.comments || 'No comments provided.'}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                          <LightbulbIcon sx={{ color: 'teal', marginRight: 1 }} />
                          <Typography variant="body2" sx={{ color: '#fff' }}>
                            Improvements: {session.improvements}
                          </Typography>
                        </Box>
                        {session.moreTimeNeeded && (
                          <Typography variant="body2" color="error">
                            More time needed on this topic.
                          </Typography>
                        )}
                      </>
                    }
                  />
                </ListItem>
                <Divider sx={{ backgroundColor: '#555' }} />
              </React.Fragment>
            ))}

            {/* List format with expandable details for the remaining sessions */}
            {filteredSessions.slice(2).map((session) => (
              <Accordion key={session.id} sx={{ backgroundColor: '#333', color: '#fff', boxShadow: 'none' }}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon sx={{ color: 'teal' }} />}
                  aria-controls={`panel${session.id}-content`}
                  id={`panel${session.id}-header`}
                >
                  <Typography sx={{ width: '33%', flexShrink: 0, color: '#fff', fontSize: '1rem' }}>
                    Session #{session.id}
                  </Typography>
                  <Typography sx={{ color: '#ccc' }}>{session.date} - {session.subject}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <ListItemText
                    primary={
                      <Box display="flex" alignItems="center">
                        {session.feedback === 'Good' && <ThumbUpIcon sx={{ color: 'teal', marginRight: 1 }} />}
                        {session.feedback === 'Average' && <ThumbsUpDownIcon sx={{ color: 'teal', marginRight: 1 }} />}
                        {session.feedback === 'Needs Improvement' && <ThumbDownIcon sx={{ color: 'teal', marginRight: 1 }} />}
                        Feedback: {session.feedback}
                      </Box>
                    }
                    secondary={
                      <>
                        <Box display="flex" alignItems="center">
                          <CommentIcon sx={{ color: 'teal', marginRight: 1 }} />
                          <Typography variant="body2" sx={{ color: '#fff' }}>
                            Comments: {session.comments || 'No comments provided.'}
                          </Typography>
                        </Box>
                        <Box display="flex" alignItems="center">
                          <LightbulbIcon sx={{ color: 'teal', marginRight: 1 }} />
                          <Typography variant="body2" sx={{ color: '#fff' }}>
                            Improvements: {session.improvements}
                          </Typography>
                        </Box>
                        {session.moreTimeNeeded && (
                          <Typography variant="body2" color="error">
                            More time needed on this topic.
                          </Typography>
                        )}
                      </>
                    }
                  />
                </AccordionDetails>
              </Accordion>
            ))}
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

const StyledPaper = styled(Paper)({
  padding: '20px',
  marginBottom: '20px',
  backgroundColor: '#333',
  color: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
});

export default TutoringHistory;
