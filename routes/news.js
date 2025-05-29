const express = require('express');
const { getNews, addNews } = require('../controllers/newsController');
const auth = require('../middlewares/authMiddleware');
const router = express.Router();

router.get('/latest', getNews);
router.post('/add', auth, addNews); // Only admin can add news (for simplicity, add auth check later)

module.exports = router;
