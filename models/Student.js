// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  grade: { type: Number, required: true },
  contact: {
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
  },
  sessionEnd: { type: Date },
  paymentStatus: { type: String, default: 'Unpaid' },
});

module.exports = mongoose.model('Student', studentSchema);
