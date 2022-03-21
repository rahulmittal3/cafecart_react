const User = require("../Models/user.js");
const NewCart = require("../Models/newCart.js");
const cryptoJs = require("crypto-js");
const jssha = require("jssha");
const request = require("request");
const opn = require("better-opn");
const axios = require("axios");
const Product = require("../Models/product.js");
const NewOrder = require("../Models/newOrder.js");
const uniqid = require("uniqid");
const generateUniqueId = require("generate-unique-id");
const orderUserMail = require("../Utilities/Templates/OrderUserMail.js");
const sendMail = require("../Utilities/Mailer.js");
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
  const findUser = await User.findOne({ _id: req.body.user }); //okay
  const cart = await NewCart.findOne({ user: findUser._id }); //okay
  const productInfo = `You are purchasing ${cart.items.length} different Items worth ${cart.finalAmount} INR`;
  try {
    const txnId = await genTxnid();
    // create a Hash Key object
    const hashString =
      process.env.PAYU_MERCHANT_KEY + //store in in different file
      "|" +
      txnId +
      "|" +
      (cart.finalAmount + cart.shipping) +
      "|" +
      productInfo +
      "|" +
      req.body.fname +
      "|" +
      req.body.email +
      "|" +
      req.body.address +
      "|" +
      req.body.address2 +
      "|" +
      req.body.pin +
      "|" +
      req.body.city +
      "|" +
      `${req.body.state}` +
      "|" +
      "|||||" +
      process.env.PAYU_SALT;
    const sha = new jssha("SHA-512", "TEXT");
    sha.update(hashString);
    const hash = sha.getHash("HEX");
    const pay = {
      key: process.env.PAYU_MERCHANT_KEY,
      txnid: txnId,
      amount: cart.finalAmount + cart.shipping,
      productInfo: productInfo,
      firstname: req.body.fname,
      email: req.body.email,
      phone: req.body.phone,
      lastname: req.body.lname,
      address1: req.body.address,
      address2: req.body.address2,
      city: req.body.city,
      state: req.body.state,
      country: "India",
      zipcode: req.body.pin,
      //   surl:null,
      // furl:null,
      hash: hash,
      udf1: req.body.address,
      udf2: req.body.address2,
      udf3: req.body.pin,
      udf4: req.body.city,
      udf5: `${req.body.state}`,
    };
    await axios({
      method: "POST",
      url: `${process.env.DEV_URL}/codsuccess`,
      data: { pay: pay, user: req.body.user },
    });
    return res.status(201).json("Created");
  } catch (error) {
    console.log("87", error);
    res.status(400).json(error);
  }
};

const codsuccess = async (req, res) => {
  const findUser = await User.findOne({ _id: req.body.user });
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
    billing_customer_name: req.body.pay.firstname,
    billing_last_name: req.body.pay.lastname,
    billing_address: req.body.pay.address1,
    billing_address_2: req.body.pay.address2,
    billing_city: req.body.pay.city,
    billing_pincode: req.body.pay.zipcode,
    billing_state: req.body.pay.state,
    billing_country: "India",
    billing_email: req.body.pay.email,
    billing_phone: req.body.pay.phone,
    shipping_is_billing: true,
    shipping_customer_name: req.body.pay.firstname,
    shipping_last_name: req.body.pay.lastname,
    shipping_address: req.body.pay.address1,
    shipping_address_2: req.body.pay.address2,
    shipping_city: req.body.pay.city,
    shipping_pincode: req.body.pay.zipcode,
    shipping_country: "India",
    shipping_state: req.body.pay.state,
    shipping_email: req.body.pay.email,
    shipping_phone: req.body.pay.phone,
    order_items: orderItems,
    payment_method: "COD",
    shipping_charges: cart.shipping,
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
  console.log(order);
  order = JSON.stringify(order);
  //create an link with shiprocket..
  const datatoken = JSON.stringify({
    email: process.env.SHIPROCKET_AUTH_EMAIL,
    password: process.env.SHIPROCKET_AUTH_PASSWORD,
  });

  // place order on shiprocket..
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
    authtoken = result1.data.token;
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
        orderDetails: req.body.pay,
        populatedCart: cart,
      },
    });
    return res.status(200).json("ok");
  } catch (error) {
    res.status(400).json(error);
  }
};

