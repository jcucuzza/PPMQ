var clientList = require('../list/ClientList');
var SOCKETS = {};

module.exports.getSocketList = function () {
    return SOCKETS;
}

module.exports.exist = function (id){
    return SOCKETS[id];
}

module.exports.add = function (ws) {
    SOCKETS[ws.id] = ws;
    console.log("a client id %s has been added to the sockets list", ws.id);
}

module.exports.removebyId = function (id) {
    SOCKETS[id].close();
    delete SOCKETS[id];
    let clientNameId = '';
    if(clientList.hasWebSocketIdWithClientName(id)){
        clientNameId += clientList.getClientNameAssociatedToWebSocketId(id) + '.';
    }
    clientNameId += id;
    console.log("client id %s has been removed from the socket list", clientNameId);
}

module.exports.getById = function (id) {
    return SOCKETS[id];
}

module.exports.sendToSubscriber = function(id, topic, message){
    SOCKETS[id].send("{\"uid\":\"" + id + "\",\"topic\":" + JSON.stringify(topic) + ",\"msg\":" + JSON.stringify(message) + "}");
}
module.exports.broadcast = function (id, message) {
    for (let i in SOCKETS) {
        if (i != id) {
            SOCKETS[i].send("{\"uid\":\"" + id + "\",\"msg\":" + JSON.stringify(message) + "}");
        }
    }
}