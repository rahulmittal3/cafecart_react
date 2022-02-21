const express = require("express");
const OrderRouter = express.Router();

const {
  getMyOrder,
  getSingleOrder,
  trackOrder,
} = require("../Controllers/Order.js");

OrderRouter.route("/get-order").get(getMyOrder);
OrderRouter.route("/get-single-order").get(getSingleOrder);
OrderRouter.route("/track-order").post(trackOrder);

module.exports = OrderRouter;