const finaliseCOD = async (req, res) => {
  try {
    console.log(req.body);
    const query = new NewOrder({
      user: req.body.userAssociated._id,
      customerName:
        req.body.orderDetails.firstname + " " + req.body.orderDetails.lastname,
      customerContact: req.body.orderDetails.phone,
      customerEmail: req.body.email,
      customerPin: req.body.orderDetails.zipcode,
      customerAddress: `${req.body.orderDetails.address1} ${req.body.orderDetails.address2}`,
      customerCity: req.body.orderDetails.city,
      customerState: req.body.orderDetails.state,
      orderType: "COD",
      items: req.body.cartDetails.items,
      SRID: req.body.shiprocket.order_id,
      SRShipmentId: req.body.shiprocket.shipment_id,
      totalAmount: req.body.cartDetails.total,
      discountApplied: req.body.cartDetails.discountApplied,
      netAmount:
        req.body.cartDetails.finalAmount + req.body.cartDetails.shipping,
      paymentId: "",
      couponName: req.body.cartDetails.coupon,
    });

    const x = await query.save();

    // //2)now, just clear the cart..
    const deleteCart = await NewCart.deleteOne({
      user: req.body.userAssociated._id,
    });
    // console.log(deleteCart);

    // //3)send back the response back

    //send the mail here..
    //1) Create a shallow copy of mail here..
    let shallow = orderUserMail;

    const orderId = x._id;
    const date = String(
      new Intl.DateTimeFormat("en-GB", {
        dateStyle: "full",
        timeStyle: "long",
      }).format(Date.now())
    );
    shallow = shallow.replace("ORDER_ID_INFO", orderId);
    shallow = shallow.replace("ORDER_DATE_INFO", date);
    shallow = shallow.replace("SHIPPING_INFO", req.body.cartDetails.shipping);
    shallow = shallow.replace(
      "COUPON_INFO",
      req.body.cartDetails.coupon ? req.body.cartDetails.coupon : "NOT APPLIED"
    );
    shallow = shallow.replace(
      "DISCOUNT_INFO",
      req.body.cartDetails.discountApplied
    );
    shallow = shallow.replace(
      "AMOUNT_INFO",
      req.body.cartDetails.finalAmount + req.body.cartDetails.shipping
    );

    //FOR CUSTOMERS DETAILS
    shallow = shallow.replace(
      "CUSTOMER_NAME",
      req.body.orderDetails.firstname + " " + req.body.orderDetails.lastname
    );
    shallow = shallow.replace("CUSTOMER_NAME", req.body.orderDetails.phone);
    shallow = shallow.replace(
      "CUSTOMER_ADDRESS",
      `${req.body.orderDetails.address1} ${req.body.orderDetails.address2}`
    );
    shallow = shallow.replace("CUSTOMER_PIN", req.body.orderDetails.zipcode);
    shallow = shallow.replace("CUSTOMER_STATE", req.body.orderDetails.state);
    shallow = shallow.replace("PAYMENT_INFO", "Cash On Delivery");
    shallow = shallow.replace("PAYMENT_ID", "COD Order (Not Generated)");
    //generate items for order details
    let order = "";
    console.log(req.body);
    for (let i = 0; i < req.body.populatedCart.items.length; i++) {
      let curr = `<div class="item">
                                               
                                              <div class="format">${
                                                req.body.populatedCart.items[i]
                                                  .productId.title
                                              } --- ₹ ${
        req.body.populatedCart.items[i].productId.price
      } (each) --- ${req.body.populatedCart.items[i].quantity} pc --- ₹ ${
        req.body.populatedCart.items[i].productId.price *
        req.body.populatedCart.items[i].quantity
      }  </div></div>
                                              
                                              
                                              `;
      order = order + curr;
    }
    shallow = shallow.replace("ORDER_ITEMS", order);
    await sendMail(
      req.body.orderDetails.email,
      "Order Confirmation Mail",
      shallow
    );
    await sendMail(
      "business.cafecart@gmail.com",
      "Order Confirmation Mail",
      shallow
    );
    return res.status(201).json("Created");
  } catch (error) {
    res.status(500).json(error);
  }
};
//for prepaid orders, we need to
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const createPaymentPrepaid = async (req, res) => {
  console.log(req.body);
  const findUser = await User.findOne({ _id: req.body.user }); //okay
  const cart = await NewCart.findOne({ user: findUser._id }); //okay
  const productInfo = `You are purchasing ${cart.items.length} different Items worth ${cart.finalAmount} INR`;
  try {
    const txnId = await genTxnid();
    // create a Hash Key object
    const hashString =
      process.env.PAYU_MERCHANT_KEY + //store in in different file
      "|" +
      txnId +
      "|" +
      (cart.finalAmount + cart.shipping) +
      "|" +
      productInfo +
      "|" +
      req.body.fname +
      "|" +
      req.body.email +
      "|" +
      req.body.address +
      "|" +
      req.body.address2 +
      "|" +
      req.body.pin +
      "|" +
      req.body.city +
      "|" +
      `${req.body.state}` +
      "|" +
      "|||||" +
      process.env.PAYU_SALT;
    const sha = new jssha("SHA-512", "TEXT");
    sha.update(hashString);
    const hash = sha.getHash("HEX");
    const pay = {
      key: process.env.PAYU_MERCHANT_KEY,
      txnid: txnId,
      amount: cart.finalAmount + cart.shipping,
      productInfo: productInfo,
      firstname: req.body.fname,
      email: req.body.email,
      phone: req.body.phone,
      lastname: req.body.lname,
      address1: req.body.address,
      address2: req.body.address2,
      city: req.body.city,
      state: req.body.state,
      country: "India",
      zipcode: req.body.pin,
      surl: `${process.env.DEV_BACKEND}/api/v1/prepaid-success`,
      furl: `${process.env.DEV_BACKEND}/api/v1/prepaid-failure`,
      hash: hash,
      udf1: req.body.address,
      udf2: req.body.address2,
      udf3: req.body.pin,
      udf4: req.body.city,
      udf5: `${req.body.state}`,
      service_provider: "payu_paisa",
    };
    console.log(pay);
    res.status(200).json(pay);
  } catch (error) {
    console.log("error");
  }
};

