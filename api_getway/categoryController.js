var express = require('express'),
    moment = require('moment'),
    low = require('lowdb'),
    fileSync = require('lowdb/adapters/FileSync');

var events = require('./events');
var broadcastAll = require('./ws').broadcastAll;

var adapter = new fileSync('./db.json');
var db = low(adapter);

var router = express.Router();

router.get('/', (req, res) => {
    var ts = 0;
    if (req.query.ts) {
        ts = +req.query.ts;
    }

    var categories = db.get('categories').filter(c => c.iat >= ts);
    var return_ts = moment().unix();
    res.json({
        return_ts,
        categories
    });
})

router.get('/lp', (req, res) => {
    var ts = 0;
    if (req.query.ts) {
        ts = +req.query.ts;
    }

    var loop = 0;
    var fn = () => {
        var categories = db.get('categories').filter(c => c.iat >= ts);
        var return_ts = moment().unix();
        if (categories.size() > 0) {
            res.json({
                return_ts,
                categories
            });
        } else {
            loop++;
            console.log(`loop: ${loop}`);
            if (loop < 4) {
                setTimeout(fn, 2500);
            } else {
                res.statusCode = 204;
                res.end('no data');
            }
        }
    }

    fn();
})

router.post('/', (req, res) => {
    var c = {
        name: req.body.name,
        iat: moment().unix()
    }

    db.get('categories').push(c).write();

    res.statusCode = 201;
    res.json({
        msg: 'added'
    });

    // sse
    events.publishCategoryAdded(c);

    // ws
    var json = JSON.stringify(c);
    broadcastAll(json);
})

module.exports = router;