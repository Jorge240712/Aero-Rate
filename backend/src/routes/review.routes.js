const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const authenticateToken = require('../middlewares/auth.middleware');

// Cualquiera puede ver las reseñas
router.get('/', reviewController.getAllReviews);

// Solo usuarios logueados pueden crear una reseña (usa el middleware de auth)
router.post('/', authenticateToken, reviewController.createReview);

module.exports = router;