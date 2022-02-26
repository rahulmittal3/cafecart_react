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
export {
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
};
