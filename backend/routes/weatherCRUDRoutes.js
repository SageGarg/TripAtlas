
const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weatherController');
router.get('/', weatherController.getAllWeather);
router.get('/:id', weatherController.getWeatherById);
router.post('/', weatherController.createWeather);
router.put('/:id', weatherController.updateWeather);
router.delete('/:id', weatherController.deleteWeather);
module.exports = router;