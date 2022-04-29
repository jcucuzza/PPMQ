var clientList = require('../list/ClientList');
var Topic = require('../entities/Topic');

var TOPICS = {};

module.exports.getTopicList = function () {
    return TOPICS;
}

module.exports.topicExist = function (topic) {
    if (TOPICS[topic]) {
        return true;
    }
    return false;
}

module.exports.add = function (topic) {
    TOPICS[topic] = new Topic(topic);
    console.log("topic %s has been added to the topic list", topic);
}

module.exports.remove = function (topic) {
    delete TOPICS[topic];
    console.log("topic %s has been removed from the topic list", topic);
}

module.exports.getTopic = function (topic) {
    return TOPICS[topic];
}

module.exports.validKey = function (key) {
    let valid = false;
    for (let i in CLIENTS) {
        if (TOPICS[i].getKey() == key) {
            valid = true;
        }
    }
    return valid;
}
