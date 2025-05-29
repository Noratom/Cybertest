const Report = require('../models/Report');

exports.submitReport = async (req, res) => {
  try {
    const userId = req.user.id;
    const data = { ...req.body, userId };
    const report = new Report(data);
    await report.save();
    res.status(201).json({ message: 'Report submitted successfully', report });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
