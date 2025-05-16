require('dotenv').config(); // <-- THIS MUST BE FIRST

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

// Import routes
const destinationRoutes = require('./routes/destinationRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');

// Middleware for error handling
const errorHandler = require('./middleware/errorHandler');

const app = express();

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175', 'http://localhost:3000'], // Allow all common frontend dev ports
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token']
}));

// Middleware
app.use(express.json()); // Parse incoming JSON
app.use(bodyParser.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true }));

// Create uploads directory if it doesn't exist
if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
  fs.mkdirSync(path.join(__dirname, 'uploads'));
}

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/destinations', destinationRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/auth', authRoutes);
app.use('/api/profile', profileRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 8080;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
