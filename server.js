const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const userSignup = require('./userData/singup');
const userLogin = require('./userData/login');
const vendorSignup =require('./vendorData/singup')
const vendorLogin = require('./vendorData/login')
const VendorCreateProposal = require('./vendorData/vendorCreateProposal');
const showVendorPropoals = require('./vendorData/showVendorProposals')
const vendorLoginProposal= require('./vendorData/VendorloginProposal');
const getVendorData = require('./vendorData/getVendorData');
const deleteEvent = require('./vendorData/deleteEvent');
const editproposal = require('./vendorData/editProposal');
const vendorModel = require('./model/vendorModel');
const editProposal = require('./vendorData/editProposalGet');
const userModel = require('./model/userModel');
const findUserByContact = require('./userData/findUserByContact');
const globalModel = require('./model/globalModel');
const getglobaldata = require('./userData/getGlobalData');
const getGlobalDataByEvNameNContact = require('./userData/getGlobalDataByEvNameNContact');
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.listen(3300, () => {
    console.log('Running on port 3300');
})

mongoose.connect('mongodb+srv://manohar:manohar@cluster0.nywirg5.mongodb.net/newDB').then(() => {
    console.log('mongoose connected to database')
}).catch((err) => {
    console.log(err);
})

app.get('/user', (req, res) => {
    res.send('User Server Running')
})
app.get('/vendor', (req, res) => {
    res.send('Vendor Server Running')
})

//Requests
app.post('/usersignup', userSignup)
app.post('/usersignin', userLogin)
app.post('/vendorsignup',vendorSignup)
app.post('/vendorsignin',vendorLogin);
app.get('/vendorproposals/:contact',vendorLoginProposal)
app.post('/vendorcreateproposal/:contact',VendorCreateProposal);
app.get('/vendorcreateproposal/:contact',getVendorData);
app.get('/vendor/login/home',showVendorPropoals)
app.get('/user/login/home',showVendorPropoals)
app.delete('/vendorproposals/:eventname/:contact',deleteEvent);
app.post('/vendorproposals/editproposal/:eventname/:contact',editproposal)
app.get('/vendorproposals/editproposal/:contact',editProposal)

//===================================== USER REQUESTS

app.get('/finduser/:contact',findUserByContact)
app.get('/getglobaldata',getglobaldata)
app.get('/getglobaldata/:eventname/:contact', getGlobalDataByEvNameNContact)
app.get('/updateuserselections/:eventname/:vcontact/:ucontact', (req, res) => {
    const eventName = req.params.eventname;
    const vcontact = req.params.vcontact;
    const ucontact = req.params.ucontact;
    console.log(eventName, vcontact);
  
    globalModel.find({ vendorContact: vcontact, eventName: eventName })
      .then((data) => {
        if (data.length === 0) {
          return res.status(404).send('Data not found');
        }
        console.log(data)
        userModel.findOneAndUpdate(
          { contact: ucontact },
          { $push: { vendorSelections: data[0] } }
        )
          .then((sel) => {
            res.send(sel.vendorSelections);
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
  });

app.get('/getuser/:contact',(req,res)=>{
  const contact = req.params.contact
  userModel.find().then(async(users)=>{
   const data = await users.find((user)=> user.contact=== contact);
   res.send(data.vendorSelections)
  }).catch((err)=>{
    console.log(err)
  })
})
  
  
  
  
  


