const mongoose = require('mongoose');
const users = require('./models/users/query');

class Db {
    static connect(url) {
        mongoose.connect(url);
    }

    static get users() {
        return users;
    }
}

module.exports = Db;