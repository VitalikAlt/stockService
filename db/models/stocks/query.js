const Stock = require('./table');
const reservesQuery = require('./../reserves/query');

class StockQuery {
    static get(params) {
        return new Promise((res, rej) => {
            Stock.find(params, (err, data) => {
                return res(data);
            })
        });
    }

    static async getWithReserves(params) {
        let stocks = await StockQuery.get(params);

        for (let i = 0; i < stocks.length; i++) {
            const reserves = await reservesQuery.get({stock_id: stocks[i]._id});
            stocks[i]._doc.reserves_count = 0;

            for (let j = 0; j < reserves.length; j++) {
                stocks[i]._doc.reserves_count += reserves[j].count;
            }
        }

        return stocks;
    }

    static add(el) {
        return new Promise((res, rej) => {
            const newItem = new Stock(el);

            newItem.save(function (err) {
                return (!err)? res(newItem) : rej(err);
            });
        });
    }

    static delete(params) {
        return new Promise((res, rej) => {
            Stock.remove(params, (err, success) => {
                return (!err)? res(success) : rej(err);
            })
        })
    }
}

module.exports = StockQuery;