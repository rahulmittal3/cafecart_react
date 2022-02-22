const blog = require("../Models/blog.js");
const allBlogs = async (req, res) => {
  try {
    console.log(req.query);
    //get all the blogs from the database
    const perPage = 4;
    const currPage = req.query.page || 1;
    const countBlogs = await blog.estimatedDocumentCount();
    const allBlogs = await blog
      .find({})
      .skip((currPage - 1) * perPage)
      .limit(perPage);
    res.status(200).json({ blogs: allBlogs, total: countBlogs });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getParticularBlog = async (req, res) => {
  try {
    const result = await blog.findOne({ _id: req.params.blogId });
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(404).json(error);
  }
};
const object = { allBlogs, getParticularBlog };
module.exports = object;
