// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((error) => console.log('Error connecting to MongoDB:', error));

// Routes
const studentRoutes = require('./routes/students');
app.use('/api/admin/students', studentRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const vapidKeys = {
  publicKey: 'BBv-DtNskvY1YdPBneL_NCkQIFOtG_qDgiLG420zcNWybGquJpwZinpKYREZYN6NkrzggPtiC93r5oHclDxT448Q',
  privateKey: 'e6kvdmD9LglpkB0AwfiBw8E1Cp5yyzaXAFZyyIwWE2k4'
};

webPush.setVapidDetails('mailto:your-email@example.com', vapidKeys.publicKey, vapidKeys.privateKey);

