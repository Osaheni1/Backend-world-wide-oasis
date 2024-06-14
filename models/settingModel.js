const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  minBookingLength: {
    type: Number,
  },
  maxbookingLength: {
    type: Number,
  },
  maxGuestPerBooking: {
    type: Number,
  },
  breakfastPrice: {
    type: Number,
  },
});

const Setting = mongoose.model('Setting', settingSchema);

module.exports = Setting;
