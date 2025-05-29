const express = require('express');
const { sendMessage, getMessages } = require('../controllers/chatController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/send', auth, sendMessage);
router.get('/messages', auth, getMessages);

module.exports = router;
