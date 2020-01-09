
const WebSocketServer = require('ws').Server;
const wsMap = {}; // map of key to ws connection

function init() {
    const wsPort = process.env.WS_PORT;
    const wss = new WebSocketServer({ port: wsPort });

    wss.on('connection', ws => {
        const wsConn = new WsConnection(null, ws);
        wsConn.setUpListener();
    })
}


function publish(key, data) {
    console.log("publishing :: " + key, data)
    const wsConn = wsMap[key];
    if (!wsConn) throw "no such key";
    wsConn.send(JSON.stringify(data));
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
            const payload = JSON.parse(message);
            wsMap[payload.key] = this
            wsMap[payload.key].send("test message");
        })
    }

    send(msg) {
        try{
            this.ws.send(msg);
        }catch(err){
            console.log("rrrs",err)
        }
    }


}

exports.init = init;
exports.publish = publish;