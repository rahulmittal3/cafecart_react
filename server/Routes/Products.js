const express = require("express");
const productRouter = express.Router();

const { newArrivals, categories } = require("../Controllers/Products.js");

productRouter.route("/new-arrivals").get(newArrivals);
productRouter.route("/categories").get(categories);

module.exports = productRouter;
