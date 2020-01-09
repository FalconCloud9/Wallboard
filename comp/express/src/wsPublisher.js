
const WebSocketServer = require('ws').Server;
const wsMap = {}; // map of key to ws connection

function init() {
    const wsPort = process.env.WS_PORT;
    const wss = new WebSocketServer({ port: wsPort });

    wss.on('connection', ws => {
        const key = uuid();
        const wsConn = new WsConnection(null, ws);
        wsConn.setUpListener();
        wsConn.send({ key });
    })
}


function publish(key, data) {
    console.log("publishing :: " + key, data)
    const wsConn = wsMap[key];
    if (!wsConn) throw "no such key";
    wsConn.send(data);
}

class WsConnection {

    constructor(key, ws) {
        this.ws = ws;
        this.key = key;
    }

    setUpListener() {

        this.ws.on('close', () => {
            delete wsMap[this.key]; // remove the connection
        });

        this.ws.on('message', (message) => { // read the deparment from here
            console.log({ message })
        })
    }

    send(msg) {
        this.ws.send(msg);
    }


}

exports.init = init;
exports.publish = publish;