const mongoose = require('mongoose');

const scamReportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['email', 'website'], required: true },
  content: { type: String, required: true },
  reportDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'safe', 'suspicious', 'malicious'], default: 'pending' },
  scanResult: { type: String },
});

module.exports = mongoose.model('ScamReport', scamReportSchema);
