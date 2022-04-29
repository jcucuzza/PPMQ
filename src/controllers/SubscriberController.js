var topicList = require('../list/TopicList');
var clientList = require('../list/ClientList');
var socketList = require('../list/SocketList');

module.exports = function (uid, e) {
    if (!topicList.topicExist(e.topic)) {
        topicList.add(e.topic);
    }

    let topic = topicList.getTopic(e.topic);
    let client = clientList.getNameByKey(e.auth);
    topic.registerClientAsSubscriber(client, uid);
    clientList.addWebSocketIdFoClient(e.auth, uid);
    let msg = topic.getMessageForClient(client);
    if(msg){
        socketList.sendToSubscriber(uid, e.topic, msg);
    } else {
        topic.setClientSubscriptionToStandby(client);
    }
}