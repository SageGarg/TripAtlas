const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  destination: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    required: true
  },
  category: {
    type: String,
    enum: ['feedback', 'blog'],
    required: true
  },
  visitDate: {
    type: Date,
    required: true
  },
  author: {
    type: String,
    default: 'Anonymous'
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('Feedback', feedbackSchema);

