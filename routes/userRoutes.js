const express = require('express');
const authController = require('./../controllers/authController');
const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  updateMe,
  deleteMe,
  getMe,
  uploadUserPhoto,
} = require('./../controllers/userController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// Below this requires auth.
//After this router.use all router will require authController.protect
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);
router.get('/me', getMe, getUser);
router.patch('/updateMe', uploadUserPhoto, updateMe);
router.delete('/deleteMe', deleteMe);

//After this middleware all routes below will be restricted to role mentioned in brackets (admin)
router.use(authController.restrictTo('admin'));
router.route('/').get(getAllUsers).post(createUser);
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

module.exports = router;
