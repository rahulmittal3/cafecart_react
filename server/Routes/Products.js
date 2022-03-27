const express = require("express");
const productRouter = express.Router();

const {
  newArrivals,
  categories,
  categorySlug,
  variety,
  parentVariety,
  trending,
  singleProduct,
  best,
  otherProducts,
  createReview,
  getReviews,
  searchedItems,
} = require("../Controllers/Products.js");

const { isLoggedIn } = require("../Middlewares/isLoggedIn.js");
productRouter.route("/new-arrivals").get(newArrivals);
productRouter.route("/trending").get(trending);
productRouter.route("/best").get(best);
productRouter.route("/categories").get(categories);
productRouter.route("/category-slug/:slug").get(categorySlug);
productRouter.route("/category/:id1/:id2/:id3").get(variety);
productRouter.route("/category/:id1/:id2").get(parentVariety);
productRouter.route("/product/:id").get(singleProduct);
productRouter.route("/product/other-products").post(otherProducts);
productRouter.route("/product/create-review").post(isLoggedIn, createReview);
productRouter.route("/product/get-reviews/:id").get(getReviews);
productRouter.route("/search/:keyword").get(searchedItems);

module.exports = productRouter;
