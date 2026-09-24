const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const authenticateToken = require('../middlewares/auth.middleware');

router.get('/', reviewController.getAllReviews);
router.get('/admin', authenticateToken, reviewController.getAdminReviews);
router.get('/mine', authenticateToken, reviewController.getMyReviews);
router.post('/', authenticateToken, reviewController.createReview);
router.patch('/:id', authenticateToken, reviewController.updateReview);
router.delete('/:id', authenticateToken, reviewController.deleteReview);

module.exports = router;