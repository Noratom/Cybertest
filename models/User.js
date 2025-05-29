const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { type: String, required: true },
  phoneNumber: { type: String },
  address: { type: String },
  nationality: { type: String },
  gender: { type: String },
  dateOfBirth: { type: Date },
  licenseNumber: { type: String },
  issueDate: { type: Date },
  expiryDate: { type: Date },
  twoFAEnabled: { type: Boolean, default: false },
  twoFAPin: { type: String }, // stored as hashed PIN
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
