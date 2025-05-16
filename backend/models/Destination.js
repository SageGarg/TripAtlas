const mongoose = require('mongoose');

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  country: { type: String, required: true },
  description: String,
  imageUrl: String
}, { timestamps: true });

module.exports = mongoose.model('Destination', destinationSchema);

