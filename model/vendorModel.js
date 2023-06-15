const mongoose = require('mongoose');

const vendorModel = mongoose.Schema({
  username: String,
  email: String,
  contact: String,
  password: String,
  confirmpassword: String,
  vendorSelections: Array
});

module.exports = mongoose.model('vendorCredentials', vendorModel);
