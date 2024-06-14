const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAll = (Model, popOption = '') =>
  catchAsync(async (req, res, next) => {
    const feactures = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields();

    const doc = await feactures.query.populate({
      path: popOption,
      select: '-__v',
    });
  
    res.status(200).json({
      status: 'success',
      docNum: doc.length,
      doc,
    });
  });

exports.getOne = (Model, popOption) =>
  catchAsync(async (req, res, next) => {

    let doc;
    if (popOption) {
      doc = await Model.findById(req.params.id).select('-__v').populate({
        path: popOption,
        select: '-__v',
      });
    } else {
      doc = await Model.findById(req.params.id).select('-__v');
    }

    if (!doc) {
      return next(new AppError('No doc found with that ID', 404));
    }

    res.status(201).json({
      status: 'success',
      doc,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    console.log(req.body);
    const doc = await Model.create(req.body);

    res.status(200).json({
      status: 'success',
      doc,
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!doc) {
      return next(new AppError('No doc found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      doc,
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No doc found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });
