const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const Coupon = require("../Models/couponcode.js");
const User = require("../Models/user.js");
const Blog = require("../Models/blog.js");
const SubCategoryChild = require("../Models/childcat.js");
const slugify = require("slugify");
const SubCategoryParent = require("../Models/subcategory.js");
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(404).json("Incomplete Details");
    }
    if (email !== process.env.ADMIN_USER) {
      return res.status(400).json("Email not Valid");
    }
    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(400).json("Incorrect Password! Please Try Again");
    }

    //lets do one thing, lets create a jwt token
    const jwtCreated = await jwt.sign(
      { email: email },
      process.env.JWT_STRING,
      {
        expiresIn: 3 * 60 * 60,
      }
    );
    res.status(200).json(jwtCreated);
  } catch (error) {
    res.status(400).json("Error Logging You in! Please Try Again");
  }
};
const loginVerify = async (req, res) => {
  try {
    if (jwt.length < 5) {
      return res.status(401).json("JWT too short for Token");
    }
    const decodedToken = await promisify(jwt.verify)(
      req.headers.authorization.split(" ")[1],
      process.env.JWT_STRING
    );
    console.log(decodedToken);
    if (!decodedToken.email || decodedToken.email !== process.env.ADMIN_USER) {
      return res.status(401).json("Unauthorised Access");
    }
    // console.log(new Date(decodedToken.iat * 1000));
    // console.log(new Date());
    // console.log(new Date(decodedToken.exp * 1000));
    if (new Date() > new Date(decodedToken.exp * 1000)) {
      return res.status(401).json("JWT Expired!");
    }

    //otherwise the user is valid one.
    return res.status(200).json("OK");
    //decode jwt token
  } catch (error) {
    return res.status(400).json("Unexpected Error");
  }
};
const getAllCoupons = async (req, res) => {
  try {
    const allCoupons = await Coupon.find({});
    return res.status(200).json(allCoupons);
  } catch (error) {
    return res.status(401).json(error);
  }
};
const createCoupon = async (req, res) => {
  const { name, minimumCartAmount, pricedrop, maxAmount } = req.body;
  try {
    if (!name || !minimumCartAmount || !pricedrop || !maxAmount) {
      throw "Incomplete details";
    }
    let query = new Coupon({
      coupon: name,
      minimumCartAmount: minimumCartAmount,
      pricedrop: pricedrop,
      maxAmount: maxAmount,
    });
    query = await query.save();
    console.log(query);
    res.status(201).json("Coupon Created");
  } catch (error) {
    res.status(500).json(error);
  }
};
const updateCoupon = async (req, res) => {};
const getCoupon = async (req, res) => {
  console.log(req.query);
  try {
    const result = await Coupon.findOne({ _id: req.query.id });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await User.find({}, { password: 0, updatedAt: 0, __v: 0 });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
const getAllBlogs = async (req, res) => {
  try {
    const result = await Blog.find({});

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
const createBlog = async (req, res) => {
  try {
    let query = new Blog({
      title: req.body.title,
      preview: req.body.preview,
      blogCode: req.body.code,
      imagePath: req.body.image,
      description: req.body.content,
      blog_category: req.body.category,
    });
    query = await query.save();
    return res.status(201).json("ok");
  } catch (error) {
    res.status(400).json(error);
  }
};
const getBlog = async (req, res) => {
  console.log(req.query);
  try {
    const result = await Blog.findOne({ _id: req.query.id });
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
const updateBlog = async (req, res) => {
  console.log(req.body);
  try {
    const obj = req.body;
    const find = await Blog.findByIdAndUpdate(req.body._id, obj, {
      new: true,
    });
    res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const deleteBlog = async (req, res) => {
  console.log(req.query);
  try {
    const result = await Blog.findByIdAndDelete(req.query.id);
    res.status(200).json("OK");
  } catch (error) {
    res.status(500).json(error);
  }
};

const getAllSubChildren = async (req, res) => {
  try {
    const result = await SubCategoryChild.find({});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
const createSubChildren = async (req, res) => {
  const x = await slugify(req.body.title);
  try {
    let query = new SubCategoryChild({
      title: req.body.title,
      slug: x,
    });
    query = await query.save();
    return res.status(201).json("ok");
  } catch (error) {
    res.status(400).json(error);
  }
};
const updateSubChildren = async (req, res) => {
  console.log(req.body);
  try {
    const obj = req.body;
    const find = await SubCategoryChild.findByIdAndUpdate(req.body._id, obj, {
      new: true,
    });
    res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const getSubChildren = async (req, res) => {
  console.log(req.query);
  try {
    const result = await SubCategoryChild.findOne({ _id: req.query.id });
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
const deleteSubChildren = async (req, res) => {
  console.log(req.query);
  try {
    const result = await SubCategoryChild.findByIdAndDelete(req.query.id);
    res.status(200).json("OK");
  } catch (error) {
    res.status(500).json(error);
  }
};
//-------------------------------------------------------------------------------------------------------------------------
const getAllSubParent = async (req, res) => {
  try {
    const result = await SubCategoryParent.find({});
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
const createSubParent = async (req, res) => {
  const x = await slugify(req.body.title);
  try {
    let query = new SubCategoryParent({
      title: req.body.title,
      slug: x,
    });
    query = await query.save();
    return res.status(201).json("ok");
  } catch (error) {
    res.status(400).json(error);
  }
};
const updateSubParent = async (req, res) => {
  console.log(req.body);
  try {
    const obj = req.body;
    const find = await SubCategoryParent.findByIdAndUpdate(req.body._id, obj, {
      new: true,
    });
    res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const getSubParent = async (req, res) => {
  console.log(req.query);
  try {
    const result = await SubCategoryParent.findOne({ _id: req.query.id });
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
const deleteSubParent = async (req, res) => {
  console.log(req.query);
  try {
    const result = await SubCategoryParent.findByIdAndDelete(req.query.id);
    res.status(200).json("OK");
  } catch (error) {
    res.status(500).json(error);
  }
};
const obj = {
  loginAdmin,
  loginVerify,
  getAllCoupons,
  createCoupon,
  updateCoupon,
  getCoupon,
  getAllUsers,
  getAllBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
  getAllSubChildren,
  createSubChildren,
  updateSubChildren,
  getSubChildren,
  deleteSubChildren,
  getAllSubParent,
  createSubParent,
  updateSubParent,
  getSubParent,
  deleteSubParent,
};
module.exports = obj;
