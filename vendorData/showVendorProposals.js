const mongoose = require('mongoose');
const model = require('../model/vendorCreateProposalmodel');
const showVendorPropoals =(req,res)=>{
    model.find().then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err);
    })
}
module.exports = showVendorPropoals