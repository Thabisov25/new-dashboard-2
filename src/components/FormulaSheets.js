// src/components/FormulaSheets.js
import React, { useState } from 'react';
import { Box, Typography, List, ListItemButton, ListItemText, Collapse, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import { MathJax, MathJaxContext } from 'better-react-mathjax'; // Import MathJax
import formulasData from '../data/formulas.json'; // Import the JSON file

const logo = process.env.PUBLIC_URL + '/logo.png'; // Reference to the logo

const FormulaSheets = () => {
  const [selectedFormula, setSelectedFormula] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Toggle the selected formula when clicking on its name
  const handleFormulaClick = (formulaName) => {
    setSelectedFormula(selectedFormula === formulaName ? null : formulaName);
  };

  // Filter formulas based on the search term
  const filteredFormulas = formulasData.formulas.filter((formula) =>
    formula.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <MathJaxContext>
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
          filter: 'blur(0px)', // Apply minimal blur to the logo
          position: 'relative', // For content overlay
        }}
      >
        {/* Background overlay, similar to Flashcards */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(44, 44, 44, 0.8)', // Dark overlay with transparency
            zIndex: -1, // Keep behind the content
          }}
        />
        
        <Typography
          variant="h4"
          sx={{
            color: 'teal',
            fontWeight: 'bold',
            letterSpacing: '2px',
            fontSize: '1.5rem', // Same as Flashcards
          }}
          gutterBottom
        >
          Formula Dictionary
        </Typography>

        {/* Search Bar */}
        <TextField
          label="Search for a formula"
          variant="outlined"
          fullWidth
          sx={{
            mb: 3,
            maxWidth: 600,
            input: { color: '#fff' }, // White text for input
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'teal', // Teal border
              },
              '&:hover fieldset': {
                borderColor: '#008080', // Darker teal on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: '#008080', // Darker teal when focused
              },
            },
            '& label': { color: '#ffffff' }, // White label text
            '& .MuiInputBase-root': {
              backgroundColor: '#1e1e1e',
              borderRadius: '8px',
            },
          }}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Display Filtered Formula List */}
        <StyledList>
          {filteredFormulas.length > 0 ? (
            filteredFormulas.map((formula, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <ListItemButton
                  onClick={() => handleFormulaClick(formula.name)}
                  sx={{
                    color: '#008080', // Teal for formula name
                    backgroundColor: selectedFormula === formula.name ? '#444' : '#333', // Darker when selected
                    borderRadius: 1,
                    '&:hover': { backgroundColor: '#444' }, // Hover effect
                  }}
                >
                  <ListItemText primary={formula.name} />
                </ListItemButton>
                <Collapse in={selectedFormula === formula.name} timeout="auto" unmountOnExit>
                  <Box sx={{ p: 2, color: '#fff', backgroundColor: '#1e1e1e', borderRadius: 1 }}>
                    {/* Wrap everything in MathJax */}
                    <MathJax>
                      <Typography variant="body1">
                        Formula: {`\\( ${formula.formula} \\)`}
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>Breakdown:</strong>
                        {Object.entries(formula.breakdown).map(([key, value]) => (
                          <Typography key={key}>
                            <strong>{key}:</strong> {value}
                          </Typography>
                        ))}
                      </Typography>
                      <Typography variant="body1" sx={{ mt: 1 }}>
                        <strong>Example Problem:</strong> {formula.example.problem}
                      </Typography>
                      <Typography variant="body1">
                        <strong>Solution:</strong>
                        {formula.example.solution.map((step, i) => (
                          <Typography key={i}>
                            {`\\( ${step} \\)`}
                          </Typography>
                        ))}
                      </Typography>
                    </MathJax>
                  </Box>
                </Collapse>
              </Box>
            ))
          ) : (
            <Typography variant="body1" sx={{ color: '#fff' }}>No formulas found</Typography>
          )}
        </StyledList>
      </Box>
    </MathJaxContext>
  );
};

// Styled List Component for a clean, compact layout
const StyledList = styled(List)({
  width: '100%',
  maxWidth: 600,
  backgroundColor: '#2c2c2c', // Match dark background theme
  borderRadius: '8px',
});

export default FormulaSheets;
