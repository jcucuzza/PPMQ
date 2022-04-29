/**
 *  @author Jonathan Cucuzza
 *  @date 2021-31-01
 */
var authApi = require('../api/AuthApi');

var PublisherController = require('../controllers/PublisherController');
var SubscriberController = require('../controllers/SubscriberController');

//(1) check the type of message: authentication, publisher, subscriber
//(2) route the message to appropriate process
module.exports = function (uid, message) {

    let data = JSON.parse(message);
    if (typeof data != 'undefined') {

        if (authApi.validKey(data.auth)) {
            if (data.type == 'publisher') {
                PublisherController(uid, data);
            }
            else if (data.type == 'subscriber') {
                SubscriberController(uid, data);
            } else {
                console.log("no data type : %s", data);
            }

        }
        else {
            console.log('invalid key %s', message);
            return false;
        }

    }

    return true;
}