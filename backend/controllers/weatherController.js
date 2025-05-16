const Weather = require('../models/Weather.js');

exports.getAllWeather = async (req, res, next) => {
  try {
    const weather = await Weather.find();
    res.json(weather);
  } catch (err) {
    next(err);
  }
};

exports.getWeatherById = async (req, res, next) => {
  try {
    const weather = await Weather.findById(req.params.id);
    if (!weather) return res.status(404).json({ message: 'Weather not found' });
    res.json(weather);
  } catch (err) {
    next(err);
  }
};

exports.createWeather = async (req, res, next) => {
  try {
    const { city, country, temperature, description, icon } = req.body;
    if (!city) return res.status(400).json({ message: 'City is required' });
    const newWeather = new Weather({ city, country, temperature, description, icon });
    const saved = await newWeather.save();
    res.status(201).json(saved);
  } catch (err) {
    next(err);
  }
};

exports.updateWeather = async (req, res, next) => {
  try {
    const updated = await Weather.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ message: 'Weather not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

exports.deleteWeather = async (req, res, next) => {
  try {
    const deleted = await Weather.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Weather not found' });
    res.json({ message: 'Weather deleted' });
  } catch (err) {
    next(err);
  }
};