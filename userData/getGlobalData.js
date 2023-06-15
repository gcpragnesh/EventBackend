const globalModel = require('../model/globalModel')
const getglobaldata=(req,res)=>{
    globalModel.find().then((globalData)=>{
        res.send(globalData);
    }).catch((err)=>{
        console.log(err);
    })
}
module.exports = getglobaldata