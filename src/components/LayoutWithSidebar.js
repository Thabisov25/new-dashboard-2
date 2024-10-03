// src/components/LayoutWithSidebar.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar'; // Import your Sidebar component
import { useLocation } from 'react-router-dom';

const LayoutWithSidebar = () => {
  const location = useLocation();

  // Define the paths where the sidebar should appear
  const sidebarPaths = [
    '/dashboard',
    '/tutoring-history',
    '/upcoming-sessions',
    '/study-materials',
    '/settings',
  ];

  // Check if the current route is in the sidebarPaths array
  const shouldShowSidebar = sidebarPaths.includes(location.pathname);

  return (
    <div style={{ display: 'flex' }}>
      {/* Conditionally render the sidebar */}
      {shouldShowSidebar && <Sidebar />}
      {/* The main content (your components will render here) */}
      <div style={{ flexGrow: 1 }}>
        <Outlet /> {/* This will render the content of the current route */}
      </div>
    </div>
  );
};

export default LayoutWithSidebar;
