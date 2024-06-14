const Staff = require('../models/staffModel');
const factory = require('./handleFactory');

const multer = require('multer');
const sharp = require('sharp');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  console.log(file);
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
  console.log(req.body);

  if (!req.file) return next();
  req.file.filename = `staff-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(2000, 1333)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`public/img/staff/${req.file.filename}`);

  req.body.photo = req.file.filename;
  next();
};
exports.getAll = factory.getAll(Staff);
exports.updateSetting = factory.updateOne(Staff);
