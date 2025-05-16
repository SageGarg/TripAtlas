const express = require('express');
const router = express.Router();
const destinationController = require('../controllers/destinationController.js');

// Base destination routes
router.get('/', destinationController.getAllDestinations);
router.get('/code/:code', destinationController.getDestinationByCode);
router.post('/', destinationController.createDestination);
router.put('/code/:code', destinationController.updateDestination);
router.delete('/code/:code', destinationController.deleteDestination);

// Places routes
router.get('/code/:code/places', destinationController.getDestinationPlaces);
router.post('/code/:code/places', destinationController.addPlace);
router.put('/code/:code/places/:placeId', destinationController.updatePlace);
router.delete('/code/:code/places/:placeId', destinationController.deletePlace);

module.exports = router;
