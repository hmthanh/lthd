var eventEmitter = require('eventemitter3');
var emitter = new eventEmitter();

var subscribeEvent = (req, res, event) => {
    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
    });

    var heartBeat = setInterval(() => {
        res.write('\n');
    }, 15000);

    var handler = data => {
        var json = JSON.stringify(data);
        res.write(`retry: 500\n`);
        res.write(`event: ${event}\n`);
        res.write(`data: ${json}\n`);
        res.write(`\n`);
    }

    emitter.on(event, handler);

    req.on('close', () => {
        clearInterval(heartBeat);
        emitter.removeListener(event, handler);
    });
}

//
// event pub-sub

var CATEGORY_ADDED = 'CATEGORY_ADDED';

var subscribeCategoryAdded = (req, res) => {
    subscribeEvent(req, res, CATEGORY_ADDED);
}

var publishCategoryAdded = categoryObj => {
    emitter.emit(CATEGORY_ADDED, categoryObj);
}

module.exports = {
    subscribeCategoryAdded,
    publishCategoryAdded
}