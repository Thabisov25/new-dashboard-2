// src/components/Flashcards.js
import React, { useState } from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';

const logo = process.env.PUBLIC_URL + '/logo.png'; // Reference to the logo

const flashcardsData = [
  { question: 'What is the capital of South Africa?', answer: 'Pretoria' },
  { question: 'What is the chemical symbol for water?', answer: 'H2O' },
  { question: 'Who discovered gravity?', answer: 'Isaac Newton' },
];

const Flashcards = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNextCard = () => {
    setIsFlipped(false); // Reset flip state when going to the next card
    setCurrentIndex((prevIndex) => (prevIndex + 1) % flashcardsData.length);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped); // Flip between question and answer
  };

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
        gap: 3, // Adds spacing between components
        backgroundColor: '#2c2c2c', // Dark overlay color
        backgroundImage: `url(${logo})`, // Your logo as background
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
        backgroundAttachment: 'fixed',
        filter: 'blur(0px)', // Apply blur to the logo
        position: 'relative', // For content overlay
      }}
    >
      <Box
        sx={{
          position: 'absolute', // Overlay for the flashcard content
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(44, 44, 44, 0.8)', // Dark overlay with transparency
          zIndex: -1, // Keep this behind the flashcard content
        }}
      />
      <Typography
        variant="h4"
        sx={{
          color: 'teal',
          fontWeight: 'bold',
          letterSpacing: '2px',
          fontSize: '1.5rem', // Reduced font size for the title
        }}
        gutterBottom
      >
        Flashcards
      </Typography>

      <Card
        sx={{
          minWidth: 300,
          maxWidth: 500,
          backgroundColor: '#1c1c1c', // Dark grey card background
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)', // Adds modern shadow
          transition: 'transform 0.4s ease', // Smooth flip animation
          '&:hover': {
            transform: 'scale(1.05)', // Slight zoom on hover for a sleek effect
          },
        }}
      >
        <CardContent
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '200px',
            color: '#fff', // White text for contrast
            textAlign: 'center',
            fontSize: '1rem', // Reduced font size for card content
          }}
        >
          <Typography variant="h6" sx={{ fontSize: '1.2rem', fontWeight: '500' }}>
            {isFlipped
              ? flashcardsData[currentIndex].answer
              : flashcardsData[currentIndex].question}
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: 'teal',
            color: '#fff',
            fontWeight: 'bold',
            padding: '8px 16px', // Adjusted padding to match smaller font
            borderRadius: '25px',
            fontSize: '0.9rem', // Reduced font size for button text
            textTransform: 'none',
            '&:hover': {
              backgroundColor: '#008080', // Slightly darker teal on hover
            },
          }}
          onClick={handleFlip}
        >
          {isFlipped ? 'Show Question' : 'Show Answer'}
        </Button>
        <Button
          variant="outlined"
          sx={{
            color: 'teal',
            border: '2px solid teal',
            fontWeight: 'bold',
            padding: '8px 16px', // Adjusted padding to match smaller font
            borderRadius: '25px',
            fontSize: '0.9rem', // Reduced font size for button text
            textTransform: 'none',
            '&:hover': {
              borderColor: '#008080',
              color: '#008080',
            },
          }}
          onClick={handleNextCard}
        >
          Next Card
        </Button>
      </Box>
    </Box>
  );
};

export default Flashcards;
