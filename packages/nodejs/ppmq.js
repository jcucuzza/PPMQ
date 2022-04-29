/*
    ppMQ client version 0.0.3
*/

const WebSocket = require('ws');
var queue = {};

const SUBSCRIBER = 'subscriber';
const PUBLISHER = 'publisher';

const OPEN = 'open';
const PULLED = 'pulled';
const SENT = 'sent';

var connection = null;

var url = '';
var auth = '';

var connected = false;

var ppMQ = {};

ppMQ.use = function(session){
    url = session.url;
    auth = session.auth;
    if(session.topic){
        for(let t in session.topic){
            queue[t] = {msg: null, status: OPEN }
        }
    }
}

ppMQ.connect = function(){
    startWebsocket();
}

ppMQ.push = function(topic, msg){
    var pushed = true;
    if(connected){
        connection.send(JSON.stringify({
            'auth': auth,
            'id': Math.random().toString().replace("\.", "") + Date.now(),
            'type': PUBLISHER,
            'topic': topic,
            'message': msg
        }));

    } else {
        pushed = false;
        console.log('cannot push to ppMQ');

    }
    return pushed;
}

ppMQ.pull = function(topic) {
    let message = undefined;
    if(connected){
        if(topic != undefined){
            if(queue[topic] != undefined && queue[topic].status == PULLED){
                message = queue[topic].msg;
                queue[topic] = {msg: null, status: OPEN}
            } else if (queue[topic] == undefined){
                queue[topic] = {msg: null, status: OPEN}
            }
        }
    } else {

        console.log('cannot pull from ppMQ');
    }
    return message;
}


function startWebsocket() {
    connection = new WebSocket(url);
    connection.onopen = () => {
        console.log("connection established with ppMQ server");
        for(let t in queue){
            queue[t] = {msg: null, status: OPEN }
        }
        connected = true;
    }

    connection.onerror = (error) => {
        error = true;
        console.log(`ppMQ error: ${JSON.stringify(error)}`)
    }

    connection.onmessage = (e) => {
        var data = JSON.parse(e.data);
        if(data.msg != undefined && data.topic != undefined){
            queue[data.topic] = {
                msg: data.msg,
                status: PULLED
            };
        }
    }

    connection.onclose = (e) => {
        connected = false;
        console.log('connection lost to ppMQ server');
        connection = null;
        setTimeout(startWebsocket, 5000);
    }
}



setInterval(()=>{
    if(connected){
        for(let topic in queue){
            if(queue[topic].status == OPEN){
                connection.send(JSON.stringify({
                    'auth': auth, 
                    'type': SUBSCRIBER, 
                    'topic': topic
                }));
                queue[topic].status = SENT;
            }
        }
    }
});

module.exports = ppMQ