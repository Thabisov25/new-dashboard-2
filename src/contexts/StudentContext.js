import React, { createContext, useContext, useState, useEffect } from 'react';

const StudentContext = createContext();

export const useStudent = () => useContext(StudentContext);

export const StudentProvider = ({ children }) => {
  const [currentStudent, setCurrentStudent] = useState(() => {
    try {
      const savedStudent = localStorage.getItem('currentStudent');
      return savedStudent ? JSON.parse(savedStudent) : null;
    } catch (error) {
      console.error('Failed to parse student data from localStorage:', error);
      return null; // If there's an error, return null to avoid crashes
    }
  });

  useEffect(() => {
    if (currentStudent) {
      try {
        // Save current student to localStorage when they log in
        localStorage.setItem('currentStudent', JSON.stringify(currentStudent));
      } catch (error) {
        console.error('Failed to save student data to localStorage:', error);
      }
    } else {
      // Remove student from localStorage when they log out
      localStorage.removeItem('currentStudent');
    }
  }, [currentStudent]);

  return (
    <StudentContext.Provider value={{ currentStudent, setCurrentStudent }}>
      {children}
    </StudentContext.Provider>
  );
};
