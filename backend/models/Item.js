const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true }, // URL for the item image
    owner: { type: String, required: true }, // User ID or username
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
