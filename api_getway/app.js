const express = require('express');
const morgan = require('morgan');
const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const {SECRET_KEY_TOKEN} = require('./config');
require('express-async-errors');

//my packet
const config = require('./config');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());


// SSE
// app.get('/categoryAddedEventevents.js', events.subscribeCategoryAdded);

app.use('/api/ping', async (req, res) => {
  res.json({msg: 'successfully!', errCode: 0})
})

app.use('/api/auth', require('./routes/auth.route'))

app.use('/openapi/info', require('./routes/info.route'));

app.use('/openapi/plus', require('./routes/plus.route'));
app.use('/openapi/minus', require('./routes/minus.route'));

const verifyAccessToken = (req, res, next) => {
  // console.log(req.body);
  // console.log("headers", req.headers['x-access-token']);
  const token = req.headers['x-access-token'];
  if (token) {
    jwt.verify(token, SECRET_KEY_TOKEN, function (err, payload) {
      if (err) throw createError(403, err);
      // console.log(payload);
      req.payload = payload
      next();
    });
  } else {
    throw createError(401, 'NO_TOKEN');
  }
}

app.use('/api/accounts', require('./routes/account.route'));
// app.use('/api/users', require('./routes/user.route'));

app.use('/api/refresh', require('./routes/refresh.route'));

app.use('/api/receiver', require('./routes/receiver.route'));

app.use('/api/transfer', verifyAccessToken, require('./routes/transfer.route'));

app.use('/api/associate', verifyAccessToken, require('./routes/associate.route'));

app.use('/api/debt', verifyAccessToken, require('./routes/debt.route'));

app.use('/api/notify', require('./routes/notify.route'));

app.use('/api/remind', require('./routes/remind.route'));


app.use('/api/recharge', verifyAccessToken, require('./routes/recharge.route'));

app.use('/api/history', verifyAccessToken, require('./routes/history.route'));
app.use('/api/history-user', verifyAccessToken, require('./routes/historyUser.route'));

app.use('/api/employee', require('./routes/employee.route'));

app.use('/api/admin', verifyAccessToken, require('./routes/admin.route'));

// WS
require('./ws');

// app.use('/api/notify', require('./controller/notification.controller'))

app.use((req, res, next) => {
  throw createError(404, 'Resource not found.');
});

app.use(function (err, req, res, next) {
  if (typeof err.status === 'undefined' || err.status === 500) {
    console.error(err.stack);
    res.status(500).send('View error log on console.');
  } else {
    res.status(err.status).send(err);
  }
});

// mailController.sentMail()

app.listen(config.EXPOSE_PORT, () => {
  console.log(`API running on PORT ${config.EXPOSE_PORT}`);
});