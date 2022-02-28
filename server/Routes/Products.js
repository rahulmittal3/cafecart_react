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
} = require("../Controllers/Products.js");

productRouter.route("/new-arrivals").get(newArrivals);
productRouter.route("/trending").get(trending);
productRouter.route("/best").get(best);
productRouter.route("/categories").get(categories);
productRouter.route("/category-slug/:slug").get(categorySlug);
productRouter.route("/category/:id1/:id2/:id3").get(variety);
productRouter.route("/category/:id1/:id2").get(parentVariety);
productRouter.route("/product/:id").get(singleProduct);

module.exports = productRouter;
