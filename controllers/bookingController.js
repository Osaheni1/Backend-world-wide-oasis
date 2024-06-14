const Booking = require('../models/bookingModel');
const factory = require('./handleFactory');

exports.getAll = factory.getAll(Booking);

exports.createBooking = factory.createOne(Booking);

exports.getBooking = factory.getOne(Booking);

exports.updateBooking = factory.updateOne(Booking);

exports.deleteBooking = factory.deleteOne(Booking);
