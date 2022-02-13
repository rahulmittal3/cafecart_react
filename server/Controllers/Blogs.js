const blog = require("../Models/blog.js");
const allBlogs = async (req, res) => {
  try {
    //get all the blogs from the database
    const allBlogs = await blog.find({});
    res.status(200).json(allBlogs);
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
