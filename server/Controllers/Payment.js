const User = require("../Models/user.js");
const NewCart = require("../Models/newCart.js");
const cryptoJs = require("crypto-js");
const jssha = require("jssha");
const request = require("request");
const axios = require("axios");
const Product = require("../Models/product.js");
const NewOrder = require("../Models/newOrder.js");
const uniqid = require("uniqid");
const generateUniqueId = require("generate-unique-id");
var bodyParser = require("body-parser");
async function genTxnid() {
  const d = new Date();
  let gentxnid = cryptoJs.SHA256(
    Math.floor(Math.random() * 10 + 1).toString() + d.getTime().toString()
  );
  return "v" + gentxnid.toString().substring(0, 20);
}
const createPayment = async (req, res) => {
  //   console.log(req.body);
  const findUser = await User.findOne({ email: req.body.email });
  const cart = await NewCart.findOne({ user: findUser._id });
  const productInfo = `You are purchasing ${cart.items.length} different Items worth ${cart.finalAmount} INR`;
  try {
    const txnId = await genTxnid();
    // create a Hash Key object
    const hashString =
      process.env.PAYU_MERCHANT_KEY + //store in in different file
      "|" +
      txnId +
      "|" +
      cart.finalAmount +
      "|" +
      productInfo +
      "|" +
      req.body.fName +
      "|" +
      req.body.email +
      "|" +
      req.body.add1 +
      "|" +
      req.body.add2 +
      "|" +
      req.body.pin +
      "|" +
      req.body.city +
      "|" +
      `${req.body.district} ${req.body.state}` +
      "|" +
      "|||||" +
      process.env.PAYU_SALT;
    const sha = new jssha("SHA-512", "TEXT");
    sha.update(hashString);
    const hash = sha.getHash("HEX");
    const pay = {
      key: process.env.PAYU_MERCHANT_KEY,
      txnid: txnId,
      amount: cart.finalAmount,
      productInfo: productInfo,
      firstname: req.body.fName,
      email: req.body.email,
      phone: req.body.contact,
      lastname: req.body.lName,
      address1: req.body.add1,
      address2: req.body.add2,
      city: req.body.city,
      state: req.body.state,
      country: "India",
      zipcode: req.body.pin,
      //   surl:null,
      // furl:null,
      hash: hash,
      udf1: req.body.add1,
      udf2: req.body.add2,
      udf3: req.body.pin,
      udf4: req.body.city,
      udf5: `${req.body.district} ${req.body.state}`,
    };
    await axios({
      method: "POST",
      url: `${process.env.DEV_URL}/codsuccess`,
      data: pay,
    });
    return res.status(201).json("Created");
  } catch (error) {
    console.log("87", error);
    res.status(400).json(error);
  }
};

