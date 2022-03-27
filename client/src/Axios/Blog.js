import axios from "axios";
const allBlogs = async (page) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/all-blogs`,
    params: { page: page },
  });
  return result;
};

const getParticularBlog = async (id) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/blog/${id}`,
  });
  return result;
};
const getTagsAndCategories = async () => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/blogs/tags-and-categories`,
  });
  return result;
};
export { allBlogs, getParticularBlog, getTagsAndCategories };
