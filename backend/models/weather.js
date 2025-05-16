const mongoose = require('mongoose');

const weatherSchema = new mongoose.Schema({
  city: { type: String, required: true },
  country: String,
  temperature: Number,
  description: String,
  icon: String,
}, { timestamps: true });

module.exports = mongoose.model('Weather', weatherSchema);
