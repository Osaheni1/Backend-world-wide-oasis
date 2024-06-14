const express = require('express');
const cabinController = require('../controllers/cabinController');
const authController = require('../controllers/authController');

const router = express.Router();

router.use(authController.protect);

router
  .route('/')
  .get(cabinController.getAll)
  .post(
    cabinController.uploadUserPhoto,
    cabinController.resizeimage,
    cabinController.createCabin,
  );
router
  .route('/:id')
  .get(cabinController.getCabin)
  .patch(
    cabinController.uploadUserPhoto,
    cabinController.resizeimage,
    cabinController.updateCabin,
  )
  .delete(cabinController.deleteCabin);

module.exports = router;
