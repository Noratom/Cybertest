// Description: Middleware to authenticate users using JWT tokens
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token.' });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      console.error("JWT_SECRET is undefined");
      return res.status(500).json({ message: 'Server misconfiguration: JWT_SECRET not set' });
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification failed:", err.message);
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = auth;
