const Product = require("../Models/product.js");
const NewCart = require("../Models/newCart.js");
const cartDetails = async (req, res) => {
  const cart = req.body;
  const cartArray = [];
  try {
    for (let i = 0; i < cart.length; i++) {
      let result = await Product.findOne({ _id: cart[i].productId });
      result = { ...result, quantity: cart[i].quantity };
      cartArray.push(result);
    }
    return res.status(200).json(cartArray);
  } catch (error) {
    res.status(400).json(error);
  }
};

const addToCartDB = async (req, res) => {
  const obj = {
    user: req.body.user.id,
    items: req.body.items,
    total: req.body.total,
    discountApplied: req.body.discountApplied,
    finalAmount: req.body.finalAmount,
  };
  console.log(obj);
  try {
    //delete the same user if it Exists
    const deleteUser = await NewCart.deleteOne({ user: req.body.user.id });
    //okay, now the user is deleted, create a new cart..
    let query = new NewCart(obj);
    query = await query.save();
    res.status(201).json("OK");
  } catch (error) {
    res.status(500).json(error);
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
const obj = { cartDetails, addToCartDB, getFromCart, completeWishlist };
module.exports = obj;
