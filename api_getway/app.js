const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const config = require('./config');
require('express-async-errors');


const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    msg: 'hello from nodejs express api',
  });
})

// app.use('/api/auth', require('./routes/auth.route'));
// app.use('/api/users', require('./routes/user.route'));

// function verifyAccessToken(req, res, next) {
//   // console.log(req.headers);
//   const token = req.headers['x-access-token'];
//   if (token) {
//     jwt.verify(token, 'shhhhh', function (err, payload) {
//       if (err) throw createError(403, err);

//       console.log(payload);
//       next();
//     });
//   } else {
//     throw createError(401, 'NO_TOKEN');
//   }
// }


app.use('/accounts', require('./routes/account.route'))


app.use((req, res, next) => {
  throw createError(404, 'Resource not found.');
})

app.use(function (err, req, res, next) {
  if (typeof err.status === 'undefined' || err.status === 500) {
    console.error(err.stack);
    res.status(500).send('View error log on console.');
  } else {
    res.status(err.status).send(err);
  }
})

const PORT = config.EXPOSE_PORT;

app.listen(PORT, () => {
  console.log(`API is running at http://localhost:${PORT}`);
})