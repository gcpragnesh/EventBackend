const mongoose = require('mongoose');
const model = require('../model/userModel');
const bcrypt = require('bcrypt')
const signup = (req, res) => {
  if (req.body.password === req.body.confirmPassword) {
    if (req.body.email.includes('@') && req.body.email.includes('.com')) {
      if (req.body.password.length > 6) {
        model.findOne({ email: req.body.email })
          .then((existingUser) => {
            if (existingUser) {
              res.send('Email already exists');
            } else {
                model.findOne({ contact : req.body.contact})
                .then((existingContact)=>{
                    if(existingContact){
                        res.send('Mobile number already registered')
                    }else{
                        bcrypt.hash(req.body.password,10).then((hashpassword)=>{
                            model.create({
                                username: req.body.username,
                                email: req.body.email,
                                contact: req.body.contact,
                                password: hashpassword,
                                confirmpassword: req.body.confirmPassword
                              }).then((user) => {
                                res.send(`${req.body.username} created successfully`);
                              }).catch((err) => {
                                res.send('Error on submit, please try again');
                              });
                        }).catch((err)=>{
                            res.send('Error Try Again');
                            console.log(err);
                        })
                    }
                })
            }
          })
          .catch((err) => {
            res.send('Error on submit, please try again');
          });
      } else {
        res.send('Password is too short');
      }
    } else {
      res.send('Enter a valid email');
    }
  } else {
    res.send('Passwords do not match');
  }
};

module.exports = signup;