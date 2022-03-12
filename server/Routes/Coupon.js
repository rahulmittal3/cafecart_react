const express = require("express");
const CouponRouter = express.Router();

const { checkCoupon, checkoutCoupon } = require("../Controllers/Coupon.js");
const { isLoggedIn } = require("../Middlewares/isLoggedIn.js");
CouponRouter.route("/check-coupon").get(checkCoupon);
CouponRouter.route("/checkout-coupon").get(isLoggedIn, checkoutCoupon);
module.exports = CouponRouter;
