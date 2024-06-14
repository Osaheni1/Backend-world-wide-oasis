const mongoose = require('mongoose');
const validator = require('validator');

const cabinSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A cabin must have a name'],
    },
    maxCapacity: {
      type: Number,
      required: [true, 'A cabin must have maximum capacity'],
    },
    regularPrice: {
      type: Number,
      required: [true, 'A cabin must have price'],
    },
    discount: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: [true, 'A cabin must have an image'],
      default: 'cabin-001.jpg',
    },
    description: {
      type: String,
      trim: true,
    },
    // bookings: {
    //   type: mongoose.Schema.ObjectId,
    //   ref: 'Booking',
    // },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

cabinSchema.virtual('bookings', {
  ref: 'Booking',
  foreignField: 'cabinId',
  localField: '_id',
});

// cabinSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'bookings',
//     select: '-__v',
//   });

//   next();
// });

const Cabin = mongoose.model('Cabin', cabinSchema);

module.exports = Cabin;
