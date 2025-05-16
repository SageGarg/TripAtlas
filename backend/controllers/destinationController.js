const Destination = require('../models/Destination.js');

// GET all destinations
exports.getAllDestinations = async (req, res, next) => {
  try {
    const destinations = await Destination.find();
    res.json({
      success: true,
      data: destinations
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching destinations',
      error: err.message
    });
  }
};

// GET one destination by code (e.g., 'us', 'india')
exports.getDestinationByCode = async (req, res, next) => {
  try {
    const destination = await Destination.findOne({ code: req.params.code });
    if (!destination) {
      return res.status(404).json({
        success: false,
        message: `Destination with code '${req.params.code}' not found`
      });
    }
    res.json({
      success: true,
      data: destination
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching destination',
      error: err.message
    });
  }
};

// GET places for a destination
exports.getDestinationPlaces = async (req, res, next) => {
  try {
    const destination = await Destination.findOne({ code: req.params.code });
    if (!destination) {
      return res.status(404).json({
        success: false,
        message: `Destination with code '${req.params.code}' not found`
      });
    }
    res.json({
      success: true,
      data: destination.places
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error fetching destination places',
      error: err.message
    });
  }
};

// POST create a new destination
exports.createDestination = async (req, res, next) => {
  try {
    const { name, code, description, imageUrl, places } = req.body;
    if (!name || !code) {
      return res.status(400).json({
        success: false,
        message: 'Name and code are required'
      });
    }
    
    const newDestination = new Destination({ 
      name, 
      code, 
      description, 
      imageUrl,
      places: places || []
    });
    
    const saved = await newDestination.save();
    res.status(201).json({
      success: true,
      data: saved
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error creating destination',
      error: err.message
    });
  }
};

// PUT update a destination
exports.updateDestination = async (req, res, next) => {
  try {
    const updated = await Destination.findOneAndUpdate(
      { code: req.params.code },
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) {
      return res.status(404).json({
        success: false,
        message: `Destination with code '${req.params.code}' not found`
      });
    }
    res.json({
      success: true,
      data: updated
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating destination',
      error: err.message
    });
  }
};

// POST add a place to a destination
exports.addPlace = async (req, res, next) => {
  try {
    const destination = await Destination.findOne({ code: req.params.code });
    if (!destination) {
      return res.status(404).json({
        success: false,
        message: `Destination with code '${req.params.code}' not found`
      });
    }
    
    destination.places.push(req.body);
    const updated = await destination.save();
    res.status(201).json({
      success: true,
      data: updated
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error adding place to destination',
      error: err.message
    });
  }
};

// PUT update a place in a destination
exports.updatePlace = async (req, res, next) => {
  try {
    const destination = await Destination.findOne({ code: req.params.code });
    if (!destination) {
      return res.status(404).json({
        success: false,
        message: `Destination with code '${req.params.code}' not found`
      });
    }
    
    const placeIndex = destination.places.findIndex(p => p._id.toString() === req.params.placeId);
    if (placeIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Place not found'
      });
    }
    
    destination.places[placeIndex] = { ...destination.places[placeIndex], ...req.body };
    const updated = await destination.save();
    res.json({
      success: true,
      data: updated
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error updating place',
      error: err.message
    });
  }
};

// DELETE a place from a destination
exports.deletePlace = async (req, res, next) => {
  try {
    const destination = await Destination.findOne({ code: req.params.code });
    if (!destination) {
      return res.status(404).json({
        success: false,
        message: `Destination with code '${req.params.code}' not found`
      });
    }
    
    destination.places = destination.places.filter(p => p._id.toString() !== req.params.placeId);
    const updated = await destination.save();
    res.json({
      success: true,
      data: updated
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error deleting place',
      error: err.message
    });
  }
};

// DELETE a destination
exports.deleteDestination = async (req, res, next) => {
  try {
    const deleted = await Destination.findOneAndDelete({ code: req.params.code });
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: `Destination with code '${req.params.code}' not found`
      });
    }
    res.json({
      success: true,
      message: 'Destination deleted'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'Error deleting destination',
      error: err.message
    });
  }
};