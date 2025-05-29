const News = require('../models/News');

exports.getNews = async (req, res) => {
  try {
    const news = await News.find().sort({ publishedAt: -1 }).limit(20);
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addNews = async (req, res) => {
  try {
    const newsData = req.body;
    const news = new News(newsData);
    await news.save();
    res.status(201).json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
