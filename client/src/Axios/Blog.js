import axios from "axios";
const allBlogs = async () => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/all-blogs`,
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
export { allBlogs, getParticularBlog };
