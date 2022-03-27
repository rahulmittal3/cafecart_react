import axios from "axios";

const loginAdmin = async (data) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/login`,
    method: "POST",
    data: data,
  });
  return result;
};

const verifyAdmin = async (data) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/verify`,
    method: "GET",
    headers: {
      authorization: `Bearer ${data}`,
    },
  });
  return result;
};
const getAllCoupons = async (jwt) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-all-coupons`,
    method: "GET",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  });
  return result;
};
const createCoupon = async (body, jwt) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/create-coupon`,
    method: "POST",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    data: body,
  });
  return result;
};

const getCoupon = async (jwt, id) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-coupon`,
    method: "GET",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    params: { id: id },
  });
  return result;
};
const getUsers = async (jwt) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-all-users`,
    method: "GET",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  });
  return result;
};
const getBlogs = async (jwt) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-all-blogs`,
    method: "GET",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  });
  return result;
};
const createBlog = async (jwt, data) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/create-blog`,
    method: "POST",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    data: data,
  });
  return result;
};
const getBlog = async (jwt, id) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-blog`,
    method: "GET",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    params: { id: id },
  });
  return result;
};
const updateBlog = async (jwt, data) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/update-blog`,
    method: "PUT",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    data: data,
  });
  return result;
};

const deleteBlog = async (jwt, id) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/delete-blog`,
    method: "DELETE",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    params: {
      id: id,
    },
  });
  return result;
};

const getAllSubChildren = async (jwt) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-all-sub-children`,
    method: "GET",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  });
  return result;
};
const createSubChildren = async (jwt, data) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/create-sub-children`,
    method: "POST",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    data: data,
  });
  return result;
};
const updateSubChildren = async (jwt, data) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/update-sub-children`,
    method: "PUT",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    data: data,
  });
  return result;
};
const getSubChildren = async (jwt, id) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-sub-children`,
    method: "GET",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    params: { id: id },
  });
  return result;
};
const deleteSubChildren = async (jwt, id) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/delete-sub-children`,
    method: "DELETE",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    params: {
      id: id,
    },
  });
  return result;
};
//-----------------------------------------------------------------
const getAllSubParent = async (jwt) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-all-sub-parent`,
    method: "GET",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  });
  return result;
};
const createSubParent = async (jwt, data) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/create-sub-parent`,
    method: "POST",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    data: data,
  });
  return result;
};
const updateSubParent = async (jwt, data) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/update-sub-parent`,
    method: "PUT",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    data: data,
  });
  return result;
};
const getSubParent = async (jwt, id) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-sub-parent`,
    method: "GET",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    params: { id: id },
  });
  return result;
};
const deleteSubParent = async (jwt, id) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/delete-sub-parent`,
    method: "DELETE",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    params: {
      id: id,
    },
  });
  return result;
};
//------------------ FOR CATEGORIES -------------------------------
const getAllCategories = async (jwt) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-all-categories`,
    method: "GET",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  });
  return result;
};
const createCategory = async (jwt, data) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/create-category`,
    method: "POST",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    data: data,
  });
  return result;
};
const deleteCategory = async (jwt, id) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/delete-category`,
    method: "DELETE",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    params: {
      id: id,
    },
  });
  return result;
};