const prepaidsuccess = async (req, res) => {
  console.log(res.req.body);
  res.redirect(`${process.env.DEV_FRONTEND}/payment-success`);
};

const prepaidfailure = async (req, res) => {
  console.log("PAYMENT FAILED");
  res.redirect(`${process.env.DEV_FRONTEND}/cart`);
};
const finalisePrepaid = async (req, res) => {
  const { id, pay } = req.body;
  console.log(id, pay);
  //we have the user whose order we have to place...
  //1) Get the user and cart from the database, whose order we have to place
  const findUser = await User.findOne({ _id: id }); //okay
  const cart = await NewCart.findOne({ user: findUser._id })
    .populate("user")
    .populate("items.productId"); //okay
  const productInfo = `You are purchasing ${cart.items.length} different Items worth ${cart.finalAmount} INR`;

  //create order items to send to ShipRocket Dashboard
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
  console.log("SR ID : ", txnid);
  console.log("ID : ", id);
  console.log("PAYMENT : ", pay);

  //create an orderDetail for ShipRocket
  let order1 = {
    order_id: txnid,
    order_date: new Date(),
    pickup_location: "Hansi",
    channel_id: "",
    comment: "Sold by Cafecart",
    billing_customer_name: pay.firstname,
    billing_last_name: pay.lastname,
    billing_address: pay.address1,
    billing_address_2: pay.address2,
    billing_city: pay.city,
    billing_pincode: pay.zipcode,
    billing_state: pay.state,
    billing_country: "India",
    billing_email: pay.email,
    billing_phone: pay.phone,
    shipping_is_billing: true,
    shipping_customer_name: pay.firstname,
    shipping_last_name: pay.lastname,
    shipping_address: pay.address1,
    shipping_address_2: pay.address2,
    shipping_city: pay.city,
    shipping_pincode: pay.zipcode,
    shipping_country: "India",
    shipping_state: pay.state,
    shipping_email: pay.email,
    shipping_phone: pay.phone,
    order_items: orderItems,
    payment_method: "Prepaid",
    shipping_charges: cart.shipping,
    giftwrap_charges: 0,
    transaction_charges: 0,
    total_discount: cart.discountApplied,
    sub_total: cart.total,
    length: 10,
    breadth: 15,
    height: 20,
    weight: 2.5,
  };
  console.log(order1);
  const originalCart = await NewCart.findOne({ user: findUser._id });
  order1 = JSON.stringify(order1);
  //create an link with shiprocket..
  const datatoken = JSON.stringify({
    email: process.env.SHIPROCKET_AUTH_EMAIL,
    password: process.env.SHIPROCKET_AUTH_PASSWORD,
  });
  try {
    const result1 = await axios({
      method: "POST",
      url: "https://apiv2.shiprocket.in/v1/external/auth/login",
      data: datatoken,
      headers: {
        "Content-Type": "application/json",
      },
    });
    authtoken = result1.data.token;
    const result2 = await axios({
      method: "post",
      url: "https://apiv2.shiprocket.in/v1/external/orders/create/adhoc",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authtoken}`,
      },
      data: order1,
    });

    //now CRUD OPERATIONS ON DB
    const query = new NewOrder({
      user: id,
      customerName: pay.firstname + " " + pay.lastname,
      customerContact: pay.phone,
      customerEmail: req.body.email,
      customerPin: pay.zipcode,
      customerAddress: `${pay.address1} ${pay.address2}`,
      customerCity: pay.city,
      customerState: pay.state,
      orderType: "Prepaid",
      items: originalCart.items,
      SRID: result2.data.order_id,
      SRShipmentId: result2.data.shipment_id,
      totalAmount: originalCart.total,
      discountApplied: originalCart.discountApplied,
      netAmount: originalCart.finalAmount + originalCart.shipping,
      paymentId: pay.txnid,
      couponName: originalCart.coupon,
    });
    //Dtabase entry id ready, insert Now
    const x = await query.save();
    // //2)now, just clear the cart..
    const deleteCart = await NewCart.deleteOne({
      user: id,
    });

    //send the mail now.....
    let shallow = orderUserMail;

    const orderId = x._id;
    const date = String(
      new Intl.DateTimeFormat("en-GB", {
        dateStyle: "full",
        timeStyle: "long",
      }).format(Date.now())
    );
    shallow = shallow.replace("ORDER_ID_INFO", orderId);
    shallow = shallow.replace("ORDER_DATE_INFO", date);
    shallow = shallow.replace("SHIPPING_INFO", originalCart.shipping);
    shallow = shallow.replace(
      "COUPON_INFO",
      originalCart.coupon ? originalCart.coupon : "NOT APPLIED"
    );
    shallow = shallow.replace("DISCOUNT_INFO", originalCart.discountApplied);
    shallow = shallow.replace(
      "AMOUNT_INFO",
      originalCart.finalAmount + originalCart.shipping
    );

    //FOR CUSTOMERS DETAILS
    shallow = shallow.replace(
      "CUSTOMER_NAME",
      pay.firstname + " " + pay.lastname
    );
    shallow = shallow.replace("CUSTOMER_NAME", pay.phone);
    shallow = shallow.replace(
      "CUSTOMER_ADDRESS",
      `${pay.address1} ${pay.address2}`
    );
    shallow = shallow.replace("CUSTOMER_PIN", pay.zipcode);
    shallow = shallow.replace("CUSTOMER_STATE", pay.state);
    shallow = shallow.replace("PAYMENT_INFO", "Prepaid");
    shallow = shallow.replace("PAYMENT_ID", pay.txnid);
    //generate items for order details
    let order = "";

    for (let i = 0; i < cart.items.length; i++) {
      let curr = `<div class="item">
                                               
                                              <div class="format">${
                                                cart.items[i].productId.title
                                              } --- ₹ ${
        cart.items[i].productId.price
      } (each) --- ${cart.items[i].quantity} pc --- ₹ ${
        cart.items[i].productId.price * cart.items[i].quantity
      }  </div></div>
                                              
                                              
                                              `;
      order = order + curr;
    }
    shallow = shallow.replace("ORDER_ITEMS", order);
    await sendMail(pay.email, "Order Confirmation Mail", shallow);
    await sendMail(
      "business.cafecart@gmail.com",
      "Order Confirmation Mail",
      shallow
    );
    return res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
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
