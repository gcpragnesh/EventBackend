const mongoose = require('mongoose');
const model = require('../model/userModel');
const bcrypt = require('bcrypt');

const login = (req, res) => {
  const emailOrContact = req.body.emailOrContact;
  const password = req.body.password;
  model.findOne({
    $or: [
      { email: emailOrContact },
      { contact: emailOrContact }
    ]
  }).then((userExist) => {
    if (userExist) {
      bcrypt.compare(password, userExist.password).then((isMatch) => {
        if (isMatch) {
          model.find({email:emailOrContact}).then((user)=>{
            res.send({userdata : user[0] , message:'success'});
          })
        } else {
          res.send({message:'Invalid password'});
        }
      }).catch((err) => {
        console.log('Error comparing passwords:', err);
        res.send({message:'Error on submit, please try again'});
      });
    } else {
      res.send({message:'User does not exist'});
    }
  }).catch((err) => {
    console.log('Error finding user:', err);
    res.send({message:'Error on submit, please try again'});
  });
};

module.exports = login;