//------------------------------- Products ---------------------------------------//
const getAllProducts = async (jwt) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-all-products`,
    method: "GET",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  });
  return result;
};
const createProduct = async (jwt, data) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/create-product`,
    method: "POST",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    data: data,
  });
  return result;
};
// const updateSubChildren = async (jwt, data) => {
//   const result = await axios({
//     url: `${process.env.REACT_APP_BACKEND_URL}/admin/update-sub-children`,
//     method: "PUT",
//     headers: {
//       authorization: `Bearer ${jwt}`,
//     },
//     data: data,
//   });
//   return result;
// };
const getProduct = async (jwt, id) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-product`,
    method: "GET",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    params: { id: id },
  });
  return result;
};
const deleteProduct = async (jwt, id) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/delete-product`,
    method: "DELETE",
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    params: {
      id: id,
    },
  });
  return result;
};
const getAllShipping = async (jwt) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-all-shipping`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  });
  return result;
};
const createShipping = async (jwt, data) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/create-shipping`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    data: data,
  });
  return result;
};
const updateShipping = async (jwt, data) => {
  const result = await axios({
    method: "PUT",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/update-shipping`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    data: data,
  });
  return result;
};
const getShipping = async (jwt, id) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-shipping`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    params: {
      id: id,
    },
  });
  return result;
};
const deleteShipping = async (jwt, id) => {
  const result = await axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/delete-shipping`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    params: {
      id: id,
    },
  });
  return result;
};

//-------for homepage--------------
const getAllHomepage = async (jwt) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-all-homepage`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  });
  return result;
};
const createHomepage = async (jwt, data) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/create-homepage`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    data: data,
  });
  return result;
};
const updateHomepage = async (jwt, data) => {
  const result = await axios({
    method: "PUT",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/update-homepage`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    data: data,
  });
  return result;
};
const getHomepage = async (jwt, id) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-homepage`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    params: {
      id: id,
    },
  });
  return result;
};
const deleteHomepage = async (jwt, id) => {
  console.log(id);
  const result = await axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/delete-homepage`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    params: {
      id: id,
    },
  });
  return result;
};

const getAllOrders = async (jwt) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-all-orders`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  });
  return result;
};
const getOrder = async (jwt, id) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-order`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    params: {
      id: id,
    },
  });
  return result;
};

const getAllReviews = async (jwt) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-all-reviews`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  });
  return result;
};
const deleteReview = async (jwt, id) => {
  const result = await axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/delete-review`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    params: {
      id: id,
    },
  });
  return result;
};
const createReview = async (jwt, data) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/create-review`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },

    data: data,
  });
  return result;
};
//all Categories
const getAllBlogsCategories = async (jwt) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-blogs-categories`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  });
  return result;
};
const getBlogsCategory = async (jwt, id) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-blogs-category`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    params: { id: id },
  });
  return result;
};
const createBlogCategory = async (jwt, data) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/create-blogs-category`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    data: data,
  });
  return result;
};
const deleteBlogCaetgory = async (jwt, id) => {
  const result = await axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/delete-blogs-category`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    params: {
      id: id,
    },
  });
  return result;
};
const updateBlogCategory = async (jwt, data) => {
  const result = await axios({
    method: "PATCH",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/edit-blogs-category`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    data: data,
  });
  return result;
};
//FOR BLOGS TAGS
const getAllBlogsTags = async (jwt) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-blogs-tags`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  });
  return result;
};
const getBlogsTag = async (jwt, id) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/get-blogs-tag`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    params: { id: id },
  });
  return result;
};
const createBlogTag = async (jwt, data) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/create-blogs-tag`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    data: data,
  });
  return result;
};
const deleteBlogTag = async (jwt, id) => {
  const result = await axios({
    method: "DELETE",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/delete-blogs-tag`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    params: {
      id: id,
    },
  });
  return result;
};
const updateBlogTag = async (jwt, data) => {
  const result = await axios({
    method: "PATCH",
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/edit-blogs-tag`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    data: data,
  });
  return result;
};
export {
  getAllBlogsCategories,
  createBlogCategory,
  getBlogsCategory,
  deleteBlogCaetgory,
  updateBlogCategory,
  getAllBlogsTags,
  createBlogTag,
  getBlogsTag,
  deleteBlogTag,
  updateBlogTag,
  loginAdmin,
  verifyAdmin,
  getAllCoupons,
  createCoupon,
  getCoupon,
  getUsers,
  getBlogs,
  createBlog,
  getBlog,
  updateBlog,
  deleteBlog,
  getAllSubChildren,
  createSubChildren,
  updateSubChildren,
  getSubChildren,
  deleteSubChildren,
  getAllSubParent,
  createSubParent,
  updateSubParent,
  getSubParent,
  deleteSubParent,
  getAllCategories,
  createCategory,
  deleteCategory,
  getAllProducts,
  getProduct,
  createProduct,
  getAllShipping,
  createShipping,
  updateShipping,
  getShipping,
  deleteShipping,
  getAllHomepage,
  createHomepage,
  updateHomepage,
  getHomepage,
  deleteHomepage,
  getAllOrders,
  getOrder,
  deleteProduct,
  getAllReviews,
  deleteReview,
  createReview,
};
