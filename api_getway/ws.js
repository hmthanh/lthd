const WebSocket = require('ws');
const config = require('./config');
const SOCKET_PORT = process.env.SOCKET_PORT || 40510;
let socketServer = null

if (!socketServer) {
    socketServer = new WebSocket.Server({
        port: SOCKET_PORT
    });

    socketServer.on('connection', ws => {
        ws.on('message', msg => {
          console.log(`receive: ${msg}`);
        });
    });
    console.log(`WS running on port ${SOCKET_PORT}`);
}

var broadcastAll = msg => {
    for (var c of socketServer.clients) {
        console.log(c.readyState);
        if (c.readyState === WebSocket.OPEN) {
            c.send(msg);
        }
    }
}

module.exports = {
    socketServer,
    broadcastAll
}