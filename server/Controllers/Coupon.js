const Coupon = require("../Models/couponcode.js");
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

const obj = { checkCoupon };
module.exports = obj;
