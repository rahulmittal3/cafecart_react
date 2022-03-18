const NewOrder = require("../Models/newOrder.js");
const Product = require("../Models/product.js");
const axios = require("axios");
const _ = require("lodash");
const Order = require("../Models/order.js");
const getMyOrder = async (req, res) => {
  //get the orders from there
  try {
    let box = [];

    const orders = await NewOrder.find({ user: req.query.id })
      .populate({
        path: "items.productId",
        Product,
      })
      .sort("-createdAt");
    box.push(...orders);
    const oldOrders = await Order.find({ user: req.query.id })
      .populate({
        path: "cart.items.productId",
        Product,
      })
      .sort("-createdAt");
    box.push(...oldOrders);
    box = _.sortBy(box, [
      function (o) {
        return o.createdAt;
      },
    ]);
    // console.log(oldOrders);
    // res.status(200).json(orders);
    res.status(200).json(box);
  } catch (error) {
    res.status(400).json(error);
  }
};
const getSingleOrder = async (req, res) => {
  console.log(req.query);
  try {
    const orders = await NewOrder.findOne({ _id: req.query.orderId }).populate({
      path: "items.productId",
      Product,
    });
    if (orders) {
      return res.status(200).json(orders);
    }
    //check for older orderSchema
    const oldOrder = await Order.findOne({ _id: req.query.orderId }).populate({
      path: "cart.items.productId",
      Product,
    });
    if (oldOrder) {
      return res.status(200).json(oldOrder);
    } else {
      throw "No Order Found";
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
const trackOrder = async (req, res) => {
  //get the orders first from
  const order = await NewOrder.findOne({ _id: req.body.orderId });
  try {
    //make connection with shiprocket first
    const datatoken = JSON.stringify({
      email: process.env.SHIPROCKET_AUTH_EMAIL,
      password: process.env.SHIPROCKET_AUTH_PASSWORD,
    });
    //place order on shiprocket..
    var authtoken = null;
    const result1 = await axios({
      method: "POST",
      url: "https://apiv2.shiprocket.in/v1/external/auth/login",
      data: datatoken,
      headers: {
        "Content-Type": "application/json",
      },
    });
    authtoken = result1.data.token;
    console.log(authtoken);

    const result2 = await axios({
      method: "get",
      url: `https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${order.SRShipmentId}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authtoken}`,
      },
    });
    console.log(result2.data);
    res.status(200).json(result2.data);
  } catch (error) {
    res.status(400).json(error);
  }
};
const obj = { getMyOrder, getSingleOrder, trackOrder };
module.exports = obj;
