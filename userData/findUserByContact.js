const userModel = require('../model/userModel');
const findUserByContact = (req,res)=>{
    const contact = req.params.contact;
  
    userModel.findOne({contact: contact })
      .then(user => {
        if (!user) {
          res.status(404).send('User not found');
          return;
        }
        res.send(user);
      })
      .catch(err => {
        res.status(500).send('Internal Server Error');
      });
}
module.exports = findUserByContact