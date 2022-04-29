var topicList = require('../list/TopicList');
var clientList = require('../list/ClientList');
var socketList = require('../list/SocketList');

module.exports = function (uid, e) {

    if (!topicList.topicExist(e.topic)) {
        topicList.add(e.topic);
    }

    topic = topicList.getTopic(e.topic);
    topic.registerClientAsPublisher(clientList.getNameByKey(e.auth), uid);
    clientList.addWebSocketIdFoClient(e.auth, uid)
    topic.addMessage(e.id, e.message)
    //console.log(topic);

    //socketList.broadcast(uid, e.message);
}