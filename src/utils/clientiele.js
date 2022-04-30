var fs = require('fs');
const { dirname } = require('path');
const csv = require('csv-parser');

var csvWriter = require('csv-write-stream');
var writer = csvWriter({sendHeaders: false}); //Instantiate var

var Client = require('../entities/Client');
var clientList = require('../list/ClientList');

const APP_DIR = dirname(require.main.filename).replace("bin","");

const CLIENTELE_FILE = "clientele.csv";
let FILE = APP_DIR + CLIENTELE_FILE;

module.exports.loadClientele = function(){
    fs.open(FILE ,'r',function(err, fd){
        if (err) {
            writer = csvWriter({sendHeaders: false});
            writer.pipe(fs.createWriteStream(FILE));
            writer.write({
                header1: 'CLIENT',
                header2: 'AUTH'
            });
            writer.end();
            console.log("File " + CLIENTELE_FILE + " did not exist and was created.");

        } else {
            fs.createReadStream(FILE)
            .pipe(csv())
            .on('data', (data) => {
                clientList.add(new Client(data.CLIENT, data.AUTH))
            })
        }
    });
}

module.exports.add = function (client){
    fs.readFile(FILE, 'utf8', function(err, data) {
        if (err) {
            console.log(err);
        } else {
            if(!data.includes("\n" + client.getName()+",")) {
                writer = csvWriter({sendHeaders: false});
                writer.pipe(fs.createWriteStream(FILE, {flags: 'a'}));
                writer.write({
                    header1: client.getName(),
                    header2: client.getKey()
                });
                writer.end();   
            }
        }
    });
}

module.exports.remove = function(client){
    fs.readFile(FILE, 'utf8', function(err, data) {
        if (err) {
            writer = csvWriter({sendHeaders: false});
            writer.pipe(fs.createWriteStream(FILE));
            writer.write({
                header1: 'CLIENT',
                header2: 'AUTH'
            });
            writer.end();
            console.log("File " + CLIENTELE_FILE + " did not exist and was created.");
        }
        let linesExceptFirst = data.split('\n').slice(1);
        //let linesArr = linesExceptFirst.map(line=> line.split(','));
        let lines = linesExceptFirst.map(line=> line.split(','));
        let output = "CLIENT,AUTH\n";
        for(i in lines) {
            if(lines[i].toString().split(',')[0] == client){
            } else if(lines[i].toString() == ''){
            }else{
                output += lines[i][0] + "," + lines[i][1] + "\n";
            }
        }
        fs.writeFileSync(FILE, output)
    });
}
