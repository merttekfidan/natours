const express = require('express');
const reviewController = require('./../controllers/reviewController');
const authController = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });
// POST /tour/1231/reviews
// POST /reviews
// MergeParams bu routera gelen diğer parametreleri de  erişmemizi sağlar

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(authController.protect, reviewController.createReview);
module.exports = router;
