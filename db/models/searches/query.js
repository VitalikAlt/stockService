var Search = require('./table');

class SearchQuery {
    static getCount(text) {
        return new Promise((res, rej) => {
            Search.find({search: text}, (err, data) => {
                return res((data[0])? data[0].count : 0);
            })
        });
    }

    static getTop(elements) {
        return new Promise((res, rej) => {
            Search.find((err, data) => {
                if (err)
                    return rej(err);

                data = data.sort(function (a, b) {
                    if (a.count < b.count)
                        return 1;

                    if (a.count > b.count)
                        return -1;

                    return 0;
                });

                res(data.slice(0, elements));
            })
        });
    }

    static addSearch(el) {
        return new Promise((res, rej) => {
            const newItem = new Search(el);

            newItem.save(function (err) {
                if (!err) {
                    return res(newItem);
                } else {
                    return rej(err);
                }
            });
        });
    }

    static addCount(search) {
        Search.update({search: search.search}, {count: search.count}, (err, data) => {
            console.log(err, data);
        });
    }
}

module.exports = SearchQuery;