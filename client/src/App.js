import "./App.css";
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
import ParentVariety from "./Pages/Products/ParentVariety.js";
//header and footer
import Header from "./Components/Header/Header.js";
import Footer from "./Components/Footer/Footer.js";
import Variety from "./Pages/Products/Variety.js";
import NewBlogs from "./Pages/Blogs/newBlogs.js";
import IndividualBlog from "./Pages/Blogs/IndividualBlog.js";
function App() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Routes>
        <Route path="/" exact element={<Root />} />
        <Route path="/pages/about-us" exact element={<AboutUs />} />
        {/* <Route path="/products/category/coffee" exact element={<Coffee />} />
        <Route path="/products/category/pods" exact element={<Pods />} />
        <Route path="/products/category/machine" exact element={<Machine />} /> */}
        <Route
          path="/products/category/:slug"
          exact
          element={<CategorySlug />}
        />
        <Route path="/blog" exact element={<Blogs />} />
        <Route path="/new-blogs" exact element={<NewBlogs />} />
        <Route path="/new-blogs/:blogId" exact element={<IndividualBlog />} />
        <Route path="/pages/terms-of-use" exact element={<TermsOfUse />} />
        <Route path="/pages/privacy-policy" exact element={<PrivacyPolicy />} />
        <Route
          path="/pages/shipping-policy"
          exact
          element={<ShippingPolicy />}
        />
        <Route path="/products/:id" exact element={<SingleProduct />} />{" "}
        <Route
          path="/user/profile"
          exact
          element={
            <ProtectRoute>
              <Profile />
            </ProtectRoute>
          }
        />
        <Route
          path="/home"
          exact
          element={
            <ProtectRoute>
              <Home />
            </ProtectRoute>
          }
        />
        <Route
          path="/change-password"
          exact
          element={
            <ProtectRoute>
              <ChangePassword />
            </ProtectRoute>
          }
        />
        <Route
          path="/products/category/:id1/:id2/:id3"
          exact
          element={<Variety />}
        />
        <Route
          path="/products/category/:id1/:id2"
          exact
          element={<ParentVariety />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
