const Feedback = require('../models/Feedback');

// Get all feedback and blog posts
exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find()
      .sort({ createdAt: -1 }); // Sort by newest first
    res.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Error fetching feedback', error: error.message });
  }
};

// Get feedback by ID
exports.getFeedbackById = async (req, res) => {
  try {
    const feedback = await Feedback.findById(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback:', error);
    res.status(500).json({ message: 'Error fetching feedback', error: error.message });
  }
};

// Create new feedback
exports.createFeedback = async (req, res) => {
  try {
    const {
      title,
      destination,
      content,
      rating,
      category,
      visitDate,
      author
    } = req.body;

    const feedback = new Feedback({
      title,
      destination,
      content,
      rating,
      category,
      visitDate,
      author: author || 'Anonymous'
    });

    const savedFeedback = await feedback.save();
    res.status(201).json(savedFeedback);
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ message: 'Error creating feedback', error: error.message });
  }
};

// Update feedback
exports.updateFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.json(feedback);
  } catch (error) {
    console.error('Error updating feedback:', error);
    res.status(500).json({ message: 'Error updating feedback', error: error.message });
  }
};

// Delete feedback
exports.deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    res.status(500).json({ message: 'Error deleting feedback', error: error.message });
  }
};

// Get feedback by category
exports.getFeedbackByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const feedback = await Feedback.find({ category })
      .sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback by category:', error);
    res.status(500).json({ message: 'Error fetching feedback', error: error.message });
  }
};

// Get feedback by destination
exports.getFeedbackByDestination = async (req, res) => {
  try {
    const { destination } = req.params;
    const feedback = await Feedback.find({ 
      destination: { $regex: destination, $options: 'i' } 
    }).sort({ createdAt: -1 });
    res.json(feedback);
  } catch (error) {
    console.error('Error fetching feedback by destination:', error);
    res.status(500).json({ message: 'Error fetching feedback', error: error.message });
  }
};
