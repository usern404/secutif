require('dotenv').config();

const env = {
  port: process.env.PORT,
  secret_key: process.env.JWT,
};

module.exports = env;