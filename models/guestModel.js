const mongoose = require("mongoose");
const validator = require("validator");

const guestSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, "Please give us your name"],
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  nationality: {
    type: String,
  },
  nationalID: {
    type: String,
  },
  countryFlag: {
    type: String,
  },
});

const Guest = mongoose.model("Guest", guestSchema);

module.exports = Guest;
