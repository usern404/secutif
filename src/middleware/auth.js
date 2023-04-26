const { verify } = require('jsonwebtoken');
const env = require('../config/env');

const auth = (req, res, next) => {
  try {
    const header = req.headers.authorization;
    const token = header.replace('Bearer ', '');
    const decoded = verify(token, env.secret_key);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.json({ success: 0, message: 'Auth failed' });
  }
};

module.exports = { auth };
