const globalmodel = require('../model/globalModel');
const vendorModel = require('../model/vendorModel');

const vendorCreateProposal = (req, res) => {
  const createdEvent = {
    vendorContact: req.body.vendorContact,
    vendorName: req.body.vendorName,
    eventName: req.body.eventName,
    placeOfEvent: req.body.placeOfEvent,
    proposalType: req.body.proposalType,
    eventType: req.body.eventType,
    budget: req.body.budget,
    from: req.body.from,
    to: req.body.to,
    description: req.body.description,
    images: req.body.images,
    foodPreferences: req.body.foodPreferences,
    events: req.body.events
  };
  globalmodel.create(createdEvent)
    .then((event) => {
      res.send('Data Added Globally');
    })
    .catch((err) => {
      console.log(err);
    });
    console.log(req.params.contact);
  vendorModel.findOneAndUpdate(
    { contact: req.params.contact },
    { $push: { vendorSelections: createdEvent } },
    { new: true }
  )
    .then((vendor) => {
      if (vendor) {
        console.log({ vendor });
      } else {
        console.log({ message: 'Vendor not found' });
      }
    })
    .catch((err) => {
      console.log('Error finding vendor:', err);
      console.log({ message: 'Internal server error' });
    });
};
module.exports = vendorCreateProposal;
