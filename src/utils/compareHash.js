const { compare } = require('bcrypt');

const compareHash = async (password, hash) => {
  return await compare(password, hash);
};

module.exports = { compareHash };
