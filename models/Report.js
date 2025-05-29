const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  fullName: String,
  email: String,
  phone: String,
  state: String,
  city: String,
  typeOfCybercrime: String,
  description: String,
  financialLoss: Number,
  emotionalImpact: String,
  dateOfIncident: Date,
  timeOfIncident: String,
  urlsInvolved: [String],
  previousIncidents: String,
  stepsTakenPostIncident: String,
  screenshots: [Buffer], // optional or store as URLs if uploaded elsewhere
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Report', reportSchema);
