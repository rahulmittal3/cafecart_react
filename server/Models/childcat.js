const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const subcategorychildSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    unique: true,
    slug: "title",
  },
});

const SubCategoryChild = mongoose.model(
  "SubCategoryChild",
  subcategorychildSchema
);
module.exports = SubCategoryChild;
