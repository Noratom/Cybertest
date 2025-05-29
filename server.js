const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const reportRoutes = require('./routes/report');
const phishingRoutes = require('./routes/phishing');
const chatRoutes = require('./routes/chat');
const newsRoutes = require('./routes/news');
const dotenv = require('dotenv');
dotenv.config();



const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/phishing', phishingRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/news', newsRoutes);

mongoose.connect('mongodb://localhost:27017/cyberguard')

  .then(() => app.listen(5000, () => console.log('Server running on port 5000')))
  .catch(err => console.log(err));

 console.log('JWT_SECRET:', process.env.JWT_SECRET);

