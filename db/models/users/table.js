const mongoose    = require('mongoose');

const users = mongoose.Schema;

const Users = new users({
    login: { type: String, required: true },
    password: { type: String, required: true}
});

const UsersModel = mongoose.model('Users', Users);

module.exports = UsersModel;