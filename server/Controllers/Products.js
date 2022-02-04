//importing models here
const product = require("../Models/product.js");
const Category = require("../Models/category.js");
const SubCategoryChild = require("../Models/childcat.js");
const SubCategoryParent = require("../Models/subcategory.js");
const newArrivals = async (req, res) => {
  //get all the products from the database from Product Model........
  try {
    const result = await product.find({}).limit(5).sort("createdAt");
    // .populate("category.MainCategory")
    // .populate("category.Subcategories.Parent_Subcategory")
    // .populate("category.Subcategories.Child_Subcategory");

    //reutrn the response object
    res.status(200).json(result);
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

const object = { newArrivals, categories };
module.exports = object;
