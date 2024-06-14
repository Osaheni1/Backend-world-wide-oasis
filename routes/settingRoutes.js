const express = require('express');
const settingController = require('../controllers/settingController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(settingController.getAll)
  .post(settingController.createSetting);

router.route('/:id').patch(settingController.updateSetting);

module.exports = router;
