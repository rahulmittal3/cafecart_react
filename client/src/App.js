import "./App.css";
import { useEffect, lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
//importing React-Compnents..........
import { Route, Routes } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { cartDetails } from "./Axios/Cart.js";
//importing pages........
import FallBack from "./FallBack.js";
const AboutUs = lazy(() => import("./Pages/AboutUs.js"));
const Blogs = lazy(() => import("./Pages/Blogs.js"));
const Coffee = lazy(() => import("./Pages/Coffee.js"));
const Machine = lazy(() => import("./Pages/Machine.js"));
const Pods = lazy(() => import("./Pages/Pods.js"));
const Root = lazy(() => import("./Pages/Root.js"));
const ShippingPolicy = lazy(() => import("./Pages/ShippingPolicy.js"));
const TermsOfUse = lazy(() => import("./Pages/TermsOfUse.js"));
const PrivacyPolicy = lazy(() => import("./Pages/PrivacyPolicy.js"));
const Home = lazy(() => import("./Pages/Root.js"));
const ChangePassword = lazy(() => import("./Pages/User/ChangePassword.js"));
const Profile = lazy(() => import("./Pages/User/Profile.js"));
const CategorySlug = lazy(() => import("./Pages/Products/CategorySlug.js"));
const SingleProduct = lazy(() => import("./Pages/Products/SingleProduct.js"));
const ProtectRoute = lazy(() => import("./Components/Utilities/ProtectRoutes"));
const ProductSearch = lazy(() => import("./Pages/Products/SearchProduct.js"));
const ParentVariety = lazy(() => import("./Pages/Products/ParentVariety.js"));
const Cart = lazy(() => import("./Pages/User/Cart.js"));
const Checkout = lazy(() => import("./Pages/User/Checkout.js"));
const Wishlist = lazy(() => import("./Pages/User/Wishlist.js"));
const Orders = lazy(() => import("./Pages/User/Orders.js"));
const EditProfile = lazy(() => import("./Pages/User/EditProfile.js"));
const SingleOrder = lazy(() => import("./Pages/User/SingleOrder.js"));
//header and footer
const Header = lazy(() => import("./Components/Header/Header.js"));
const NewHeader = lazy(() => import("./Components/Header/NewHeader.js"));
const Footer = lazy(() => import("./Components/Footer/Footer.js"));
const Variety = lazy(() => import("./Pages/Products/Variety.js"));
const NewBlogs = lazy(() => import("./Pages/Blogs/newBlogs.js"));
const IndividualBlog = lazy(() => import("./Pages/Blogs/IndividualBlog.js"));
const SingleBlog = lazy(() => import("./Pages/SingleBlog.js"));
const OrderSuccessPayment = lazy(() =>
  import("./Pages/User/OrderSuccessPayment.js")
);

//for admin users
const AdminAppBar = lazy(() => import("./Components/Admin/AdminAppBar.js"));
const AdminLogin = lazy(() => import("./Pages/Admin/Login.js"));
const AdminHome = lazy(() => import("./Pages/Admin/Home.js"));
const AdminCoupon = lazy(() => import("./Pages/Admin/Coupons.js"));
const ProtectRouteAdmin = lazy(() =>
  import("./Components/Admin/ProtectRouteAdmin.js")
);
const CreateCoupon = lazy(() => import("./Pages/Admin/CreateCoupon.js"));
const SingleCouponAdmin = lazy(() => import("./Pages/Admin/SingleCoupon.js"));
const AdminUser = lazy(() => import("./Pages/Admin/User.js"));
const AdminBlog = lazy(() => import("./Pages/Admin/Blog.js"));
const CreateBlog = lazy(() => import("./Pages/Admin/CreateBlog.js"));
const SingleBlogAdmin = lazy(() => import("./Pages/Admin/SingleBlog.js"));
const SubcategoriesChildren = lazy(() =>
  import("./Pages/Admin/SubcategoriesChildren.js")
);
const CreateSubcategoriesChildren = lazy(() =>
  import("./Pages/Admin/CreateSubcategoriesChildren.js")
);
const SingleSubcategoriesChildren = lazy(() =>
  import("./Pages/Admin/SingleSubcategoriesChildren.js")
);
const SubcategoriesParent = lazy(() =>
  import("./Pages/Admin/SubcategoriesParent.js")
);
const CreateSubcategoriesParent = lazy(() =>
  import("./Pages/Admin/CreateSubcategoriesParent.js")
);
const SingleSubcategoriesParent = lazy(() =>
  import("./Pages/Admin/SingleSubcategoriesParent.js")
);
const AdminCategory = lazy(() => import("./Pages/Admin/Category.js"));
const CreateCategory = lazy(() => import("./Pages/Admin/CreateCategory.js"));

const AdminProducts = lazy(() => import("./Pages/Admin/Products.js"));
const AdminSingleProduct = lazy(() => import("./Pages/Admin/SingleProduct"));
const AdminEditProduct = lazy(() => import("./Pages/Admin/EditProduct.js"));
const AdminCreateProduct = lazy(() => import("./Pages/Admin/CreateProduct.js"));

const ShippingCharges = lazy(() => import("./Pages/Admin/ShippingCharges.js"));
const CreateShippingCharge = lazy(() =>
  import("./Pages/Admin/CreateShippingCharge.js")
);
const SingleShippingCharge = lazy(() =>
  import("./Pages/Admin/SingleShippingCharge.js")
);
const EditShippingCharge = lazy(() =>
  import("./Pages/Admin/EditShippingCharge.js")
);

const Homepage = lazy(() => import("./Pages/Admin/Homepage.js"));
const CreateHomepage = lazy(() => import("./Pages/Admin/CreateHomepage.js"));
const SingleHomepage = lazy(() => import("./Pages/Admin/SingleHomepage.js"));
const EditHomepage = lazy(() => import("./Pages/Admin/EditHomepage.js"));

const AdminOrders = lazy(() => import("./Pages/Admin/Orders.js"));
const SingleAdminOrder = lazy(() => import("./Pages/Admin/SingleOrder.js"));
const AdminReviews = lazy(() => import("./Pages/Admin/Reviews.js"));
const CreateReview = lazy(() => import("./Pages/Admin/CreateReview.js"));
const BlogCategories = lazy(() => import("./Pages/Admin/BlogCategories.js"));
const CreateBlogCategory = lazy(() =>
  import("./Pages/Admin/CreateBlogCategory.js")
);
const EditBlogCategory = lazy(() =>
  import("./Pages/Admin/EditBlogCategory.js")
);

const BlogTags = lazy(() => import("./Pages/Admin/BlogTags.js"));
const CreateBlogTag = lazy(() => import("./Pages/Admin/CreateBlogTag.js"));
const EditBlogTag = lazy(() => import("./Pages/Admin/EditBlogTag.js"));

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
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
    <Suspense fallback={<FallBack />}>
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
    </Suspense>
  );
}

export default App;
