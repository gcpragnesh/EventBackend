const model = require('../model/vendorModel');

const vendorLoginProposal = (req, res) => {
  model.findOne({ contact: req.params.contact })
    .then((vendor) => {
      if (vendor) {
        res.send({ vendor });
      } else {
        res.status(404).send({ message: 'Vendor not found' });
      }
    })
    .catch((err) => {
      console.log('Error finding vendor:', err);
      res.status(500).send({ message: 'Internal server error' });
    });
};

module.exports = vendorLoginProposal;
