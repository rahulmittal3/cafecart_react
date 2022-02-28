const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const Coupon = require("../Models/couponcode.js");
const User = require("../Models/user.js");
const Blog = require("../Models/blog.js");
const SubCategoryChild = require("../Models/childcat.js");
const slugify = require("slugify");
const SubCategoryParent = require("../Models/subcategory.js");
const Category = require("../Models/category.js");
const Product = require("../Models/product.js");
const Shippingcharge = require("../Models/shippingcharges.js");
const Homepage = require("../Models/homepage.js");
const Order = require("../Models/order.js");
const NewOrder = require("../Models/newOrder.js");
var _ = require("lodash");
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

//-------------------for categories --------------------------\
const getAllCategories = async (req, res) => {
  try {
    const result = await Category.find({}).sort({ title: "ascending" });
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
const createCategory = async (req, res) => {
  const finalData = req.body.subcategories.filter((el) => {
    return el.Parent_Category || el.Child_Subcategory;
  });
  try {
    const slug = slugify(req.body.title);
    let query = new Category({
      title: req.body.title,
      slug: slug,
      Subcategories: finalData,
    });
    const result = await query.save();
    console.log(result);
    res.status(200).json("ok");
  } catch (error) {
    res.status(500).json("failed");
  }
};
const deleteCategory = async (req, res) => {
  console.log(req.query);
  try {
    const result = await Category.findByIdAndDelete(req.query.id);
    res.status(200).json("OK");
  } catch (error) {
    res.status(500).json(error);
  }
};

//---------------products ----------------
const getAllProducts = async (req, res) => {
  try {
    const result = await Product.find({}).sort({ title: "ascending" });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
const createProduct = async (req, res) => {
  console.log(req.body);
  let category = [];
  const obj = {
    MainCategory: req.body.MainCategory,
  };
  let x = [];
  for (let i = 0; i < req.body.Subcategories.length; i++) {
    let y = {
      Parent_Subcategory: req.body.Subcategories[i].ParentSubcategory,
      Child_Subcategory: req.body.Subcategories[i].ChildSubcategory,
    };
    x.push(y);
  }
  console.log(x);
  const g = {
    MainCategory: req.body.MainCategory,
    Subcategories: x,
  };
  category.push(g);

  const op = [];
  for (let i = 0; i < req.body.otherProducts.length; i++) {
    const obj = {
      code: req.body.otherProducts[i],
    };
    op.push(obj);
  }
  try {
    const query = new Product({
      imagePath: req.body.imagePath,
      codprepaid: req.body.codprepaid,
      title: req.body.title,
      price: req.body.price,
      mrpPrice: req.body.mrpPrice,
      available: req.body.available,
      productCode: req.body.productCode,
      description: req.body.description,
      manufacturer: req.body.manufacturer,
      specific_type: req.body.specific_type,
      specific_date: new Date(req.body.specific_date),
      otherProducts: op,
      short_description: req.body.short_description,
      specific_quantity: req.body.specific_quantity,
      specific_quantity: req.body.specific_quantity,
      specific_ingredients: "hello",
      description_use_first: req.body.description_use_first,
      description_use_second: req.body.description_use_second,
      description_use_third: req.body.description_use_third,
      category: category,
      recommended_quantity: req.body.recommendedProducts,
      specific_expiry_date: new Date(req.body.specific_expiry_date),
    });
    const result = await query.save();
    console.log(result);
    res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
// const updateSubParent = async (req, res) => {
//   console.log(req.body);
//   try {
//     const obj = req.body;
//     const find = await SubCategoryParent.findByIdAndUpdate(req.body._id, obj, {
//       new: true,
//     });
//     res.status(200).json("ok");
//   } catch (error) {
//     console.log(error);
//     res.status(500).json(error);
//   }
// };
const getProduct = async (req, res) => {
  console.log(req.query);
  try {
    const result = await Product.findOne({ _id: req.query.id });
    return res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
const deleteproduct = async (req, res) => {
  console.log(req.query);
  try {
    const result = await Product.findByIdAndDelete(req.query.id);
    res.status(200).json("OK");
  } catch (error) {
    res.status(500).json(error);
  }
};
const getAllShipping = async (req, res) => {
  try {
    const res1 = await Shippingcharge.find({});
    res.status(200).json(res1);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const createShipping = async (req, res) => {
  try {
    const query = new Shippingcharge({
      cartsize: req.body.cart,
      shipping_charge: req.body.charge,
    });
    const result = await query.save();
    return res.status(200).json("ok");
  } catch (error) {
    return res.status(400).json(error);
  }
};
const updateShipping = async (req, res) => {
  console.log(req.body);
  try {
    const obj = req.body;
    const find = await Shippingcharge.findByIdAndUpdate(req.body._id, obj, {
      new: true,
    });
    res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const getShipping = async (req, res) => {
  try {
    const result = await Shippingcharge.findOne({ _id: req.query.id });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};
const deleteShipping = async (req, res) => {
  try {
    const result = await Shippingcharge.findByIdAndDelete(req.query.id);
    res.status(200).json("OK");
  } catch (error) {
    res.status(500).json(error);
  }
};
const getAllHomepage = async (req, res) => {
  try {
    const res1 = await Homepage.find({});
    res.status(200).json(res1);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const createHomepage = async (req, res) => {
  console.log(req.body);
  try {
    const query = new Homepage({
      bannerImages: req.body.bannerImages,
      newArrivals: req.body.newArrivals,
      youMayLike: req.body.youMayLike,
      bestInBruh: req.body.bestInBruh,
      trending: req.body.trending,
      brands: req.body.brands,
    });
    const result = await query.save();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json("failed");
  }
};
const updateHomepage = async (req, res) => {
  console.log(req.body);
  try {
    const obj = req.body;
    const find = await Homepage.findByIdAndUpdate(req.body._id, obj, {
      new: true,
    });
    res.status(200).json("ok");
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const getHomepage = async (req, res) => {
  try {
    const result = await Homepage.findOne({ _id: req.query.id });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error);
  }
};
const deleteHomepage = async (req, res) => {
  try {
    const result = await Homepage.findByIdAndDelete(req.query.id);
    res.status(200).json("OK");
  } catch (error) {
    res.status(500).json(error);
  }
};
const getAllOrders = async (req, res) => {
  try {
    let box = [];
    const old = await Order.find({}).populate({ path: "user", User });
    box.push(...old);
    const newone = await NewOrder.find({}).populate({ path: "user", User });
    box.push(...newone);
    box = _.sortBy(box, [
      function (o) {
        return o.createdAt;
      },
    ]);
    res.status(200).json(box);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const getOrder = async (req, res) => {
  console.log(req.query);
  try {
    const old = await Order.findOne({ _id: req.query.id })
      .populate({
        path: "user",
        User,
      })
      .populate({ path: "cart.items.productId", Product });
    if (old) {
      return res.status(200).json(old);
    }
    const newone = await NewOrder.findOne({ _id: req.query.id })
      .populate({
        path: "user",
        User,
      })
      .populate({ path: "items.productId", Product });
    return res.status(200).json(newone);
  } catch (error) {
    console.log(error);
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
  getAllCategories,
  createCategory,
  deleteCategory,
  getAllProducts,
  getProduct,
  createProduct,
  getAllShipping,
  createShipping,
  updateShipping,
  getShipping,
  deleteShipping,
  getAllHomepage,
  createHomepage,
  updateHomepage,
  getHomepage,
  deleteHomepage,
  getAllOrders,
  getOrder,
  deleteproduct,
};
module.exports = obj;
