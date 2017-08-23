const mongoose = require('mongoose');

const stocks = mongoose.Schema;

const Stocks = new stocks({
    name: { type: String, required: true },
    size: { type: String, required: true},
    growth: { type: String, required: true},
    count: { type: Number, required: true}
});

const StocksModel = mongoose.model('Stocks', Stocks);

module.exports = StocksModel;