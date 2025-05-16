require('dotenv').config(); // <-- THIS MUST BE FIRST

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Import routes
const destinationRoutes = require('./routes/destinationRoutes');
const feedbackRoutes = require('./routes/feedbackRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const weatherCRUDRoutes = require('./routes/weatherCRUDRoutes');
const authRoutes = require('./routes/auth');

// Middleware for error handling
const errorHandler = require('./middleware/errorHandler');

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:5173', // frontend dev server
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware
app.use(express.json()); // Parse incoming JSON
app.use(bodyParser.json()); // For parsing application/json

// Routes
app.use('/api/destinations', destinationRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/weatherCRUD', weatherCRUDRoutes);
app.use('/auth', authRoutes);

// Error handling middleware
app.use(errorHandler);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5001, () => console.log('Server running on port 5001'));
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
