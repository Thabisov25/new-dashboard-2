import React, { useEffect, useRef, useCallback, useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'; // Use HashRouter for GitHub Pages
import { Box, Snackbar, Dialog, DialogTitle, DialogActions, Button } from '@mui/material';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import TutoringHistory from './components/TutoringHistory';
import UpcomingSessions from './components/UpcomingSessions';
import StudyMaterials from './components/StudyMaterials';
import Settings from './components/Settings';
import PersonalDetails from './components/PersonalDetails';
import Notes from './components/Notes';
import AIQuiz from './components/AIQuiz';
import PastPapers from './components/PastPapers';
import Flashcards from './components/Flashcards';
import FormulaSheets from './components/FormulaSheets';
import PaymentSession from './components/PaymentSession';
import AdminDashboard from './components/AdminDashboard';
import StudentProfile from './components/StudentProfile';
import AdminLogin from './components/AdminLogin';
import StudentLogin from './components/StudentLogin';
import ProtectedRoute from './components/ProtectedRoute';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { StudentProvider } from './contexts/StudentContext';
import { NotificationProvider } from './contexts/NotificationContext';

function App() {
  useEffect(() => {
    // Register service worker for GitHub Pages
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      navigator.serviceWorker.register('/new-dashboard-2/service-worker.js') // Adjust path for GitHub Pages
        .then(function(registration) {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(function(error) {
          console.error('Service Worker registration failed:', error);
        });
    }
  }, []);

  return (
    <AuthProvider>
      <StudentProvider>
        <NotificationProvider>
          <Router> {/* Using HashRouter for proper GitHub Pages routing */}
            <MainLayout />
          </Router>
        </NotificationProvider>
      </StudentProvider>
    </AuthProvider>
  );
}

const MainLayout = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const inactivityTimeout = useRef(null);
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false); // State for snackbar
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog
  const INACTIVITY_TIME = 15 * 60 * 1000; // 15 minutes
  const WARNING_TIME = 60 * 1000; // 1 minute before logout

  // Reset inactivity timer and warn user before logout
  const resetTimer = useCallback(() => {
    if (inactivityTimeout.current) {
      clearTimeout(inactivityTimeout.current);
    }

    inactivityTimeout.current = setTimeout(() => {
      setIsSnackbarOpen(true); // Show a warning snackbar 1 minute before auto-logout

      // After 1 minute, if no response, log out the user
      setTimeout(() => {
        setIsSnackbarOpen(false);
        setIsDialogOpen(true); // Show a dialog asking for confirmation
      }, WARNING_TIME);
    }, INACTIVITY_TIME - WARNING_TIME);
  }, [INACTIVITY_TIME, WARNING_TIME]);

  useEffect(() => {
    const events = [
      'mousemove',
      'keydown',
      'click',
      'scroll',
      'touchstart',
      'touchmove',
      'wheel',
      'pointermove',
      'pointerdown',
    ];

    events.forEach((event) => window.addEventListener(event, resetTimer));

    resetTimer();

    return () => {
      if (inactivityTimeout.current) {
        clearTimeout(inactivityTimeout.current);
      }
      events.forEach((event) => window.removeEventListener(event, resetTimer));
    };
  }, [resetTimer]);

  // Handles closing the dialog and resetting the timer
  const handleStayLoggedIn = () => {
    setIsDialogOpen(false);
    resetTimer(); // Reset the timer to give the user more time
  };

  // Handles logout when the user doesn't respond
  const handleLogout = () => {
    setIsDialogOpen(false);
    logout(); // Perform logout
  };

  const sidebarRoutes = [
    '/dashboard',
    '/tutoring-history',
    '/upcoming-sessions',
    '/study-materials',
    '/settings',
  ];

  const shouldShowSidebar = sidebarRoutes.includes(location.pathname);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {shouldShowSidebar && <Sidebar />}
      <Box component="main" sx={{ flexGrow: 1, p: 3, backgroundColor: '#2c2c2c', color: '#fff' }}>
        <Routes>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminProtectedRoute><AdminDashboard /></AdminProtectedRoute>} />
          <Route path="/student-login" element={<StudentLogin />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/tutoring-history" element={<ProtectedRoute><TutoringHistory /></ProtectedRoute>} />
          <Route path="/upcoming-sessions" element={<ProtectedRoute><UpcomingSessions /></ProtectedRoute>} />
          <Route path="/study-materials" element={<ProtectedRoute><StudyMaterials /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
          <Route path="/personal-details" element={<ProtectedRoute><PersonalDetails /></ProtectedRoute>} />
          <Route path="/notes" element={<ProtectedRoute><Notes /></ProtectedRoute>} />
          <Route path="/ai-quiz" element={<ProtectedRoute><AIQuiz /></ProtectedRoute>} />
          <Route path="/past-papers" element={<ProtectedRoute><PastPapers /></ProtectedRoute>} />
          <Route path="/flashcards" element={<ProtectedRoute><Flashcards /></ProtectedRoute>} />
          <Route path="/formula-sheets" element={<ProtectedRoute><FormulaSheets /></ProtectedRoute>} />
          <Route path="/payment-session" element={<ProtectedRoute><PaymentSession /></ProtectedRoute>} />
          <Route path="/student-profile" element={<ProtectedRoute><StudentProfile /></ProtectedRoute>} />
          <Route path="/" element={<Navigate to="/student-login" />} />
        </Routes>

        {/* Snackbar alert for inactivity */}
        <Snackbar
          open={isSnackbarOpen}
          message="You've been inactive for a while. You will be logged out soon."
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          sx={{
            '& .MuiSnackbarContent-root': {
              backgroundColor: 'teal',
              color: '#fff',
              fontSize: '1rem',
              borderRadius: '8px',
              padding: '8px 16px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
            },
          }}
        />

        {/* Dialog to confirm logout due to inactivity */}
        <Dialog
          open={isDialogOpen}
          onClose={handleLogout}
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
            Inactivity Alert
          </DialogTitle>
          <DialogActions sx={{ justifyContent: 'center', flexDirection: 'column' }}>
            <Box sx={{ mb: 2, textAlign: 'center', fontSize: '1rem' }}>
              You've been inactive for a while. Would you like to stay logged in or log out now?
            </Box>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button
                onClick={handleStayLoggedIn}
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
                Stay Logged In
              </Button>
              <Button
                onClick={handleLogout}
                sx={{
                  backgroundColor: '#ff1744',
                  color: '#fff',
                  borderRadius: '25px',
                  padding: '8px 20px',
                  fontWeight: 'bold',
                  '&:hover': {
                    backgroundColor: '#d50000',
                  },
                }}
              >
                Log Out
              </Button>
            </Box>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

export default App;
