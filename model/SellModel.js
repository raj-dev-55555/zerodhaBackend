const{model} = require("mongoose");
const {SellSchema} = require("../schemas/SellSchema");

const SellModel =  new model("sell",SellSchema);
module.exports = {SellModel};

