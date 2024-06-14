const express = require('express');
const authController = require('../controllers/authController');
const staffController = require('../controllers/staffController');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/isloggedin', authController.isLoggedIn);
router.get('/logout', authController.logout);

router.use(authController.protect);
router.patch('/updatepassword', authController.updatePassword);

router.get('/', staffController.getAll);
router.patch(
  '/:id',
  staffController.uploadUserPhoto,
  staffController.resizeimage,
  staffController.updateSetting,
);

module.exports = router;
