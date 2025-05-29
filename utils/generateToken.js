const jwt = require('jsonwebtoken');
module.exports = (userId) => {
  return jwt.sign({ id: userId }, 'secretKey', { expiresIn: '7d' });
};
