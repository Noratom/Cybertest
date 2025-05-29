const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: String,
  summary: String,
  content: String,
  publishedAt: Date,
  sourceUrl: String,
  views: { type: Number, default: 0 }
});

module.exports = mongoose.model('News', newsSchema);
