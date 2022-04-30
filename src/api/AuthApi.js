var Client = require('../entities/Client');
var clientList = require('../list/ClientList');

const { v4: uuidv4 } = require('uuid');

module.exports.addClient = function (req, res) {
    let data = JSON.parse(JSON.stringify(req.body));

    let name = data.clientName;
    if (name != '') {
        let client = new Client(data.clientName, uuidv4());
        clientList.add(client);
    }
}

module.exports.deleteClient = function (req, res) {
    clientList.removeByName(req.query.name);
}

module.exports.validKey = function (key) {
    return clientList.validKey(key);
}