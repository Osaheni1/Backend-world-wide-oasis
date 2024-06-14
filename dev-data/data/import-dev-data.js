const fs = require('fs');
// const Guest = require("../../models/guestModel");
// const Cabin = require('../../models/cabinModel');
const Booking = require('../../models/bookingModel');

// const gues = require('./data-guests');
// const cabin = require('./data-cabins');
const booking = require('./data-bookings');

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connected successfully'));

// const guests = fs.readFileSync(`${__dirname}/data-guests.js`, "utf-8"),

// const guests = gues.guests;
// const cabins = cabin.cabins;
const bookings = booking.bookings;

// console.log(bookings);

const importData = async () => {
  try {
    await Booking.create(bookings);
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

importData();
