const express = require('express');

const authController = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('./../controllers/userController');

router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
