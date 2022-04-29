var CLIENTS = {};
var WS_ID_FOR_CLIENTS = {};

module.exports.addWebSocketIdFoClient = (auth, uid) => {
    if(!WS_ID_FOR_CLIENTS[uid]) {
        WS_ID_FOR_CLIENTS[uid] = this.getNameByKey(auth).getName();
        console.log('client appended to id: %s.%s', WS_ID_FOR_CLIENTS[uid], uid);   
    } 
}

module.exports.removeWebSocketIdForClient = (uid) => {
    delete WS_ID_FOR_CLIENTS[uid];
}
module.exports.removeAllWebSocketIdsForClient = (clientName) => {   
    for(id in WS_ID_FOR_CLIENTS){
        if(WS_ID_FOR_CLIENTS[id] == clientName)
            delete WS_ID_FOR_CLIENTS[id];
    }
}
module.exports.getClientNameAssociatedToWebSocketId = (uid) => {
    return WS_ID_FOR_CLIENTS[uid];
}
module.exports.hasWebSocketIdWithClientName = (uid) => {
    if(WS_ID_FOR_CLIENTS[uid])
        return true
    
    return false;
}

module.exports.getClientList = function () {
    return CLIENTS;
}

module.exports.hasClient = function (name) {
    if (CLIENTS[name]) {
        return true;
    }
    return false;
}

module.exports.add = function (client) {
    CLIENTS[client.getName()] = client;
    console.log("client %s has been added to the clients list", client.getName());
}

module.exports.removebyName = function (name) {
    delete CLIENTS[name];
    console.log("client %s has been removed from the clients list", name);
}

module.exports.getByName = function (name) {
    return CLIENTS[name];
}

module.exports.getNameByKey = function (key) {
    for (let i in CLIENTS) {
        if (CLIENTS[i].getKey() == key) {
            return CLIENTS[i];
        }
    }
    return "";
}

module.exports.validKey = function (key) {
    let valid = false;
    for (let i in CLIENTS) {
        if (CLIENTS[i].getKey() == key) {
            valid = true;
        }
    }
    return valid;
}
