const{model} = require("mongoose");
const {OrderSchema} = require("../schemas/OrdersSchema");

const OrderModel =  new model("order",OrderSchema);
module.exports = {OrderModel};

