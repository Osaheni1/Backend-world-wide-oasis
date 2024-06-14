const Setting = require('../models/settingModel');
const factory = require('./handleFactory');

exports.getAll = factory.getAll(Setting);

exports.createSetting = factory.createOne(Setting);

exports.updateSetting = factory.updateOne(Setting);
