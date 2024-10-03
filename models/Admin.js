// models/Admin.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // For simplicity, storing plain text temporarily
});

module.exports = mongoose.model('Admin', adminSchema);
