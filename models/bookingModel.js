const mongoose = require('mongoose');
const datefns = require('date-fns');
// import { add } from "date-fns";
// const validator = require('validator');

function fromToday(numDays, withTime = false) {
  const date = datefns.add(new Date(), { days: numDays });
  if (!withTime) date.setUTCHours(0, 0, 0, 0);
  return date.toISOString().slice(0, -1);
}

const bookingSchema = new mongoose.Schema({
  createdAt: {
    type: Number,
  },
  created: {
    type: Date,
  },
  startDate: {
    type: Number,
  },
  start: {
    type: Date,
  },
  end: {
    type: Date,
  },
  endDate: {
    type: Number,
  },
  cabinId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Cabin',
  },
  guestId: {
    type: mongoose.Schema.ObjectId,
    ref: 'Guest',
  },
  hasBreakfast: {
    type: Boolean,
    default: false,
  },
  observations: {
    type: String,
  },
  isPaid: {
    type: Boolean,
    default: false,
  },
  numGuest: {
    type: Number,
  },
  status: {
    type: String,
    default: 'unconfirmed',
  },
});

bookingSchema.pre('save', function (next) {
  this.created = fromToday(this.createdAt, true);
  this.start = fromToday(this.startDate);
  this.end = fromToday(this.endDate);
  next();
});

// bookingSchema.pre('save', function (next) {
//   this.populate({
//     path: 'cabinId',
//   });
//   this.populate({
//     path: 'guestId',
//   });

bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'cabinId',
    select: 'name regularPrice',
  });
  this.populate({
    path: 'guestId',
    select: 'fullName email',
  });

  next();
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
