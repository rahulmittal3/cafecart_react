const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const couponcodeSchema = Schema({
  coupon: {
    type: String,
    required: true,
    unique: true,
  },
  pricedrop: {
    type: Number,
    required: true,
  },
  maxAmount: {
    type: Number,
    required: true,
  },
  minimumCartAmount: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Coupon", couponcodeSchema);
