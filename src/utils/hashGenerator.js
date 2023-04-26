const { hash } = require('bcrypt');

const hashGenerator = async (password) => {
  const hashData = hash(password, 10);
  return hashData;
};

module.exports = { hashGenerator };
