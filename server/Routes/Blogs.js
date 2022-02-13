const express = require("express");

const BlogRouter = express.Router();
const { allBlogs, getParticularBlog } = require("../Controllers/Blogs.js");
BlogRouter.route("/all-blogs").get(allBlogs);
BlogRouter.route("/blog/:blogId").get(getParticularBlog);

module.exports = BlogRouter;
