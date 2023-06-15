const mongoose = require('mongoose');

const globalmodelSchema = mongoose.Schema({
  vendorName: {
    type:String,
    required: true
  },
  vendorContact: {
    type:String,
    required:true
  },
  eventName: {
    type: String,
    required: true
  },
  placeOfEvent: {
    type: String,
    required: true
  },
  proposalType: {
    type: String,
    required: true
  },
  eventType: {
    type: String,
    required: true
  },
  budget: {
    type: String,
    required: true
  },
  from: {
    type: Date,
    required: true
  },
  to: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  images: {
    type: Array,
    required: true
  },
  foodPreferences: {
    type: String,
    required: true
  },
  events: {
    type: String,
    required: true
  },
  vendorSelections: {
    type: [Object],
    default: []
  }
});

module.exports = mongoose.model('globalmodels', globalmodelSchema);
