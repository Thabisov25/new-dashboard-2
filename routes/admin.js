// routes/admin.js
const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const Student = require('../models/Student');
const jwt = require('jsonwebtoken');

// Middleware for JWT authentication
const authenticateAdmin = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(403);
  jwt.verify(token, 'admin_secret_key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Admin login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin || admin.password !== password) {
      return res.status(400).send('Invalid credentials');
    }

    // Generate JWT for admin access
    const token = jwt.sign({ adminId: admin._id }, 'admin_secret_key', { expiresIn: '2h' });
    res.json({ token });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Register a new student
router.post('/students/register', authenticateAdmin, async (req, res) => {
  const { name, age, grade, contact } = req.body;

  try {
    const password = 'defaultPassword'; // Set a default password temporarily
    const studentId = await generateStudentNumber(); // Generate a unique student number

    const student = new Student({
      personalDetails: { id: studentId, name, age, grade, contact },
      password: password, // Temporarily store plain text password
    });
    await student.save();

    res.status(201).json({ message: 'Student registered successfully', studentId });
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Update student data
router.put('/students/:id', authenticateAdmin, async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { 'personalDetails.id': req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!student) return res.status(404).send('Student not found');
    res.json(student);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// Get all students
router.get('/students', authenticateAdmin, async (req, res) => {
  try {
    const students = await Student.find({});
    res.json(students);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = router;
