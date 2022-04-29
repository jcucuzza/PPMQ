class Topic {

    constructor(topic) {
        this.topic = topic;
        this.publishers = {};
        this.subscribers = {};
        this.messages = {};
    }

    getTopic() {
        return this.topic;
    }

    getSubscribers(){
        return this.subscribers;
    }
    registerClientAsPublisher(client,uid) {
        if(!this.publishers[client.getKey()]){
            this.publishers[client.getKey()] = {
                uid: uid,
                name: client.getName()
            };
            console.log("publisher registered : " +  client.getName());
        }
    }

    removeClientAsPublisher(client) {
        delete this.publishers[client.getKey()];
    }

    registerClientAsSubscriber(client, uid) {
        if(!this.subscribers[client.getKey()]){
            this.subscribers[client.getKey()] = {
                uid: uid,
                name: client.getName(),
                status: 'ready'
            };
            console.log("subscriber registered : " +  client.getName());
        } else {
            this.subscribers[client.getKey()].uid = uid;
        }
    }

    getClientAsSubscriber(client){
        return this.subscribers[client];
    }
    
    removeClientAsSubscriber(client) {
        delete this.subscribers[client];
    }

    setClientSubscriptionToStandby(client){
        this.subscribers[client.getKey()].status = 'standby';
    }

    setClientSubscriptionToReady(client){
        this.subscribers[client.getKey()].status = 'ready';
    }
    addMessage(id, message) {
        let subscribers = this.subscribers;
        if (Object.keys(subscribers).length !== 0) {
            this.messages[id] = {
                'id': id,
                'message': JSON.stringify(message)
            }
            let consumers = {};
            for (let clientKey in subscribers) {
                consumers[clientKey] = subscribers[clientKey];
            }
            this.messages[id]['consume'] = consumers;
            //console.log(this);
        }
    }

    getMessageForClient(client) {
        let clientKey = client.getKey();
        let message2return = '';
        let messages = this.messages;
        for (let id in messages) {
            let storedMessage = messages[id];
            if (storedMessage.consume[clientKey]) {
                message2return = storedMessage.message;
                delete storedMessage.consume[clientKey];
                if (Object.keys(storedMessage.consume).length === 0) {
                    delete messages[id];
                }
                break;
            }
        }
        return message2return;
    }
}

module.exports = Topic;