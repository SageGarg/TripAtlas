const Feedback = require('../models/Feedback.js');

// GET all feedback
exports.getAllFeedback = async (req, res, next) => {
  try {
    const feedback = await Feedback.find();
    res.json(feedback);
  } catch (err) {
    next(err);
  }
};

// GET feedback by MongoDB ObjectId
exports.getFeedbackById = async (req, res, next) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
    res.json(feedback);
  } catch (err) {
    next(err);
  }
};

// GET feedback by city (e.g., /by-city/Ames)
exports.getFeedbackByCity = async (req, res, next) => {
    try {
        const feedback = await Feedback.find({
            destination: req.params.city  // Changed from city to destination
          });
      if (!feedback || feedback.length === 0) {
        return res.status(404).json({ message: `No feedback found for city: ${req.params.city}` });
      }
      res.json(feedback);
    } catch (err) {
      next(err);
    }
};

// POST create new feedback
exports.createFeedback = async (req, res, next) => {
  try {
    const { user, message, rating, city, destination } = req.body;
    if (!user || !message) return res.status(400).json({ message: 'User and message are required' });

    const newFeedback = new Feedback({ user, message, rating, city, destination });
    const saved = await newFeedback.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

// PUT update feedback by ID
exports.updateFeedback = async (req, res, next) => {
  try {
    const updated = await Feedback.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Feedback not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

// DELETE feedback by ID
exports.deleteFeedback = async (req, res, next) => {
  try {
    const deleted = await Feedback.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Feedback not found' });
    res.json({ message: 'Feedback deleted' });
  } catch (err) {
    next(err);
  }
};

// GET feedback by destination
exports.getFeedbackByDestination = async (req, res, next) => {
  try {
    const feedback = await Feedback.find({ destination: req.params.destination });
    if (!feedback || feedback.length === 0) {
      return res.status(404).json({ message: `No feedback found for destination: ${req.params.destination}` });
    }
    res.json(feedback);
  } catch (err) {
    next(err);
  }
};
