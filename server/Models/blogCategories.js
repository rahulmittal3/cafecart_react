const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogCategories = Schema({
  categoryName: String,
  iconLink: String,
});

module.exports = mongoose.model("BlogCategoriesModel", blogCategories);
