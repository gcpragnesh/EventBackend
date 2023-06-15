const globalData = require('../model/globalModel');
const vendorData = require('../model/vendorModel');

const deleteEvent = (req, res) => {
  const eventName = req.params.eventname;
  const contact = req.params.contact;
  console.log(eventName, contact);
  vendorData.find().then(async (vendors) => {
      const vendor1 = await vendors.find((vendor) => vendor.contact === contact);
      const vSel = vendor1.vendorSelections;
      const eventIndex = vSel.findIndex((obj) => obj.eventName === eventName);
      if (eventIndex === -1) {
        return res.status(404).send('Event not found');
      }
      vSel.splice(eventIndex, 1); // Remove the event object at the found index

      // Save the updated vendor data
      vendor1.save();

      // Remove event from global data as well (if applicable)
      globalData.findOneAndDelete({ eventName: eventName }).then(() => {
        console.log('Deleted from global also');
      });
      res.status(200).send('Event deleted successfully');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
};

module.exports = deleteEvent;
