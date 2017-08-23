const mongoose = require('mongoose');

const reserves = mongoose.Schema;

const Reserves = new reserves({
    stock_id: { type: String, required: true },
    date: { type: Date, required: true},
    author_login: { type: String, required: true},
    count: { type: Number, required: true},
    payment: { type: Boolean, required: true},
    unloading_date: { type: Date, required: false},
    client: { type: String, required: true},
    payment_id: { type: String, required: false},
    maker: { type: String, required: false},
    make_date: { type: Date, required: false}
});

const ReservesModel = mongoose.model('Reserves', Reserves);

module.exports = ReservesModel;