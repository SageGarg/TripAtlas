const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  user: { type: String, required: true },  // could be email or username
  destination: { type: String, required: true },  // destination name or ID
  message: { type: String, required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);

