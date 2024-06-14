const Guest = require('../models/guestModel');
const factory = require('./handleFactory');

exports.getAll = factory.getAll(Guest);


