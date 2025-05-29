const mongoose = require('mongoose');

const phishingScanSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  scanType: { type: String, enum: ['email', 'url'] },
  valueToScan: String,
  result: String, // e.g. 'fraudulent', 'legitimate', 'unknown'
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PhishingScan', phishingScanSchema);
