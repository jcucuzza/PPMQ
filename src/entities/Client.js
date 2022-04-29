class Client {

    constructor(name, key) {
        this.name = name;
        this.key = key;
        this.uid = '';
    }

    getName() {
        return this.name;
    }
    setName(name) {
        this.name = name;
    }
    getKey() {
        return this.key;
    }
    setKey(key) {
        this.key = key;
    }

    getUID(){
        return this.uid;
    }
    setUID(uid){
        this.uid = uid;
    }

}

module.exports = Client;
