const express = require("express");
const CartRouter = express.Router();

const {
  cartDetails,
  addToCartDB,
  getFromCart,
  completeWishlist,
} = require("../Controllers/Cart.js");

CartRouter.route("/cart/items").post(cartDetails);
CartRouter.route("/checkout-now").post(addToCartDB);
CartRouter.route("/get-from-my-cart").get(getFromCart);
CartRouter.route("/complete-wishlist").post(completeWishlist);

module.exports = CartRouter;