const codsuccess = async (req, res) => {
  const findUser = await User.findOne({ email: req.body.email });
  const cart = await NewCart.findOne({ user: findUser._id })
    .populate("user")
    .populate("items.productId");
  //   console.log(JSON.stringify(cart));
  let orderItems = [];
  for (let i = 0; i < cart.items.length; i++) {
    const currObj = {
      name: cart.items[i].productId.title,
      sku: "no" + (i + 1),
      units: cart.items[i].quantity,
      selling_price: cart.items[i].productId.price,
      discount: 0,
      tax: 0,
      hsn: 441122,
    };
    orderItems.push(currObj);
  }
  const txnid = generateUniqueId({
    length: 18,
    useLetters: false,
  });
  console.log(txnid);
  //creating an order for ShipRocket
  let order = {
    order_id: txnid,
    order_date: new Date(),
    pickup_location: "Hansi",
    channel_id: "",
    comment: "Sold by Cafecart",
    billing_customer_name: req.body.firstname,
    billing_last_name: req.body.lastname,
    billing_address: req.body.address1,
    billing_address_2: req.body.address2,
    billing_city: req.body.city,
    billing_pincode: req.body.zipcode,
    billing_state: req.body.state,
    billing_country: "India",
    billing_email: req.body.email,
    billing_phone: req.body.phone,
    shipping_is_billing: true,
    shipping_customer_name: req.body.firstname,
    shipping_last_name: req.body.lastname,
    shipping_address: req.body.address1,
    shipping_address_2: req.body.address2,
    shipping_city: req.body.city,
    shipping_pincode: req.body.zipcode,
    shipping_country: "India",
    shipping_state: req.body.state,
    shipping_email: req.body.email,
    shipping_phone: req.body.phone,
    order_items: orderItems,
    payment_method: "COD",
    shipping_charges: 0,
    giftwrap_charges: 0,
    transaction_charges: 0,
    total_discount: cart.discountApplied,
    sub_total: cart.total,
    length: 10,
    breadth: 15,
    height: 20,
    weight: 2.5,
  };
  const originalCart = await NewCart.findOne({ user: findUser._id });
  order = JSON.stringify(order);
  //create an link with shiprocket..
  const datatoken = JSON.stringify({
    email: process.env.SHIPROCKET_AUTH_EMAIL,
    password: process.env.SHIPROCKET_AUTH_PASSWORD,
  });
  //place order on shiprocket..
  var authtoken = null;
  try {
    const result1 = await axios({
      method: "POST",
      url: "https://apiv2.shiprocket.in/v1/external/auth/login",
      data: datatoken,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("LOGIN TO SR : ", result1);
    authtoken = result1.data.token;
    console.log(authtoken);
    // we are here it means login ho gaya
    const result2 = await axios({
      method: "post",
      url: "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authtoken}`,
      },
      data: order,
    });
    console.log(result2);
    await axios({
      method: "POST",
      url: `${process.env.DEV_URL}/finalise-cod`,
      data: {
        userAssociated: findUser,
        cartDetails: originalCart,
        shiprocket: result2.data,
        orderDetails: req.body,
      },
    });
    return res.status(200).json("ok");
  } catch (error) {
    console.log("201", error);
    console.log(error);
  }
};

const finaliseCOD = async (req, res) => {
  console.log("from last fx");
  const currObj = req.body;
  try {
    const newOrder = new NewOrder({
      user: currObj.userAssociated._id,
      customerName: `${currObj.orderDetails.firstname} ${currObj.orderDetails.lastname}`,
      customerContact: currObj.orderDetails.phone,
      customerPin: currObj.orderDetails.zipcode,
      customerAddress: `${currObj.orderDetails.udf1} ${currObj.orderDetails.udf2}`,
      customerCity: currObj.orderDetails.city,
      customerState: currObj.orderDetails.state,
      orderType: "COD",
      items: currObj.cartDetails.items,
      SRID: currObj.shiprocket.order_id,
      SRShipmentId: currObj.shiprocket.shipment_id,
      totalAmount: currObj.cartDetails.total,
      discountApplied: currObj.cartDetails.discountApplied,
      netAmount: currObj.cartDetails.finalAmount,
      paymentId: "",
    });
    const x = await newOrder.save();
    console.log(x);

    //2)now, just clear the cart..
    const deleteCart = await NewCart.deleteOne({
      user: currObj.userAssociated._id,
    });
    console.log(deleteCart);

    //3)send back the response back
    return res.status(201).json("Created");
  } catch (error) {
    console.log("231", error);
    res.status(400).json(error);
  }
  //here, we need to place the order for user, and then clear the cart and then redirect the user (in frontend), back to some page
  // 1) CREATE AN ORDER FOR THE USER AND
};
//for prepaid orders, we need to
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const createPaymentPrepaid = async (req, res) => {
  const findUser = await User.findOne({ email: req.body.email });
  const cart = await NewCart.findOne({ user: findUser._id });
  const productInfo = `You are purchasing ${cart.items.length} different Items worth ${cart.finalAmount} INR`;

  try {
    const txnId = await genTxnid();
    // create a Hash Key object
    const hashString =
      process.env.PAYU_MERCHANT_KEY + //store in in different file
      "|" +
      txnId +
      "|" +
      cart.finalAmount +
      "|" +
      productInfo +
      "|" +
      req.body.fName +
      "|" +
      req.body.email +
      "|" +
      req.body.add1 +
      "|" +
      req.body.add2 +
      "|" +
      req.body.pin +
      "|" +
      req.body.city +
      "|" +
      `${req.body.district} ${req.body.state}` +
      "|" +
      "|||||" +
      process.env.PAYU_SALT;
    console.log(hashString);
    const sha = new jssha("SHA-512", "TEXT");
    sha.update(hashString);
    const hash = sha.getHash("HEX");
    const pay = {
      key: process.env.PAYU_MERCHANT_KEY,
      txnid: txnId,
      amount: cart.finalAmount,
      productinfo: productInfo,
      firstname: req.body.fName,
      email: req.body.email,
      phone: req.body.contact,
      lastname: req.body.lName,
      address1: req.body.add1,
      address2: req.body.add2,
      city: req.body.city,
      state: req.body.state,
      country: "India",
      zipcode: req.body.pin,
      service_provider: "payu_paisa",
      surl: `${process.env.DEV_URL}/prepaid-success`,
      furl: `${process.env.DEV_URL}/prepaid-failure`,
      hash: hash,
      udf1: req.body.add1,
      udf2: req.body.add2,
      udf3: req.body.pin,
      udf4: req.body.city,
      udf5: `${req.body.district} ${req.body.state}`,
    };

    console.log(pay);
    //payment parameters are calculated, now send to payumoney for paytm
    const result = await axios({
      url: "https://secure.payu.in/_payment",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: pay,
    });
    console.log(pay);
    if (result.status === 200) {
      console.log(result);
      res.send(result.data);
    } else if (result.status >= 300 && result.status <= 400) {
      res.redirect(req.headers.location.toString());
    }

    // fetch("https://secure.payu.in/_payment", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   form: pay,
    // })
    //   .then((res) => res.json())
    //   .then((data) => console.log(data))
    //   .catch((err) => console.log(err));

    // response.json().then((data) => {
    //   console.log(data);
    // });
  } catch (error) {
    console.log("87", error);
    res.status(400).json(error);
  }
};

const prepaidsuccess = (req, res) => {
  console.log("PAYMENT SUCCESS");
};

const prepaidfailure = (req, res) => {
  console.log("PAYMENT FAILED");
};
const finalisePrepaid = () => {};
const object = {
  createPayment,
  codsuccess,
  finaliseCOD,
  createPaymentPrepaid,
  prepaidsuccess,
  prepaidfailure,
  finalisePrepaid,
};
module.exports = object;
