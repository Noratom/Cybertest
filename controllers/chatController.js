const ChatMessage = require('../models/ChatMessage');
const User = require('../models/User');

exports.sendMessage = async (req, res) => {
  try {
    const userId = req.user.id;
    const { message } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const chatMessage = new ChatMessage({
      userId,
      username: user.fullName || user.email,
      message
    });

    await chatMessage.save();
    res.status(201).json(chatMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const messages = await ChatMessage.find().sort({ createdAt: 1 }).limit(100);
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
