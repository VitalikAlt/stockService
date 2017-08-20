const mongoose    = require('mongoose');

const searches = mongoose.Schema;

const Searches = new searches({
    search: { type: String, required: true },
    count: { type: Number, required: true}
});

const SearchesModel = mongoose.model('Searches', Searches);

module.exports = SearchesModel;