const express = require('express');
const { submitReport, getReports } = require('../controllers/reportController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/submit', auth, submitReport);
router.get('/all', auth, getReports);

module.exports = router;
