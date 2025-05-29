const express = require('express');
const { scanPhishing, getScans } = require('../controllers/phishingController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/scan', auth, scanPhishing);
router.get('/history', auth, getScans);


module.exports = router;
