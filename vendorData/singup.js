const model = require('../model/vendorModel');
const bcrypt = require('bcrypt');

const signup = (req, res) => {
  if (req.body.password === req.body.confirmpassword) {
    if (req.body.email.includes('@') && req.body.email.includes('.com')) {
      if (req.body.password.length > 6) {
        model.findOne({ email: req.body.email })
          .then((existingUser) => {
            if (existingUser) {
              res.send('Email already exists');
            } else {
              model.findOne({ contact: req.body.contact })
                .then((existingContact) => {
                  if (existingContact) {
                    res.send('Mobile number already registered');
                  } else {
                    bcrypt.hash(req.body.password, 10)
                      .then((hashpassword) => {
                        const vendorSelections = req.body.vendorSelections || {}; // Use empty object if vendorSelections is undefined
                        model.create({
                          username: req.body.username,
                          email: req.body.email,
                          contact: req.body.contact,
                          password: hashpassword,
                          confirmpassword: req.body.confirmpassword,
                          vendorSelections: []
                        }).then((user) => {
                          res.send(`${user.username} created successfully`);
                        }).catch((err) => {
                          res.send(err);
                        });
                      }).catch((err) => {
                        res.send('Error on password hashing');
                        console.log(err);
                      });
                  }
                });
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
