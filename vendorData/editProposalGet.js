const vendorModel = require('../model/vendorModel');
const editProposal =(req,res)=>{
    const contact = req.params.contact;
    vendorModel.findOne({contact: contact}).then((vendor)=>{
        res.send(vendor.vendorSelections[0]);
    }).catch((err)=>{
        console.log(err);
    })
}
module.exports = editProposal