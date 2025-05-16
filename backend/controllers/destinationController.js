const Destination = require('../models/Destination.js');

// GET all destinations
exports.getAllDestinations = async (req, res, next) => {
  try {
    const destinations = await Destination.find();
    res.json(destinations);
  } catch (err) {
    next(err);
  }
};

// GET one destination by ID
exports.getDestinationById = async (req, res, next) => {
  try {
    const destination = await Destination.findById(req.params.id);
    if (!destination) return res.status(404).json({ message: 'Destination not found' });
    res.json(destination);
  } catch (err) {
    next(err);
  }
};

// POST create a new destination
exports.createDestination = async (req, res, next) => {
  try {
    const { name, country, description, imageUrl } = req.body;
    if (!name) return res.status(400).json({ message: 'Name is required' });
    const newDestination = new Destination({ name, country, description, imageUrl });
    const saved = await newDestination.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// PUT update a destination
exports.updateDestination = async (req, res, next) => {
  try {
    const updated = await Destination.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Destination not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE a destination
exports.deleteDestination = async (req, res, next) => {
  try {
    const deleted = await Destination.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Destination not found' });
    res.json({ message: 'Destination deleted' });
  } catch (err) {
    next(err);
  }
};