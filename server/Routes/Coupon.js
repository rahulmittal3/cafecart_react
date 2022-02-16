const express = require("express");
const CouponRouter = express.Router();

const { checkCoupon } = require("../Controllers/Coupon.js");

CouponRouter.route("/check-coupon").get(checkCoupon);

module.exports = CouponRouter;
