const vendorData = require('../model/vendorModel');
const globalData = require('../model/globalModel');

const editproposal = (req, res) => {
  const contact = req.params.contact;
  const eventName = req.params.eventname; // Updated parameter name to eventname
  console.log(contact, eventName);

  vendorData
    .find()
    .then(async (vendors) => {
      const vendor1 = await vendors.find((vendor) => vendor.contact === contact);
      const vSel = vendor1.vendorSelections;
      const eventIndex = vSel.findIndex((obj) => obj.eventName === eventName);
      if (eventIndex === -1) {
        return res.status(404).send('Event not found');
      }
      vSel[eventIndex] = req.body; // Update the event object at the found index

      // Save the updated vendor data
      vendor1.save();

      // Update the event in globalData as well
      globalData
        .findOneAndUpdate(
          { eventName: eventName },
          req.body,
          { new: true }
        )
        .then((updatedEvent) => {
          if (!updatedEvent) {
            return res.status(404).send('Event not found in globalData');
          }
          res.send('Updated Data Successfully');
        })
        .catch((err) => {
          console.log(err);
          res.status(500).send('Internal Server Error');
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
};

module.exports = editproposal;
