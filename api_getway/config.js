const dotenv = require('dotenv');
dotenv.config();
module.exports = {
  HOST_NAME: process.env.HOST_NAME,

  EXPOSE_PORT: process.env.EXPOSE_PORT,

  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_BANKING_NAME: process.env.DB_BANKING_NAME,
  BANKING_NAME_CODE: process.env.BANKING_NAME_CODE,

  MAILER_PORT:  process.env.MAILER_PORT,
};