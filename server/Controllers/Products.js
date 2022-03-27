//importing models here
const product = require("../Models/product.js");
const Category = require("../Models/category.js");
const SubCategoryChild = require("../Models/childcat.js");
const SubCategoryParent = require("../Models/subcategory.js");
const Homepage = require("../Models/homepage.js");
const Product = require("../Models/product.js");
var shuffle = require("shuffle-array");
const Review = require("../Models/reviews.js");
const newArrivals = async (req, res) => {
  //get all the products from the database from Product Model........
  try {
    const homepagedata = await Homepage.findOne({});
    let newArrivals = await Product.find()
      .where("productCode")
      .in(homepagedata.newArrivals)
      .exec();
    shuffle(newArrivals);
    res.status(200).json(newArrivals);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const searchedItems = async (req, res) => {
  console.log(req.params);
  try {
    var reg = new RegExp(`${req.params.keyword}`, "i");
    const result = await Product.find({ title: reg }).sort({ price: 1 });
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error);
  }
};
const trending = async (req, res) => {
  try {
    const homepagedata = await Homepage.findOne({});
    let trending = await Product.find()
      .where("productCode")
      .in(homepagedata.trending)
      .exec();
    shuffle(trending);
    res.status(200).json(trending);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const best = async (req, res) => {
  try {
    const homepagedata = await Homepage.findOne({});
    let best = await Product.find()
      .where("productCode")
      .in(homepagedata.bestInBruh)
      .exec();
    shuffle(best);
    res.status(200).json(best);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
const categories = async (req, res) => {
  try {
    const foundCategory = await Category.find({})
      .populate({
        path: "Subcategories.Child_Subcategory",
        SubCategoryChild,
      })
      .populate({
        path: "Subcategories.Parent_Subcategory",
        SubCategoryParent,
      });

    res.status(200).json(foundCategory);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const categorySlug = async (req, res) => {
  console.log(req.params.slug);
  try {
    const foundCategory = await Category.findOne({ slug: req.params.slug })
      .populate({ path: "Subcategories.Parent_Subcategory", SubCategoryParent })
      .populate({ path: "Subcategories.Child_Subcategory", SubCategoryChild });
    //res.json(foundCategory);

    const sub = foundCategory;
    const maincatId = foundCategory._id;
    const allProducts = await product
      .find({
        "category.MainCategory": maincatId,
      })
      .sort("-createdAt")
      .populate({ path: "category.MainCategory", Category })
      .populate({
        path: "category.Subcategories.Parent_Subcategory",
        SubCategoryParent,
      })
      .populate({
        path: "category.Subcategories.Child_Subcategory",
        SubCategoryChild,
      });
    res.json(allProducts);
  } catch (error) {
    res.json(error);
  }
};

const variety = async (req, res) => {
  console.log(req.params);
  try {
    const foundCategory = await Category.findOne({ slug: req.params.id1 });
    const parentCategory = await SubCategoryParent.findOne({
      slug: req.params.id2,
    });
    const childCategory = await SubCategoryChild.findOne({
      slug: req.params.id3,
    });
    console.log(childCategory);
    const allProducts = await product
      .find({
        "category.MainCategory": foundCategory._id,
        "category.Subcategories.Parent_Subcategory": parentCategory._id,
        "category.Subcategories.Child_Subcategory": childCategory._id,
      })
      .sort("-createdAt")
      .populate({ path: "category.MainCategory", Category })
      .populate({
        path: "category.Subcategories.Parent_Subcategory",
        SubCategoryParent,
      })
      .populate({
        path: "category.Subcategories.Child_Subcategory",
        SubCategoryChild,
      });
    res.status(200).json(allProducts);
  } catch (error) {
    res.json(error);
  }
};

const parentVariety = async (req, res) => {
  console.log(req.params);
  try {
    const foundCategory = await Category.findOne({
      slug: req.params.id1,
    })
      .populate({
        path: "Subcategories.Child_Subcategory",
        SubCategoryChild,
      })
      .populate({
        path: "Subcategories.Parent_Subcategory",
        SubCategoryParent,
      });

    let data = [];
    foundCategory.Subcategories.forEach((element) => {
      if (req.params.id2 === element.Parent_Subcategory.slug) {
        data = element;
      }
    });
    const parentCategory = await SubCategoryParent.findOne({
      slug: req.params.id2,
    });
    const allProducts = await product
      .find({
        "category.MainCategory": foundCategory._id,
        "category.Subcategories.Parent_Subcategory": parentCategory._id,
      })
      .sort("-createdAt")
      .populate({ path: "category.MainCategory", Category })
      .populate({
        path: "category.Subcategories.Parent_Subcategory",
        SubCategoryParent,
      })
      .populate({
        path: "category.Subcategories.Child_Subcategory",
        SubCategoryChild,
      });

    // res.status(200).json(allProducts);
    res.json(allProducts);
  } catch (error) {
    res.json(error);
  }
};
const singleProduct = async (req, res) => {
  console.log(req.params);
  try {
    const p = await product
      .findById(req.params.id)
      .populate({ path: "category.MainCategory", Category })
      .populate({
        path: "category.Subcategories.Parent_Subcategory",
        SubCategoryParent,
      })
      .populate({
        path: "category.Subcategories.Child_Subcategory",
        SubCategoryChild,
      });
    // const products = await product.find({});
    // const product_reviews = await Review.findOne({
    //   productId: req.params.id,
    // });
    // let recomids = product.recommendedProducts.map((e) => {
    //   return e.code;
    // });
    // let recommends = await product.find()
    //   .where("productCode")
    //   .in(recomids)
    //   .exec();
    // let data = [];
    // if (product_reviews) {
    //   data = product_reviews.reviews;
    // }

    // let otherids = product.otherProducts.map((e) => {
    //   return e.code;
    // });
    //  let others = await product.find()
    //    .where("productCode")
    //    .in(otherids)
    //    .exec();

    console.log(p.title);
    res.json(p);
  } catch (error) {
    res.status(500).json(error);
  }
};
const otherProducts = async (req, res) => {
  const { name } = req.body;
  try {
    if (!name) {
      throw "Product Not Found!";
    }
    console.log(name);
    const regexp = new RegExp(name.split(" ")[0], "g");
    const result = await product.find({
      title: { $regex: regexp },
    });
    shuffle(result);
    const toReturn = result.slice(0, 5);
    res.status(200).json(toReturn);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const createReview = async (req, res) => {
  console.log("FROM REVIEW SECTION");
  try {
    //if we are here, it means we are logged in due to isLoggedIn Middlewares
    //step1  : get the product details from review DB
    const productReviewed = await Review.findOne({ productId: req.body.id });
    //what if no review is created for the product
    if (!productReviewed) {
      const object = {
        name: req.user.username,
        rating: req.body.star,
        comment: req.body.text,
        user: req.user._id,
        productId: req.body.id,
      };

      const query = new Review(object);
      const result = await query.save();
      console.log(result);
    } else {
      //if a new user reviews.....
      const u = await Review.findOne({ user: req.user._id });
      if (u) {
        const productReviewed = await Review.findOneAndUpdate(
          { user: req.user._id },
          { comment: req.body.text, rating: req.body.star },
          { new: true }
        );
        console.log(productReviewed);
      } else {
        const object = {
          name: req.user.username,
          rating: req.body.star,
          comment: req.body.text,
          user: req.user._id,
          productId: req.body.id,
        };

        const query = new Review(object);
        const result = await query.save();
        console.log(result);
      }
    }
    res.status(200).json("ok");
  } catch (error) {
    console.log(error);
  }
};
const getReviews = async (req, res) => {
  console.log(req.params);
  console.log("REVIEWS");
  try {
    const reviews = await Review.find({ productId: req.params.id });
    console.log(reviews);
    res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
const object = {
  searchedItems,
  newArrivals,
  categories,
  categorySlug,
  variety,
  parentVariety,
  singleProduct,
  trending,
  best,
  otherProducts,
  createReview,
  getReviews,
};
module.exports = object;
