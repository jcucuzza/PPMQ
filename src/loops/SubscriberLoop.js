var clientList = require('../list/ClientList');
var socketList = require('../list/SocketList');
var topicList = require('../list/TopicList');

module.exports.startLoop = function () {
    setInterval(function () {
        for(let topicName in topicList.getTopicList()){
            var topic = topicList.getTopic(topicName);
            var subscribers = topic.getSubscribers();
            for(let s in subscribers){
                var client = clientList.getByName(subscribers[s].name);
                if(subscribers[s].status == 'standby'){
                    let msg = topic.getMessageForClient(client);
                    if(msg){
                        socketList.sendToSubscriber(subscribers[s].uid, topicName, msg);
                        topic.setClientSubscriptionToReady(client);
                    } 
                }
            }
        }
    });
}