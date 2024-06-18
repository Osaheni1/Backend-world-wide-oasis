const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Staff = require('../models/staffModel');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const signToken = (id) =>
  jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (staff, statusCode, req, res) => {
  const token = signToken(staff._id);

  res.cookie('jwt', token, {
    expires: new Date(Date.now() + 270 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    // secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    secure: true,
    sameSite: 'none',
  });

  // console.log(res.cookies);
  // console.log(new Date(Date.now() + 270 * 24 * 60 * 60 * 1000));
  res.status(statusCode).json({
    status: 'success',
    token,
    data: staff,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newStaff = await Staff.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });

  createSendToken(newStaff, 201, req, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  const staff = await Staff.findOne({ email }).select('+password');

  if (!staff || !(await staff.correctPassword(password, staff.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createSendToken(staff, 200, req, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401),
    );
  }
  // console.log(token);

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  // console.log(decoded);

  const currentStaff = await Staff.findById(decoded.id);
  if (!currentStaff) {
    return next(
      new AppError(
        'The staff belonging to this token does no longer exist',
        401,
      ),
    );
  }

  req.user = currentStaff;
  next();
});

exports.isLoggedIn = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    // console.log('we are here');
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET,
    );
    const currentStaff = await Staff.findById(decoded.id);
    if (!currentStaff) {
      return next(
        new AppError(
          'The staff does no longer exist, please signup again',
          401,
        ),
      );
    }

    res.status(200).json({
      status: 'success',
      data: currentStaff,
    });
  } else {
    return next(new AppError('You are not logged in please do log in', 401));
  }
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: 'none',
  });

  res.status(200).json({ status: 'success' });
};

exports.updatePassword = catchAsync(async (req, res, next) => {
  const staff = await Staff.findById(req.user._id).select('+password');

  // if (!(await staff.correctPassword(staff.password, staff.password))) {
  //   return next(new AppError('Your current password is wrong.', 401));
  // }
  if (!staff) {
    return next(new AppError('User does not exist', 400));
  }
  staff.password = req.body.password;
  staff.passwordConfirm = req.body.password;
  await staff.save();

  createSendToken(staff, 200, req, res);
  // res.status(200).json({ status: 'success' });
});
