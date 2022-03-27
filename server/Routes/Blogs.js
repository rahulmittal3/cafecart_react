const express = require("express");

const BlogRouter = express.Router();
const {
  allBlogs,
  getParticularBlog,
  getTagsAndCategories,
} = require("../Controllers/Blogs.js");
BlogRouter.route("/all-blogs").get(allBlogs);
BlogRouter.route("/blog/:blogId").get(getParticularBlog);
BlogRouter.route("/blogs/tags-and-categories").get(getTagsAndCategories);
module.exports = BlogRouter;
