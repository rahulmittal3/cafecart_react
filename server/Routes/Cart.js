const express = require("express");
const CartRouter = express.Router();

const {
  cartDetails,
  addToCartDB,
  getFromCart,
  completeWishlist,
  getShipping,
} = require("../Controllers/Cart.js");

CartRouter.route("/cart/items").post(cartDetails);
CartRouter.route("/checkout-now").post(addToCartDB);
CartRouter.route("/get-from-my-cart").get(getFromCart);
CartRouter.route("/complete-wishlist").post(completeWishlist);
CartRouter.route("/get-shipping").get(getShipping);

module.exports = CartRouter;
