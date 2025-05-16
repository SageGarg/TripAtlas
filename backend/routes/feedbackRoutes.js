const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController.js');

router.get('/by-city/:city', feedbackController.getFeedbackByCity);
router.get('/id/:id', feedbackController.getFeedbackById);
router.get('/', feedbackController.getAllFeedback);
router.post('/', feedbackController.createFeedback);
router.put('/:id', feedbackController.updateFeedback);
router.delete('/:id', feedbackController.deleteFeedback);

module.exports = router;
