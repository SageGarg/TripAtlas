const express = require('express');
const router = express.Router();
const feedbackController = require('../controllers/feedbackController');

// Routes
router.get('/', feedbackController.getAllFeedback);
router.get('/:id', feedbackController.getFeedbackById);
router.post('/', feedbackController.createFeedback);
router.put('/:id', feedbackController.updateFeedback);
router.delete('/:id', feedbackController.deleteFeedback);
router.get('/category/:category', feedbackController.getFeedbackByCategory);
router.get('/destination/:destination', feedbackController.getFeedbackByDestination);

module.exports = router;
