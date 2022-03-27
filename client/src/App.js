import "./App.css";
import React from "react";
import { ToastContainer } from "react-toastify";
//importing React-Compnents..........
import { Route, Routes } from "react-router-dom";

//importing pages........
import AboutUs from "./Pages/AboutUs.js";
import Blogs from "./Pages/Blogs.js";
import Coffee from "./Pages/Coffee.js";
import Machine from "./Pages/Machine.js";
import Pods from "./Pages/Pods.js";
import Root from "./Pages/Root.js";
import ShippingPolicy from "./Pages/ShippingPolicy.js";
import TermsOfUse from "./Pages/TermsOfUse.js";
import PrivacyPolicy from "./Pages/PrivacyPolicy.js";
import Home from "./Pages/Root.js";
import ChangePassword from "./Pages/User/ChangePassword.js";
import Profile from "./Pages/User/Profile.js";
import CategorySlug from "./Pages/Products/CategorySlug.js";
import SingleProduct from "./Pages/Products/SingleProduct.js";
import ProtectRoute from "./Components/Utilities/ProtectRoutes";
import ProductSearch from "./Pages/Products/SearchProduct.js";
import ParentVariety from "./Pages/Products/ParentVariety.js";
import Cart from "./Pages/User/Cart.js";
import Checkout from "./Pages/User/Checkout.js";
import Wishlist from "./Pages/User/Wishlist.js";
import Orders from "./Pages/User/Orders.js";
import EditProfile from "./Pages/User/EditProfile.js";
import SingleOrder from "./Pages/User/SingleOrder.js";
//header and footer
import Header from "./Components/Header/Header.js";
import NewHeader from "./Components/Header/NewHeader.js";
import Footer from "./Components/Footer/Footer.js";
import Variety from "./Pages/Products/Variety.js";
import NewBlogs from "./Pages/Blogs/newBlogs.js";
import IndividualBlog from "./Pages/Blogs/IndividualBlog.js";
import SingleBlog from "./Pages/SingleBlog.js";
import OrderSuccessPayment from "./Pages/User/OrderSuccessPayment.js";

//for admin users
import AdminAppBar from "./Components/Admin/AdminAppBar.js";
import AdminLogin from "./Pages/Admin/Login.js";
import AdminHome from "./Pages/Admin/Home.js";
import AdminCoupon from "./Pages/Admin/Coupons.js";
import ProtectRouteAdmin from "./Components/Admin/ProtectRouteAdmin.js";
import CreateCoupon from "./Pages/Admin/CreateCoupon.js";
import SingleCouponAdmin from "./Pages/Admin/SingleCoupon.js";
import AdminUser from "./Pages/Admin/User.js";
import AdminBlog from "./Pages/Admin/Blog.js";
import CreateBlog from "./Pages/Admin/CreateBlog.js";
import SingleBlogAdmin from "./Pages/Admin/SingleBlog.js";
import SubcategoriesChildren from "./Pages/Admin/SubcategoriesChildren.js";
import CreateSubcategoriesChildren from "./Pages/Admin/CreateSubcategoriesChildren.js";
import SingleSubcategoriesChildren from "./Pages/Admin/SingleSubcategoriesChildren.js";
import SubcategoriesParent from "./Pages/Admin/SubcategoriesParent.js";
import CreateSubcategoriesParent from "./Pages/Admin/CreateSubcategoriesParent.js";
import SingleSubcategoriesParent from "./Pages/Admin/SingleSubcategoriesParent.js";
import AdminCategory from "./Pages/Admin/Category.js";
import CreateCategory from "./Pages/Admin/CreateCategory.js";

import AdminProducts from "./Pages/Admin/Products.js";
import AdminSingleProduct from "./Pages/Admin/SingleProduct";
import AdminEditProduct from "./Pages/Admin/EditProduct.js";
import AdminCreateProduct from "./Pages/Admin/CreateProduct.js";

import ShippingCharges from "./Pages/Admin/ShippingCharges.js";
import CreateShippingCharge from "./Pages/Admin/CreateShippingCharge.js";
import SingleShippingCharge from "./Pages/Admin/SingleShippingCharge.js";
import EditShippingCharge from "./Pages/Admin/EditShippingCharge.js";

import Homepage from "./Pages/Admin/Homepage.js";
import CreateHomepage from "./Pages/Admin/CreateHomepage.js";
import SingleHomepage from "./Pages/Admin/SingleHomepage.js";
import EditHomepage from "./Pages/Admin/EditHomepage.js";

