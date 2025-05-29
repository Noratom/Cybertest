const PhishingScan = require('../models/PhishingScan');

// A mock scan function (replace with real logic or 3rd party API)
const checkPhishing = (type, value) => {
  // Simple example logic
  if (value.includes('fraud') || value.includes('scam')) return 'fraudulent';
  return 'legitimate';
};

exports.scanPhishing = async (req, res) => {
  try {
    const { scanType, valueToScan } = req.body;
    const userId = req.user.id;

    const result = checkPhishing(scanType, valueToScan);

    const scanRecord = new PhishingScan({
      userId,
      scanType,
      valueToScan,
      result
    });

    await scanRecord.save();

    res.json({ result, scanRecord });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getScans = async (req, res) => {
  try {
    const scans = await PhishingScan.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(scans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
