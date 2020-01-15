const mysql = require('mysql');
const { promisify } = require('util');
const config = require('../config');

const pool = mysql.createPool({
  connectionLimit: 100,
  host: config.DB_HOST,
  port: config.DB_PORT,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_BANKING_NAME
});

const pool_query = promisify(pool.query).bind(pool);

module.exports = {
  load: sql => pool_query(sql),
  add: (entity, tableName) => pool_query(`insert into ${tableName} set ?`, entity),
  del: (condition, tableName) => pool_query(`delete from ${tableName} where ?`, condition),
  patch: (entity, condition, tableName) => pool_query(`update ${tableName} set ? where ?`, [entity, condition]),
};