import AdminOrders from "./Pages/Admin/Orders.js";
import SingleAdminOrder from "./Pages/Admin/SingleOrder.js";
import AdminReviews from "./Pages/Admin/Reviews.js";
import CreateReview from "./Pages/Admin/CreateReview.js";
import BlogCategories from "./Pages/Admin/BlogCategories.js";
import CreateBlogCategory from "./Pages/Admin/CreateBlogCategory.js";
import EditBlogCategory from "./Pages/Admin/EditBlogCategory.js";

import BlogTags from "./Pages/Admin/BlogTags.js";
import CreateBlogTag from "./Pages/Admin/CreateBlogTag.js";
import EditBlogTag from "./Pages/Admin/EditBlogTag.js";

import { useSelector, useDispatch } from "react-redux";

import { cartDetails } from "./Axios/Cart.js";

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    let wishlist = [];
    if (window !== "undefined" && window.localStorage.getItem("wishlist")) {
      wishlist = JSON.parse(window.localStorage.getItem("wishlist"));
    }
    let local = [];
    if (window !== "undefined" && window.localStorage.getItem("cartLS")) {
      local = JSON.parse(window.localStorage.getItem("cartLS"));
    }
    let user = null;
    if (window !== "undefined" && window.localStorage.getItem("user")) {
      user = JSON.parse(window.localStorage.getItem("user"));
    }
    let directCheckout = false;
    if (
      window !== "undefined" &&
      window.localStorage.getItem("directCheckout")
    ) {
      directCheckout = JSON.parse(
        window.localStorage.getItem("directCheckout")
      );
    }

    dispatch({
      type: "CART",
      payload: local,
    });
    dispatch({
      type: "USER_CHANGED",
      payload: user,
    });
    dispatch({
      type: "WISHLIST",
      payload: wishlist,
    });
    dispatch({
      type: "DIRECT_CHECKOUT",
      payload: directCheckout,
    });
  }, []);

  return (
    <>
      <ToastContainer />

      <Routes>
        <Route
          path="/"
          exact
          element={
            <>
              <NewHeader />
              <Root />
              <Footer />
            </>
          }
        />
        <Route
          path="/pages/about-us"
          exact
          element={
            <>
              <NewHeader />
              <AboutUs />
              <Footer />
            </>
          }
        />
        <Route
          path="/products/category/:slug"
          exact
          element={
            <>
              <NewHeader />
              <CategorySlug />
              <Footer />
            </>
          }
        />
        <Route
          path="/products/search/:keyword"
          exact
          element={
            <>
              <NewHeader />
              <ProductSearch />
              <Footer />
            </>
          }
        />
        SearchProduct
        <Route
          path="/blog"
          exact
          element={
            <>
              <NewHeader />
              <Blogs />
              <Footer />
            </>
          }
        />
        <Route
          path="/new-blogs"
          exact
          element={
            <>
              <NewHeader />
              <NewBlogs />
              <Footer />
            </>
          }
        />
        <Route
          path="/blog/:blogId"
          exact
          element={
            <>
              <NewHeader />
              <SingleBlog />
              <Footer />
            </>
          }
        />
        <Route
          path="/pages/terms-of-use"
          exact
          element={
            <>
              <NewHeader />
              <TermsOfUse />
              <Footer />
            </>
          }
        />
        <Route
          path="/pages/privacy-policy"
          exact
          element={
            <>
              <NewHeader />
              <PrivacyPolicy />
              <Footer />
            </>
          }
        />
        <Route
          path="/pages/shipping-policy"
          exact
          element={
            <>
              <NewHeader />
              <ShippingPolicy />
              <Footer />
            </>
          }
        />
        <Route
          path="/products/:id"
          exact
          element={
            <>
              {" "}
              <NewHeader />
              <SingleProduct />
              <Footer />
            </>
          }
        />{" "}
        <Route
          path="/user/profile"
          exact
          element={
            <>
              <NewHeader />
              <ProtectRoute>
                <Profile />
              </ProtectRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/home"
          exact
          element={
            <>
              <NewHeader />
              <ProtectRoute>
                <Home />
              </ProtectRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/change-password"
          exact
          element={
            <>
              <NewHeader />
              <ProtectRoute>
                <ChangePassword />
              </ProtectRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/products/category/:id1/:id2/:id3"
          exact
          element={
            <>
              <NewHeader />

              <Variety />
              <Footer />
            </>
          }
        />
        <Route
          path="/wishlist"
          exact
          element={
            <>
              <NewHeader />

              <Wishlist />
              <Footer />
            </>
          }
        />
        <Route
          path="/products/category/:id1/:id2"
          exact
          element={
            <>
              <NewHeader />
              <ParentVariety />
              <Footer />
            </>
          }
        />
        <Route
          path="/cart"
          exact
          element={
            <>
              <NewHeader />
              <Cart />
              <Footer />
            </>
          }
        />
        <Route
          path="/checkout"
          exact
          element={
            <>
              <NewHeader />
              <ProtectRoute>
                <Checkout />
              </ProtectRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/payment-success"
          exact
          element={
            <>
              <NewHeader />
              <ProtectRoute>
                <OrderSuccessPayment />
              </ProtectRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/user/orders"
          exact
          element={
            <>
              <NewHeader />
              <ProtectRoute>
                <Orders />
              </ProtectRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/user/edit-profile"
          exact
          element={
            <>
              <NewHeader />
              <ProtectRoute>
                <EditProfile />
              </ProtectRoute>
              <Footer />
            </>
          }
        />
        <Route
          path="/user/order/:orderId"
          exact
          element={
            <>
              <NewHeader />
              <ProtectRoute>
                <SingleOrder />
              </ProtectRoute>
              <Footer />
            </>
          }
        />
        {/* FOR ADMIN DEFINED ROUTES*/}
        <Route path="/admin/login" exact element={<AdminLogin />} />
        <Route
          path="/admin"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <AdminHome />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/coupons"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <AdminCoupon />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/coupon/new"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <CreateCoupon />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/coupon/:id"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <SingleCouponAdmin />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/users"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <AdminUser />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/blogs"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <AdminBlog />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/blog/new"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <CreateBlog />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/blog/:id"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <SingleBlogAdmin />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/subcategory-children"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <SubcategoriesChildren />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/subcategory-children/new"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <CreateSubcategoriesChildren />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/subcategory-children/:id"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <SingleSubcategoriesChildren />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/subcategory-parent"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <SubcategoriesParent />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/subcategory-parent/new"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <CreateSubcategoriesParent />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/subcategory-parent/:id"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <SingleSubcategoriesParent />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/category"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <AdminCategory />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/category/new"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <CreateCategory />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/products"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <AdminProducts />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/product/new"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <AdminCreateProduct />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/product/:id"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <AdminSingleProduct />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/product/:id/edit"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <AdminEditProduct />
            </ProtectRouteAdmin>
          }
        />
        {/*for shipping charges*/}
        <Route
          path="/admin/shipping-charges"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <ShippingCharges />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/shipping-charge/new"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <CreateShippingCharge />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/shipping-charge/:id"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <SingleShippingCharge />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/shipping-charge/:id/edit"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <EditShippingCharge />
            </ProtectRouteAdmin>
          }
        />
        {/*FOR HOMEPAGE */}
        <Route
          path="/admin/home-page"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <Homepage />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/home-page/new"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <CreateHomepage />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/home-page/:id"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <SingleHomepage />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/home-page/:id/edit"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <EditHomepage />
            </ProtectRouteAdmin>
          }
        />
        {/*For Orders*/}
        <Route
          path="/admin/orders"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <AdminOrders />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/order/:id"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <SingleAdminOrder />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/reviews"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <AdminReviews />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/review/new"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <CreateReview />
            </ProtectRouteAdmin>
          }
        />
        {/*FOR BLOG CATEGORIES*/}
        <Route
          path="/admin/blogs/categories"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <BlogCategories />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/blogs/category/new"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <CreateBlogCategory />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/blog-category/:blogCategoryId/edit"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <EditBlogCategory />
            </ProtectRouteAdmin>
          }
        />
        {/*FOR BLOG TAGS*/}
        <Route
          path="/admin/blogs/tags"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <BlogTags />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/blogs/tag/new"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <CreateBlogTag />
            </ProtectRouteAdmin>
          }
        />
        <Route
          path="/admin/blog-tag/:tagId/edit"
          exact
          element={
            <ProtectRouteAdmin>
              <AdminAppBar />
              <EditBlogTag />
            </ProtectRouteAdmin>
          }
        />
      </Routes>
    </>
  );
}

export default App;
