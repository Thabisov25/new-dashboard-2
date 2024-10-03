import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

const StudyMaterials = () => {
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
        {/* Study Materials Title */}
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h5" sx={{ fontWeight: 'bold', textAlign: 'center' }}> {/* Centered and bold */}
              Study Materials
            </Typography>
          </Box>
        </Grid>

        {/* Feature Cards Section */}
        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="body2" sx={{ mb: 2 }}> {/* Reduced from body1 to body2 */}
              Access your study materials here. More features coming soon!
            </Typography>
            <Grid container spacing={2}>
              {features.map((feature, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <FeatureCard 
                    title={feature.title} 
                    description={feature.description} 
                    link={feature.link} // Pass the link to the FeatureCard
                  />
                </Grid>
              ))}
            </Grid>
          </StyledPaper>
        </Grid>

        {/* Recently Viewed Section */}
        <Grid item xs={12}>
          <RecentlyViewed>
            <Typography variant="h6" sx={{ mb: 2 }}> {/* Reduced from h5 to h6 */}
              Recently Viewed
            </Typography>
            <Typography variant="body2" sx={{ color: '#aaa' }}>
              Recently viewed items will show up here...
            </Typography>
          </RecentlyViewed>
        </Grid>
      </Grid>
    </Box>
  );
};

const features = [
  { title: 'Notes', description: 'Organize your study notes effectively.', link: '/notes' },
  { title: 'AI Quiz', description: 'Test your knowledge with AI-generated quizzes.', link: '/ai-quiz' },
  { title: 'Past Papers', description: 'Access past exam papers for better preparation.', link: '/past-papers' },
  { title: 'Flashcards', description: 'Create flashcards for quick revision.', link: '/flashcards' },
  { title: 'Formula Sheets', description: 'Access important formula sheets and quick references.', link: '/formula-sheets' },
];

const StyledPaper = styled(Paper)({
  padding: '20px',
  marginBottom: '20px',
  backgroundColor: '#333',
  color: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
});

const FeatureCard = ({ title, description, link }) => {
  return (
    <StyledFeatureCard component={Link} to={link}> {/* Use Link for navigation */}
      <Typography variant="h6" sx={{ mb: 1, fontSize: '1rem' }}> {/* Reduced font size */}
        {title}
      </Typography>
      <Typography variant="body2">{description}</Typography>
      <ComingSoonBadge>Beta</ComingSoonBadge>
    </StyledFeatureCard>
  );
};

const StyledFeatureCard = styled(Paper)({
  padding: '15px',
  backgroundColor: '#444',
  color: '#fff',
  borderRadius: '8px',
  textAlign: 'center',
  position: 'relative',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  height: '109px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  '&:hover': {
    boxShadow: '0 6px 12px rgba(0, 0, 0, 0.3)',
  },
  textDecoration: 'none', // Ensures links don't have underline
});

const ComingSoonBadge = styled('div')({
  position: 'absolute',
  top: 5,
  right: 5,
  backgroundColor: '#008080',
  color: '#fff',
  padding: '4px 8px',
  borderRadius: '4px',
  fontSize: '0.7rem',
});

const RecentlyViewed = styled(Box)({
  marginTop: '20px',
  padding: '20px',
  backgroundColor: '#333',
  color: '#fff',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
});

export default StudyMaterials;
