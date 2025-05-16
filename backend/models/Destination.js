const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  imageUrl: String,
  coordinates: {
    latitude: Number,
    longitude: Number
  }
});

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  code: { type: String, required: true, unique: true },
  description: String,
  imageUrl: { type: String, required: true },
  places: [placeSchema],
  weather: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Weather'
  }
}, { timestamps: true });

module.exports = mongoose.model('Destination', destinationSchema);

