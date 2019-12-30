var express = require('express'),
    bodyParser = require('body-parser'),
    morgan = require('morgan'),
    cors = require('cors');

var events = require('./events');
var categoryCtrl = require('./categoryController');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

// SSE
app.get('/categoryAddedEvent', events.subscribeCategoryAdded);

// WS
require('./ws');

app.use('/categories', categoryCtrl);

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API running on PORT ${PORT}`);
});