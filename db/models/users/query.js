var User = require('./table');

class SearchQuery {
    static getUser(login, pass) {
        return new Promise((res, rej) => {
            User.find({login: login, password: pass}, (err, data) => {
                return res(!!(data[0]));
            })
        });
    }

    static getUserLoginExist(login) {
        return new Promise((res, rej) => {
            User.find({login}, (err, data) => {
                return res(!!(data[0]));
            })
        });
    }

    static addUser(el) {
        return new Promise((res, rej) => {
            const newItem = new User(el);

            newItem.save(function (err) {
                if (!err) {
                    return res(newItem);
                } else {
                    return rej(err);
                }
            });
        });
    }
}

module.exports = SearchQuery;