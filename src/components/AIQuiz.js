import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, FormControl, MenuItem, Select, RadioGroup, FormControlLabel, Radio, List, ListItem, ListItemText, Paper, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import quizData from '../data/quizQuestions.json';
import { useStudent } from '../contexts/StudentContext'; // Import the custom hook

const logo = process.env.PUBLIC_URL + '/logo.png'; // Reference to the logo

const AIQuiz = () => {
  const { currentStudent } = useStudent(); // Get the current student from context
  const [student, setStudent] = useState(null); // State for student data
  const [error, setError] = useState(null); // State for error handling
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const [numQuestions, setNumQuestions] = useState(5);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [availableTopics, setAvailableTopics] = useState([]);
  const [quizHistory, setQuizHistory] = useState([]);
  const [showFirstQuizNotification, setShowFirstQuizNotification] = useState(false); // New state for first quiz notification
  const [showHistory, setShowHistory] = useState(true); // For hiding/showing history
  const [openPopup, setOpenPopup] = useState(false); // For showing popup
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null); // To store the selected quiz item

  useEffect(() => {
    const loadStudentData = async () => {
      if (currentStudent && currentStudent.id) {
        try {
          const data = await import(`../data/students/${currentStudent.id}.js`);
          setStudent(data.default);
          
          // Load quiz history from localStorage
          const storedHistory = JSON.parse(localStorage.getItem('quizHistory')) || [];
          setQuizHistory(storedHistory);

          // Show notification if no quiz history exists (first quiz)
          if (storedHistory.length === 0) {
            setShowFirstQuizNotification(true);
          }
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

  const studentGrade = student ? `Grade ${student.personalDetails.grade}` : '';

  useEffect(() => {
    if (studentGrade) {
      const subjects = Object.keys(quizData).filter(subject => 
        quizData[subject][studentGrade] !== undefined
      );
      setAvailableSubjects(subjects);
    }
  }, [studentGrade]);

  useEffect(() => {
    if (selectedSubject && studentGrade) {
      const topics = Object.keys(quizData[selectedSubject][studentGrade]);
      setAvailableTopics(topics);
    }
  }, [selectedSubject, studentGrade]);

  const handleStartQuiz = () => {
    const selectedQuestions = quizData[selectedSubject][studentGrade][selectedTopic];
    const shuffledQuestions = selectedQuestions.sort(() => 0.5 - Math.random()).slice(0, numQuestions);
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setShowResult(false);
    setScore(0);
    setSelectedAnswer('');
    setShowFirstQuizNotification(false); // Hide notification after starting the quiz
	setShowHistory(false); // Hide quiz history when quiz starts
  };

  const handleAnswerChange = (event) => {
    setSelectedAnswer(event.target.value);
  };

  const handleNextQuestion = () => {
    if (selectedAnswer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }
    setSelectedAnswer('');
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
      saveQuizHistory();
	  setShowHistory(true); // Show quiz history when quiz is finished
    }
  };

  const saveQuizHistory = () => {
    const feedback = getFeedback(score, questions.length);
    const newHistory = {
      date: new Date().toISOString().split('T')[0],
      subject: selectedSubject,
      topic: selectedTopic,
      numQuestions: questions.length,
      score: score,
      feedback: feedback
    };

    // Save quiz history to localStorage
    const updatedHistory = [newHistory, ...quizHistory]; // latest first
    setQuizHistory(updatedHistory);
    localStorage.setItem('quizHistory', JSON.stringify(updatedHistory));
  };

  const getFeedback = (score, total) => {
    const percentage = (score / total) * 100;
    if (percentage === 100) {
      return "Outstanding! You got everything correct!";
    } else if (percentage >= 80) {
      return "Great job! You're doing really well!";
    } else if (percentage >= 50) {
      return "Good effort! Keep practicing!";
    } else {
      return "Don't worry, keep trying and you'll improve!";
    }
  };

  const handleRestartQuiz = () => {
    setQuestions([]);
    setSelectedSubject('');
    setSelectedTopic('');
    setNumQuestions(5);
    setShowResult(false);
  };

  const handleClickHistoryItem = (historyItem) => {
    setSelectedHistoryItem(historyItem);
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setSelectedHistoryItem(null);
  };

  if (error) {
    return <Typography sx={{ color: 'red', textAlign: 'center', marginTop: '20px' }}>{error}</Typography>;
  }

  if (!student) {
    return <Typography sx={{ color: '#ffffff', textAlign: 'center', marginTop: '20px' }}>Loading...</Typography>;
  }

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
        filter: 'blur(0px)',
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
          zIndex: -1,
        }}
      />
      <Typography variant="h4" gutterBottom sx={{ color: 'teal' }}>
        Quiz for {student.personalDetails.name}
      </Typography>

      {showFirstQuizNotification && (
        <Typography sx={{ color: 'orange', mb: 2 }}>
          Your quiz history will only be saved on this device. You will not be able to access it from other devices.
        </Typography>
      )}

      {!questions.length && !showResult && (
        <>
          <FormControl sx={{ mb: 2, minWidth: 120 }}>
            <Select 
              value={selectedSubject} 
              onChange={(e) => setSelectedSubject(e.target.value)} 
              displayEmpty
              sx={{ color: 'white', borderColor: 'teal' }}
            >
              <MenuItem value="" disabled>Select Subject</MenuItem>
              {availableSubjects.map((subject) => (
                <MenuItem key={subject} value={subject} sx={{ color: 'teal' }}>{subject}</MenuItem>
              ))}
            </Select>
          </FormControl>

          {selectedSubject && (
            <FormControl sx={{ mb: 2, minWidth: 120 }}>
              <Select 
                value={selectedTopic} 
                onChange={(e) => setSelectedTopic(e.target.value)} 
                displayEmpty
                sx={{ color: 'white', borderColor: 'teal' }}
              >
                <MenuItem value="" disabled>Select Topic</MenuItem>
                {availableTopics.map((topic) => (
                  <MenuItem key={topic} value={topic} sx={{ color: 'teal' }}>{topic}</MenuItem>
                ))}
              </Select>
            </FormControl>
          )}

          <FormControl sx={{ mb: 2, minWidth: 120 }}>
            <Select 
              value={numQuestions} 
              onChange={(e) => setNumQuestions(e.target.value)}
              sx={{ color: 'white', borderColor: 'teal' }}
            >
              <MenuItem value={5}>5 Questions</MenuItem>
              <MenuItem value={10}>10 Questions</MenuItem>
            </Select>
          </FormControl>

          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleStartQuiz} 
            disabled={!selectedTopic}
            sx={{ color: 'white', backgroundColor: 'teal', '&:hover': { backgroundColor: '#008080' } }}
          >
            Start Quiz
          </Button>
        </>
      )}

      {questions.length > 0 && !showResult && (
        <>
          <Typography variant="h6" gutterBottom sx={{ color: 'teal' }}>
            {questions[currentQuestionIndex].question}
          </Typography>
          <FormControl component="fieldset">
            <RadioGroup value={selectedAnswer} onChange={handleAnswerChange}>
            {questions[currentQuestionIndex].options.map((option, index) => (
                <FormControlLabel
                  key={index}
                  value={option}
                  control={<Radio sx={{ color: 'teal' }} />}
                  label={option}
                  sx={{ color: 'teal' }}
                />
              ))}
            </RadioGroup>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
            sx={{ mt: 2, color: 'white', backgroundColor: 'teal', '&:hover': { backgroundColor: '#008080' } }}
          >
            {currentQuestionIndex < questions.length - 1 ? 'Next' : 'Finish'}
          </Button>
        </>
      )}

      {showResult && (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
            Quiz Completed!
          </Typography>
          <Typography variant="h6" sx={{ color: 'white' }}>
            Your Score: {score} / {questions.length}
          </Typography>
          <Typography variant="body1" sx={{ mt: 1, color: 'teal' }}>
            {getFeedback(score, questions.length)}
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleRestartQuiz} 
            sx={{ mt: 2, color: 'white', backgroundColor: 'teal', '&:hover': { backgroundColor: '#008080' } }}
          >
            Restart Quiz
          </Button>
        </Box>
      )}

      {quizHistory.length > 0 && showHistory && ( // Only show if not taking a quiz
        <Box sx={{ mt: 4, width: '100%', maxWidth: 600 }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'teal' }}>
            Quiz History
          </Typography>
          <List>
            {quizHistory.map((history, index) => (
              <Paper key={index} sx={{ mb: 2, p: 2, backgroundColor: '#2c2c2c', border: '1px solid teal' }}>
                <ListItem button onClick={() => handleClickHistoryItem(history)}>
                  <ListItemText 
                    primary={<Typography variant="body1" sx={{ color: 'white' }}>Subject: {history.subject}</Typography>}
                    secondary={
                      <>
                        <Typography variant="body2" sx={{ color: 'white' }}>Topic: {history.topic}</Typography>
                        <Typography variant="body2" sx={{ color: 'white' }}>Score: {history.score}/{history.numQuestions}</Typography>
                        <Typography variant="body2" sx={{ color: 'white' }}>{history.feedback}</Typography>
                      </>
                    }
                  />
                </ListItem>
              </Paper>
            ))}
          </List>
        </Box>
      )}

      {/* Popup Dialog for quiz details */}
      <Dialog open={openPopup} onClose={handleClosePopup}>
        <DialogTitle>Quiz Details</DialogTitle>
        <DialogContent>
          {selectedHistoryItem && (
            <>
              <DialogContentText>Subject: {selectedHistoryItem.subject}</DialogContentText>
              <DialogContentText>Topic: {selectedHistoryItem.topic}</DialogContentText>
              <DialogContentText>Score: {selectedHistoryItem.score}/{selectedHistoryItem.numQuestions}</DialogContentText>
              <DialogContentText>Feedback: {selectedHistoryItem.feedback}</DialogContentText>
              {/* Display additional details here if necessary */}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePopup} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AIQuiz;
