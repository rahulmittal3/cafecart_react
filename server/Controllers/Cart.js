const Product = require("../Models/product.js");
const NewCart = require("../Models/newCart.js");
const Shippingcharge = require("../Models/shippingcharges.js");
const cartDetails = async (req, res) => {
  const cart = req.body;
  console.log(cart);
  const cartArray = [];
  try {
    for (let i = 0; i < cart.length; i++) {
      let result = await Product.findOne({ _id: cart[i]._id });
      result = { ...result, quantity: cart[i].quantity };
      cartArray.push(result);
    }
    return res.status(200).json(cartArray);
  } catch (error) {
    res.status(400).json(error);
  }
};

const addToCartDB = async (req, res) => {
  console.log(req.body);
  try {
    //first check if a cart already Exists
    const cartExists = await NewCart.findOne({ user: req.body.user });
    if (cartExists) {
      await NewCart.deleteOne({ user: req.body.user });
    }
    //create a new cartDetails
    const final = req.body.priceBeforeDiscount - req.body.discount;
    let query = new NewCart({
      user: req.body.user,
      items: req.body.items,
      finalAmount: final,
      discountApplied: req.body.discount,
      total: req.body.priceBeforeDiscount,
      shipping: req.body.shipping,
      coupon: req.body.couponApplied,
    });
    const result = await query.save();
    res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    res.status();
  }
};

const getFromCart = async (req, res) => {
  try {
    const cartFound = await NewCart.findOne({ user: req.query.id }).populate({
      path: "items.productId",
      Product,
    });
    if (!cartFound) {
      throw "Cart Not Found!";
    }
    res.status(200).json(cartFound);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const completeWishlist = async (req, res) => {
  const arr = req.body;
  let ret = [];
  try {
    for (let i = 0; i < arr.length; i++) {
      const unique = arr[i];
      const product = await Product.findOne(
        { _id: unique },
        {
          _id: 1,
          title: 1,
          imagePath: 1,
        }
      );
      ret.push(product);
    }
    res.status(200).json(ret);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const getShipping = async (req, res) => {
  const { cartSize } = req.query;

  try {
    //get all the shipping charges lte cartSize in descending Order :
    const charges = await Shippingcharge.find({
      cartsize: { $gte: Number(req.query.cartSize) },
    }).sort({ cartSize: "1" });
    let recent = {
      cartsize: 0,
      shipping_charge: 0,
    };
    if (charges.length > 0)
      recent = {
        cartsize: charges[0].cartsize,
        shipping_charge: charges[0].shipping_charge,
      };
    console.log(recent);
    res.status(200).json(recent);
  } catch (error) {
    res.status(400).json(error);
  }
};
const obj = {
  cartDetails,
  addToCartDB,
  getFromCart,
  completeWishlist,
  getShipping,
};
module.exports = obj;
