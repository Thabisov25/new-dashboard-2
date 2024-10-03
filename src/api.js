// src/api.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/students'; // Adjust if your backend runs on a different port or path

// Register a new student
export const registerStudent = async (studentData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, studentData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || 'Error registering student');
  }
};

// Login student
export const loginStudent = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data; // Token should be handled here
  } catch (error) {
    throw new Error(error.response?.data || 'Error logging in');
  }
};

// Change student password
export const changePassword = async (studentId, currentPassword, newPassword, token) => {
  try {
    const response = await axios.put(
      `${API_URL}/${studentId}/change-password`,
      { currentPassword, newPassword },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data || 'Error changing password');
  }
};
