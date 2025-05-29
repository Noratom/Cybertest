const express = require('express');
const { body } = require('express-validator');
const { register, login, updateProfile } = require('../controllers/authController');
const auth = require('../middlewares/authMiddleware');
const validate = require('../middlewares/validate');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Changed from PUT to POST
router.post('/profile', auth, [
  body('phoneNumber').optional().isMobilePhone(),
  body('twoFAPin').optional().isLength({ min: 4, max: 6 }),
], validate, updateProfile);

module.exports = router;
