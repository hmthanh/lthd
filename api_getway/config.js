const dotenv = require('dotenv');
dotenv.config();
const {totp} = require('otplib');
totp.options = {
  digits: 6,
  epoch: Date.now(),
  step: 30,
  window: 1,
};

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
  SECRET_RSA: process.env.SECRET_RSA,
  SECRET_PGP: process.env.SECRET_PGP,
  OTP: totp,
  MAILER_PORT: process.env.MAILER_PORT,
  PGP_URL_INFO: `${process.env.URL_PGP_API}/${process.env.PGP_INFO_PATH}`,
  PGP_URL_TRANFER: `${process.env.URL_PGP_API}/${process.env.PGP_TRANFER_PATH}`,
  PGP_PARTNERCODE: 5412,
  RSA_URL_INFO: `${process.env.URL_RSA_API}/${process.env.RSA_INFO_PATH}`,
  RSA_URL_TRANFER: `${process.env.URL_RSA_API}/${process.env.RSA_TRANFER_PATH}`,

  RSA_PARTNERCODE: 176991,
  RSA_PARTNER_SCRE: process.env.SECRET_RSA_PARTNER
};