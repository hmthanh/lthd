const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
require('express-async-errors');
const config = require('./config');

const { Pool, Client } = require('pg')
console.log(config)
const pool = new Pool({
  user:  config.DB_USER,
  host: config.DB_HOST,
  database: config.DB_BANKING_NAME,
  password: config.DB_PASSWORD,
  port: config.DB_PORT
})

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  console.log(`Your port is ${config.EXPOSE_PORT}`); 
  pool.query('SELECT NOW()', (err, res) => {
    console.log(err, res)
    pool.end()
  })
  res.json({
    msg: 'hello from nodejs express api',
  });
})


const PORT = config.EXPOSE_PORT;

app.listen(PORT, () => {
  console.log(`API is running at http://localhost:${PORT}`);
})