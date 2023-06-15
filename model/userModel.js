const mongoose = require('mongoose');

const userModel = mongoose.Schema({
    username:String,
    email:String,
    contact:String,
    password:String,
    confirmpassword:String,
    vendorSelections: Array,
});

module.exports= mongoose.model('userCredentials',userModel);