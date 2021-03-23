const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review cannot be empty!'],
    },
    rating: {
      type: Number,
      max: [5, 'Rating must be below 5!'],
      min: [1, 'Rating must be bigger than 0.'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    //PARENT REFERENCING
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'Review must belong to a tour'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a user'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
