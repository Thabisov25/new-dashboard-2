import React, { useState } from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, Drawer, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Slide } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import EventIcon from '@mui/icons-material/Event';
import BookIcon from '@mui/icons-material/Book';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import InfoIcon from '@mui/icons-material/Info'; // Icon for the Beta box

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Sidebar = () => {
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBetaDialogOpen, setIsBetaDialogOpen] = useState(false); // State for beta dialog

  // Function to check if a route is active
  const isActive = (path) => location.pathname === path;

  // Toggle Drawer open/close
  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  // Close Drawer after clicking on an item
  const closeDrawerOnNavigate = () => {
    setIsDrawerOpen(false);
  };

  // Open or close the Beta dialog
  const toggleBetaDialog = () => {
    setIsBetaDialogOpen(!isBetaDialogOpen);
  };

  // Sidebar content
  const sidebarContent = (
    <Box
      sx={{
        width: 240,
        backgroundColor: '#333',
        color: '#fff',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '100vh', // Full height to prevent scrolling
        position: 'relative', // For the Beta box positioning
      }}
    >
      <img src="/logo.png" alt="Logo" style={{ width: '100px', marginBottom: '20px' }} />
      <Typography variant="h6" gutterBottom>
        Vincent Private Tutor
      </Typography>

      {/* Beta Box */}
      <Box
        onClick={toggleBetaDialog}
        sx={{
          position: 'absolute',
          top: 10,
          right: 10,
          padding: '5px 10px',
          backgroundColor: 'teal',
          color: '#fff',
          borderRadius: '8px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
          transition: 'transform 0.3s ease',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      >
        <InfoIcon sx={{ marginRight: '5px' }} />
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Beta</Typography>
      </Box>

      <List sx={{ width: '100%' }}>
        <ListItem
          button
          component={Link}
          to="/dashboard"
          onClick={closeDrawerOnNavigate} // Close drawer on click
          sx={{
            color: isActive('/dashboard') ? 'teal' : '#fff',
            '&:hover': {
              color: 'teal',
            },
          }}
        >
          <ListItemIcon>
            <DashboardIcon sx={{ color: isActive('/dashboard') ? 'teal' : '#61dafb' }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/tutoring-history"
          onClick={closeDrawerOnNavigate} // Close drawer on click
          sx={{
            color: isActive('/tutoring-history') ? 'teal' : '#fff',
            '&:hover': {
              color: 'teal',
            },
          }}
        >
          <ListItemIcon>
            <SchoolIcon sx={{ color: isActive('/tutoring-history') ? 'teal' : '#61dafb' }} />
          </ListItemIcon>
          <ListItemText primary="Tutoring History" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/upcoming-sessions"
          onClick={closeDrawerOnNavigate} // Close drawer on click
          sx={{
            color: isActive('/upcoming-sessions') ? 'teal' : '#fff',
            '&:hover': {
              color: 'teal',
            },
          }}
        >
          <ListItemIcon>
            <EventIcon sx={{ color: isActive('/upcoming-sessions') ? 'teal' : '#61dafb' }} />
          </ListItemIcon>
          <ListItemText primary="Upcoming Sessions" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/study-materials"
          onClick={closeDrawerOnNavigate} // Close drawer on click
          sx={{
            color: isActive('/study-materials') ? 'teal' : '#fff',
            '&:hover': {
              color: 'teal',
            },
          }}
        >
          <ListItemIcon>
            <BookIcon sx={{ color: isActive('/study-materials') ? 'teal' : '#61dafb' }} />
          </ListItemIcon>
          <ListItemText primary="Study Materials" />
        </ListItem>
        <ListItem
          button
          component={Link}
          to="/settings"
          onClick={closeDrawerOnNavigate} // Close drawer on click
          sx={{
            color: isActive('/settings') ? 'teal' : '#fff',
            '&:hover': {
              color: 'teal',
            },
          }}
        >
          <ListItemIcon>
            <SettingsIcon sx={{ color: isActive('/settings') ? 'teal' : '#61dafb' }} />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      {/* Icon button for small screens */}
      <IconButton
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{
          display: { xs: 'block', md: 'none' }, // Show only on small screens
          position: 'fixed', // Fix the position so it stays even when scrolling
          top: 10,
          left: 10,
          zIndex: 1300, // Ensure it's always above other elements
        }}
        onClick={toggleDrawer}
      >
        <MenuIcon />
      </IconButton>

      {/* Sidebar for larger screens */}
      <Box
        sx={{
          display: { xs: 'none', md: 'block' }, // Hide on small screens
          width: 240,
          position: 'fixed', // Fixed to prevent scrolling on large screens
          top: 0,
          left: 0,
          height: '100vh', // Full height to prevent scrolling
          backgroundColor: '#333',
        }}
      >
        {sidebarContent}
      </Box>

      {/* Drawer for small screens */}
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' }, // Show only on small screens
          '& .MuiDrawer-paper': { // Ensure Drawer content has the right z-index
            zIndex: 1200,
            width: 280, 
            backgroundColor: '#333', 
          },
        }}
      >
        {sidebarContent}
      </Drawer>

      {/* Beta Dialog */}
      <Dialog
        open={isBetaDialogOpen}
        onClose={toggleBetaDialog}
        TransitionComponent={Transition}
        keepMounted
        sx={{
          '& .MuiPaper-root': {
            backgroundColor: '#2c2c2c',
            color: '#fff',
            borderRadius: '12px',
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
          Welcome to the Beta Version
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              color: '#ccc',
              textAlign: 'center',
              fontSize: '1rem',
            }}
          >
            This is a beta version of the Vincent Private Tutor Student Dashboard. Some features are still in development and may not work as expected. I would appreciate your feedback as I work towards improving the site. Enjoy exploring the new features!
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center' }}>
          <Button
            onClick={toggleBetaDialog}
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
    </div>
  );
};

export default Sidebar;
