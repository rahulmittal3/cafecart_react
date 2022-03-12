const Coupon = require("../Models/couponcode.js");
const NewCart = require("../Models/newCart.js");
const Shippingcharge = require("../Models/shippingcharges.js");
const checkCoupon = async (req, res) => {
  console.log(req.query);
  try {
    const found = await Coupon.findOne({ coupon: req.query.name });
    console.log(found);
    if (!found) {
      throw "No such Coupon Found!";
    }
    res.status(200).json(found);
  } catch (error) {
    res.status(404).json(error);
  }
};
const checkoutCoupon = async (req, res) => {
  try {
    //check whether coupon is existing..
    console.log(req.query);
    const couponExists = await Coupon.findOne({ coupon: req.query.name });
    console.log(couponExists);
    if (!couponExists) throw "No Such Coupon Exists";
    console.log(couponExists);
    //GET THE CART FIRST
    const newCart = await NewCart.findOne({ user: req.query._id });
    console.log(newCart);

    if (newCart.finalAmount < couponExists?.minimumCartAmount) {
      throw `Shop for Rs. ${
        couponExists?.minimumCartAmount + 1 - newCart.finalAmount
      } to avail this crazy deal!`;
    }

    const disc1 = couponExists?.maxAmount;
    const disc2 = ((newCart.total * couponExists?.pricedrop) / 100.0).toFixed(
      0
    );
    const ultimateDisc = disc1 < disc2 ? disc1 : disc2;
    //get the shipping charge too...
    const charges = await Shippingcharge.find({
      cartsize: { $gte: Number(newCart?.total - ultimateDisc) },
    }).sort({ cartSize: "1" });
    const charge = charges.length === 0 ? 0 : charges[0]?.shipping_charge;
    //APPEND TO THE DATABASE
    const newCartUpdated = await NewCart.findOneAndUpdate(
      { user: req.query._id },
      {
        discountApplied: Number(ultimateDisc),
        coupon: couponExists?.coupon,
        finalAmount: Number(newCart.total - ultimateDisc),
        shipping: charge,
      },
      { new: true }
    );
    // console.log(newCartUpdated);
    res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const obj = { checkCoupon, checkoutCoupon };
module.exports = obj;
