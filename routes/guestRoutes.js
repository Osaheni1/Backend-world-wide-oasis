const express = require('express');
const guestController = require('../controllers/guestController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router.route('/').get(guestController.getAll);

module.exports = router;
