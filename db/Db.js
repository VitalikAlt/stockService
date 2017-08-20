const mongoose = require('mongoose');
const searches = require('./models/searches/query');

class Db {
    static connect(url) {
        mongoose.connect(url);
    }

    static get searches() {
        return searches;
    }
}

module.exports = Db;