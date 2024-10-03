// routes/students.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Get all students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching students' });
  }
});

// Add a new student
router.post('/register', async (req, res) => {
  const { name, age, grade, contact, sessionEnd } = req.body;
  try {
    const newStudent = new Student({ name, age, grade, contact, sessionEnd });
    const savedStudent = await newStudent.save();
    res.status(201).json(savedStudent);
  } catch (error) {
    res.status(400).json({ message: 'Error adding student' });
  }
});

// Update a student's details
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(id, updates, { new: true });
    res.json(updatedStudent);
  } catch (error) {
    res.status(400).json({ message: 'Error updating student' });
  }
});

module.exports = router;
// XOzWIJXPlFYLUSWK