const mongoose = require('mongoose');

const reserves = mongoose.Schema;

const Reserves = new reserves({
    stock_id: { type: String, required: true },
    date: { type: Date, required: true},
    author_login: { type: String, required: true},
    count: { type: Number, required: true},
    payment: { type: Boolean, required: true},
    unloading_date: { type: Boolean, required: true},
    client: { type: String, required: true},
    payment_id: { type: String, required: true}
});

const ReservesModel = mongoose.model('Reserves', Reserves);

module.exports = ReservesModel;