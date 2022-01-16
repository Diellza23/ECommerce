const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    price: Number,
    image: String,
    description: String
});

module.exports = mongoose.model('Products', productSchema);