const env = require('../config/env');
const { sign } = require('jsonwebtoken');
const ms = require('ms');

const tokenGenerator = (id) => {
  const token = sign({ id }, env.secret_key, { expiresIn: ms('1y') });
  return token;
};
module.exports = { tokenGenerator };
