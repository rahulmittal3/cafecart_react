const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const slug = require("mongoose-slug-updater");

mongoose.plugin(slug);

const subcategoryParentSchema = Schema({
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

const SubCategoryParent = mongoose.model(
  "SubCategoryParent",
  subcategoryParentSchema
);
module.exports = SubCategoryParent;
