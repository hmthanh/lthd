const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const cors = require('cors');
require('express-async-errors');

//my packet
const config = require('./config');



var app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// SSE
// app.get('/categoryAddedEvent', events.subscribeCategoryAdded);

app.use('/api/auth', require('./routes/auth.route'));
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


app.use('/api/accounts', require('./routes/account.route'))


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

app.listen(config.EXPOSE_PORT, () => {
    console.log(`API running on PORT ${config.EXPOSE_PORT}`);
});