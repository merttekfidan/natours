const express = require('express');
const tourController = require('./../controllers/tourController');
const authController = require('./../controllers/authController');
const reviewController = require('./../controllers/reviewController');

const router = express.Router();

//router.param('id', tourController.checkId);
//router.param('/', tourController.checkBody);

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);
router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
router
  .route('/')
  .get(authController.protect, tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourController.deleteTour
  );

// POST /tour/12ca33ff1/reviews
// GET  /tour/12ca33ff1/reviews
// GET  /tour/12ca33ff1/reviews/2a5fa35
router
  .route('/:tourId/reviews')
  .post(authController.protect, reviewController.createReview);

module.exports = router;
