const express = require("express");

const BlogRouter = express.Router();
const { allBlogs } = require("../Controllers/Blogs.js");
BlogRouter.route("/all-blogs").get(allBlogs);

module.exports = BlogRouter;
