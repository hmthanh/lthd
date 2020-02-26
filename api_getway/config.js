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
  BANKING_CODE: process.env.BANKING_CODE,
  PW_SEED: +process.env.PW_SEED,
  TIME_OUT_TOKEN: +process.env.TIME_OUT_TOKEN,
  SECRET_KEY_TOKEN: process.env.SECRET_KEY_TOKEN,
  LENGTH_REFREST_TOKEN: process.env.LENGTH_REFREST_TOKEN,
  SECRET_TOKEN: process.env.SECRET_TOKEN,
  EXPIRES_OTP: process.env.EXPIRES_OTP,

  MAILER_PORT:  process.env.MAILER_PORT,
};