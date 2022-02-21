const NewOrder = require("../Models/newOrder.js");
const Product = require("../Models/product.js");
const axios = require("axios");
const getMyOrder = async (req, res) => {
  //get the orders from there
  try {
    const orders = await NewOrder.find({ user: req.query.id })
      .populate({
        path: "items.productId",
        Product,
      })
      .sort("-createdAt");
    res.status(200).json(orders);
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
    if (!orders) throw "No Order Found";
    res.status(200).json(orders);
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
    res.status(200).json(result2.data);
  } catch (error) {
    res.status(400).json(error);
  }
};
const obj = { getMyOrder, getSingleOrder, trackOrder };
module.exports = obj;
