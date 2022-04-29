var PUBLISHERS = {};

module.exports.getPublisherList = function () {
    return PUBLISHERS;
}

module.exports.hasPublisher = function (uid) {
    //TODO:
}

module.exports.add = function (ws) {
    PUBLISHERS[ws.id] = ws;
    console.log("pulisher id %s has been added to the publishers list", ws.id);
}

module.exports.removebyId = function (id) {
    delete PUBLISHERS[id];
    console.log("publisher id %s has been removed from the publisher list", id);
}

module.exports.getById = function (id) {
    return PUBLISHERS[id];
}

module.exports.broadcast = function (id, message) {
    for (let i in PUBLISHERS) {
        if (i != id) {
            PUBLISHERS[i].send(message);
        }
    }
}