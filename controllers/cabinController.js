const Cabin = require('../models/cabinModel');
const AppError = require('../utils/appError');
// const formidable = require('formidable');

const factory = require('./handleFactory');
const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  // console.log(file);
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images.', 400), false);
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');
exports.resizeimage = async (req, res, next) => {
  // console.log(req.body);

  if (!req.file) return next();
  req.file.filename = `cabin-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/cabins/${req.file.filename}`);

  req.body.image = req.file.filename;
  next();
};

exports.getAll = factory.getAll(Cabin, 'bookings');

exports.createCabin = factory.createOne(Cabin);

exports.getCabin = factory.getOne(Cabin, 'bookings');

exports.updateCabin = factory.updateOne(Cabin);

exports.deleteCabin = factory.deleteOne(Cabin);
