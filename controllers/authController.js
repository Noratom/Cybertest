const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ fullName, email, password: hashedPassword });
    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: {
        fullName: user.fullName,
        email: user.email,
        twoFAEnabled: user.twoFAEnabled || false,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password, twoFAPin } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: 'Invalid credentials' });

    if (user.twoFAEnabled) {
      if (!twoFAPin) return res.status(401).json({ message: '2FA PIN required' });

      const pinMatch = await bcrypt.compare(twoFAPin, user.twoFAPin || '');
      if (!pinMatch) return res.status(401).json({ message: 'Invalid 2FA PIN' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        fullName: user.fullName,
        email: user.email,
        twoFAEnabled: user.twoFAEnabled,
      },
    });
  } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const {
      phoneNumber,
      address,
      nationality,
      gender,
      dateOfBirth,
      licenseNumber,
      issueDate,
      expiryDate,
      twoFAEnabled,
      twoFAPin,
    } = req.body;

    const updates = {
      phoneNumber,
      address,
      nationality,
      gender,
      dateOfBirth,
      licenseNumber,
      issueDate,
      expiryDate,
      twoFAEnabled,
    };

    if (twoFAEnabled && twoFAPin) {
      updates.twoFAPin = await bcrypt.hash(twoFAPin, 8);
    }

    const user = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
    res.status(200).json({ message: 'Profile saved successfully', user });
  } catch (err) {
    res.status(500).json({ message: 'Profile update failed', error: err.message });
  }
};
