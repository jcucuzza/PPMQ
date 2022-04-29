var socketList = require('../list/SocketList');
var socketRouterOnMessage = require('../routers/SocketRouterOnMessage');

var ConnectionState = require('../entities/ConnectionState');

module.exports = function (ws) {

    let uid = ws.id;

    socketList.add(ws);

    let connectionState = new ConnectionState(true, uid);
    ws.send(JSON.stringify(connectionState));

    ws.on('message', message => {
        //console.log('%s %s', uid, message.toString());
        if (!socketRouterOnMessage(uid, message)) {
            ws.close();
        }
    })

    ws.on("close", function () {
        socketList.removebyId(uid);
    })
}