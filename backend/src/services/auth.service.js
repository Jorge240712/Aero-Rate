const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET no está definido');
  }

  const payload = {
    id: user.id,
    email: user.email,
    role: user.role || 'user'
  };

  return jwt.sign(payload, secret, {
    expiresIn: '24h'
  });
};

module.exports = {
  generateToken
};