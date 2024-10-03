import React from 'react';
import { Box, Typography, Button } from '@mui/material';

const logo = process.env.PUBLIC_URL + '/logo.png'; // Reference to the logo

const Notes = () => {
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
        filter: 'blur(0px)', // Applies a blur to the background logo
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
          backgroundColor: 'rgba(44, 44, 44, 0.8)', // Dark overlay with transparency
          zIndex: -1, // Keep it behind the content
        }}
      />

      <Typography variant="h4" gutterBottom sx={{ color: 'teal', fontWeight: 'bold', letterSpacing: '2px' }}>
        Notes
      </Typography>
      <Typography variant="body1" sx={{ mb: 2, color: '#fff' }}>
        Organize your study notes effectively.
      </Typography>
      <Button 
        variant="contained" 
        sx={{
          color: 'white', 
          backgroundColor: 'teal', 
          '&:hover': { backgroundColor: '#008080' }
        }}
      >
        View Notes
      </Button>
    </Box>
  );
};

export default Notes;
