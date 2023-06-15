const globalModel = require('../model/globalModel')
const getGlobalDataByEvNameNContact =(req, res) => {
    const eventName = req.params.eventname;
    const contact = req.params.contact;
  console.log(contact,eventName)
    globalModel.find({ vendorContact: contact, eventName: eventName })
      .then((data) => {
        if (data.length === 0) {
          return res.status(404).send('Data not found');
        }
        res.send(data[0]);
      })
      .catch((error) => {
        console.error(error);
        res.status(500).send('Internal Server Error');
      });
  };
  module.exports = getGlobalDataByEvNameNContact