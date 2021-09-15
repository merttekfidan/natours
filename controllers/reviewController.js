const Review = require('./../models/reviewModel');
const Booking = require('./../models/bookingModel');
//const apiFeatures = require('./../utils/apiFeatures');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const factory = require('./handlerFactory.js');

exports.setTourUserIds = (req, res, next) => {
  // Allow nested routes
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

// Middleware to check if a user purchased the tour before leaving comment
exports.checkIfBookingPurchased = catchAsync(async (req, res, next) => {
  if (!req.body.tour || !req.user._id)
    return next(new AppError('Bad request! No Tour Id or User Id', 400));
  const booking = await Booking.findOne({
    tour: req.body.tour,
    user: req.user._id,
  });
  if (!booking) return next(new AppError('You do not own this tour!', 400));
  next();
});

exports.getAllReviews = factory.getAll(Review);
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
