// src/components/StudentDataForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StudentDataForm = ({ studentId }) => {
  const [studentData, setStudentData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    grade: '',
    email: '',
    phone: '',
    address: '',
  });

  // Fetch student data by ID
  useEffect(() => {
    if (studentId) {
      axios.get(`http://localhost:5000/students/${studentId}`)
        .then(response => {
          setStudentData(response.data);
          setFormData({
            name: response.data.personalDetails.name || '',
            age: response.data.personalDetails.age || '',
            grade: response.data.personalDetails.grade || '',
            email: response.data.personalDetails.contact.email || '',
            phone: response.data.personalDetails.contact.phone || '',
            address: response.data.personalDetails.contact.address || '',
          });
        })
        .catch(error => console.error('Error fetching student data:', error));
    }
  }, [studentId]);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = {
      personalDetails: {
        id: studentId,
        name: formData.name,
        age: formData.age,
        grade: formData.grade,
        contact: {
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
        },
      },
    };
    axios.put(`http://localhost:5000/students/${studentId}`, updatedData)
      .then(response => {
        alert('Student data updated successfully!');
        setStudentData(response.data);
      })
      .catch(error => console.error('Error updating student data:', error));
  };

  return (
    <div>
      <h2>Update Student Data</h2>
      {studentData ? (
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required />
          <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="Age" required />
          <input type="number" name="grade" value={formData.grade} onChange={handleChange} placeholder="Grade" required />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required />
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
          <button type="submit">Update</button>
        </form>
      ) : (
        <p>Loading student data...</p>
      )}
    </div>
  );
};

export default StudentDataForm;
