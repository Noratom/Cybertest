const express = require('express');
const { updateProfile } = require('../controllers/profileController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.put('/update', auth, updateProfile);

module.exports = router;
