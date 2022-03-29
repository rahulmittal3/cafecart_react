const blog = require("../Models/blog.js");
const BlogCategoriesModel = require("../Models/blogCategories.js");
const BlogTagsModel = require("../Models/blogTags.js");
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
    const otherBlogs = await blog
      .find({})
      .skip(currPage * perPage)
      .limit(perPage);
    const rand = await blog.aggregate([{ $sample: { size: 2 } }]);
    res
      .status(200)
      .json({ blogs: allBlogs, total: countBlogs, otherBlogs: rand[0] });
  } catch (error) {
    res.status(400).json(error);
  }
};

const getParticularBlog = async (req, res) => {
  try {
    const result = await blog
      .findOne({ _id: req.params.blogId })
      .populate({ path: "tags", BlogTagsModel })
      .populate({ path: "category", BlogCategoriesModel });
    const rand = await blog.aggregate([{ $sample: { size: 2 } }]);
    return res.status(200).json({ blog: result, other: rand[0] });
  } catch (error) {
    console.log(error);
    return res.status(404).json(error);
  }
};
const getTagsAndCategories = async (req, res) => {
  const x1 = await BlogCategoriesModel.find({}).sort({ categoryName: 1 });
  const x2 = await BlogTagsModel.find({}).sort({ tagName: 1 });

  return res.status(200).json({ tags: x2, categories: x1 });
};
const object = { allBlogs, getParticularBlog, getTagsAndCategories };
module.exports = object;
