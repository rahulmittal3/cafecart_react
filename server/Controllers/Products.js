//importing models here
const product = require("../Models/product.js");
const Category = require("../Models/category.js");
const SubCategoryChild = require("../Models/childcat.js");
const SubCategoryParent = require("../Models/subcategory.js");
const Homepage = require("../Models/homepage.js");
const Product = require("../Models/product.js");
var shuffle = require("shuffle-array");
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
const object = {
  newArrivals,
  categories,
  categorySlug,
  variety,
  parentVariety,
  singleProduct,
  trending,
  best,
};
module.exports = object;
