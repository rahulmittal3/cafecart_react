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
const object = { allBlogs };
module.exports = object;
