const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogTags = Schema({
  tagName: String,
});

module.exports = mongoose.model("BlogTagsModel", blogTags);
