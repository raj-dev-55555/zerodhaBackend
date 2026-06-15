const { Schema } = require("mongoose");

const SellSchema = new Schema({
    name: String,
    qty: Number,
    price: Number,
    mode:String
});

module.exports = { SellSchema };




