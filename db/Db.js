const mongoose = require('mongoose');
const users = require('./models/users/query');
const stocks = require('./models/stocks/query');
const reserves = require('./models/reserves/query');

class Db {
    static connect(url) {
        mongoose.connect(url);
    }

    static get users() {
        return users;
    }

    static get stocks() {
        return stocks;
    }

    static get reserves() {
        return reserves;
    }
}

module.exports = Db;