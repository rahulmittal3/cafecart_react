const express = require("express");
const AdminRouter = express.Router();
const {
  loginAdmin,
  loginVerify,
  getAllCoupons,
  createCoupon,
  updateCoupon,
  getCoupon,
  getAllUsers,
  getAllBlogs,
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
} = require("../Controllers/Admin.js");
const { isAdminValid } = require("../Middlewares/isAdminValid.js");
AdminRouter.route("/admin/login").post(loginAdmin);
AdminRouter.route("/admin/verify").get(loginVerify);

AdminRouter.route("/admin/get-all-coupons").get(isAdminValid, getAllCoupons);
AdminRouter.route("/admin/create-coupon").post(isAdminValid, createCoupon);
AdminRouter.route("/admin/get-coupon").get(isAdminValid, getCoupon);
AdminRouter.route("/admin/update-coupon").patch(isAdminValid, updateCoupon);

AdminRouter.route("/admin/get-all-users").get(isAdminValid, getAllUsers);

AdminRouter.route("/admin/get-all-blogs").get(isAdminValid, getAllBlogs);
AdminRouter.route("/admin/create-blog").post(isAdminValid, createBlog);
AdminRouter.route("/admin/get-blog").get(isAdminValid, getBlog);
AdminRouter.route("/admin/update-blog").put(isAdminValid, updateBlog);
AdminRouter.route("/admin/delete-blog").delete(isAdminValid, deleteBlog);

AdminRouter.route("/admin/get-all-sub-children").get(
  isAdminValid,
  getAllSubChildren
);
AdminRouter.route("/admin/create-sub-children").post(
  isAdminValid,
  createSubChildren
);
AdminRouter.route("/admin/get-sub-children").get(isAdminValid, getSubChildren);
AdminRouter.route("/admin/update-sub-children").put(
  isAdminValid,
  updateSubChildren
);
AdminRouter.route("/admin/delete-sub-children").delete(
  isAdminValid,
  deleteSubChildren
);
//--------------------------------------------------------------------------------------------------------
AdminRouter.route("/admin/get-all-sub-parent").get(
  isAdminValid,
  getAllSubParent
);
AdminRouter.route("/admin/create-sub-parent").post(
  isAdminValid,
  createSubParent
);
AdminRouter.route("/admin/get-sub-parent").get(isAdminValid, getSubParent);
AdminRouter.route("/admin/update-sub-parent").put(
  isAdminValid,
  updateSubParent
);
AdminRouter.route("/admin/delete-sub-parent").delete(
  isAdminValid,
  deleteSubParent
);
module.exports = AdminRouter;
