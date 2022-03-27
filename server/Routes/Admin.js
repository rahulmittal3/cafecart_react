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
  getAllCategories,
  createCategory,
  deleteCategory,
  getAllProducts,
  getProduct,
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
  createProduct,
  deleteproduct,
  getAllReviews,
  deleteReview,
  createReview,
  getAllBlogsCategories,
  getBlogsCategory,
  createBlogCategory,
  deleteBlogCategory,
  updateBlogCategory,
  getAllBlogsTags,
  getBlogsTag,
  createBlogTag,
  deleteBlogTag,
  updateBlogTag,
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
//----------------------------- FOR CATEGORIES -------------------------------------
AdminRouter.route("/admin/get-all-categories").get(
  isAdminValid,
  getAllCategories
);
AdminRouter.route("/admin/create-category").post(isAdminValid, createCategory);
AdminRouter.route("/admin/delete-category").delete(
  isAdminValid,
  deleteCategory
);

//--------------------for products--------------------
AdminRouter.route("/admin/get-all-products").get(isAdminValid, getAllProducts);
AdminRouter.route("/admin/create-product").post(isAdminValid, createProduct);
AdminRouter.route("/admin/get-product").get(isAdminValid, getProduct);
// AdminRouter.route("/admin/update-sub-parent").put(
//   isAdminValid,
//   updateSubParent
// );
AdminRouter.route("/admin/delete-product").delete(isAdminValid, deleteproduct);
//-----------------------------------------------SHIPPING CHARGE---------------------------------------------------------
AdminRouter.route("/admin/get-all-shipping").get(isAdminValid, getAllShipping);
AdminRouter.route("/admin/create-shipping").post(isAdminValid, createShipping);
AdminRouter.route("/admin/get-shipping").get(isAdminValid, getShipping);
AdminRouter.route("/admin/update-shipping").put(isAdminValid, updateShipping);
AdminRouter.route("/admin/delete-shipping").delete(
  isAdminValid,
  deleteShipping
);

//---------------------------------------- HOMEPAGE --------------------------------------------
AdminRouter.route("/admin/get-all-homepage").get(isAdminValid, getAllHomepage);
AdminRouter.route("/admin/create-homepage").post(isAdminValid, createHomepage);
AdminRouter.route("/admin/get-homepage").get(isAdminValid, getHomepage);
AdminRouter.route("/admin/update-homepage").put(isAdminValid, updateHomepage);
AdminRouter.route("/admin/delete-homepage").delete(
  isAdminValid,
  deleteHomepage
);

//for orders------------------------------------------------------------------------
AdminRouter.route("/admin/get-all-orders").get(isAdminValid, getAllOrders);
AdminRouter.route("/admin/get-order").get(isAdminValid, getOrder);

//for reviews------------------------------------------------------------------------
AdminRouter.route("/admin/get-all-reviews").get(isAdminValid, getAllReviews);
AdminRouter.route("/admin/delete-review").delete(isAdminValid, deleteReview);
AdminRouter.route("/admin/create-review").post(isAdminValid, createReview);

//for blogs categories------------------------------------------------------------------------
AdminRouter.route("/admin/get-blogs-categories").get(
  isAdminValid,
  getAllBlogsCategories
);
AdminRouter.route("/admin/get-blogs-category").get(
  isAdminValid,
  getBlogsCategory
);
AdminRouter.route("/admin/create-blogs-category").post(
  isAdminValid,
  createBlogCategory
);
AdminRouter.route("/admin/delete-blogs-category").delete(
  isAdminValid,
  deleteBlogCategory
);
AdminRouter.route("/admin/edit-blogs-category").patch(
  isAdminValid,
  updateBlogCategory
);
//for blogs tags------------------------------------------------------------------------
AdminRouter.route("/admin/get-blogs-tags").get(isAdminValid, getAllBlogsTags);
AdminRouter.route("/admin/get-blogs-tag").get(isAdminValid, getBlogsTag);
AdminRouter.route("/admin/create-blogs-tag").post(isAdminValid, createBlogTag);
AdminRouter.route("/admin/delete-blogs-tag").delete(
  isAdminValid,
  deleteBlogTag
);
AdminRouter.route("/admin/edit-blogs-tag").patch(isAdminValid, updateBlogTag);

module.exports = AdminRouter;
