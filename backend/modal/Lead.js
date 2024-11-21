const mongoose = require('mongoose');

const leadSchema = new mongoose.Schema({
  leadName: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String },
  leadSource: { type: String },
  nextFollowUpDate: { type: Date, required: true },
  nextFollowUpTime: { type: String, required: true },
  status: { type: String },
  purchaseHistory: { type: [String], default: [] }, 
  medicalNeeds: { type: String },
  assignedTo: { type: String, required: true },
  address: { type: String, required: true }
});

module.exports = mongoose.model('Lead', leadSchema);
