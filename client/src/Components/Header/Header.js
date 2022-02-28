import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { categories } from "../../Axios/Products.js";
import { useDispatch } from "react-redux";
import SignUpModal from "../../Modals/SignUpModal.js";
import { toast } from "react-toastify";
import { slide as Menu } from "react-burger-menu";
import fancy from "./Header.module.css";
import Drawerr from "./Drawerr.js";
import Drawerrr from "../Cart/Drawer.js";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import * as All from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { updatePassword } from "../../Axios/Authentication.js";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
// import Badge from "@mui/material/Badge";
import { Badge } from "antd";
const Header = () => {
  const [headers, setHeaders] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [on, setOn] = useState(false);
  const [fp, setfp] = useState({});
  const [loading, setLoading] = useState(false);
  let subtitle;
  const getHeaders = () => {
    categories()
      .then((res) => setHeaders(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getHeaders();
  }, []);
  function openModal() {
    setIsOpen(true);
    document.querySelector("#root").style.display = "none";
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }
  Modal.setAppElement("#modal");
  function closeModal() {
    setIsOpen(false);
    document.querySelector("#root").style.display = "block";
  }
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
    },
  };
  const dispatch = useDispatch();
  let local = [];
  if (window !== "undefined" && window.localStorage.getItem("cart")) {
    local = JSON.parse(window.localStorage.getItem("cart"));
  }
  const { user, cart, wishlist } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();

  const logoutHandler = () => {
    //clear the redux and localstorage...state
    if (window !== "undefined" && window.localStorage.getItem("user")) {
      window.localStorage.removeItem("user");
    }
    //clear the redux.

    dispatch({
      type: "USER_CHANGED",
      payload: null,
    });
    toast.success("Logged Out Successfully");
    window.location.reload("/");
  };
  const [show, setShow] = useState(false);
  const handleFp = (e) => {
    console.log(user);
    e.preventDefault();
    if (!fp.previous || !fp.current || !fp.currentVerified) {
      toast.error("Please Fill in All the Details Carefully!");
      return;
    }
    setLoading(true);
    //otherwise, proceed to submit the form...
    const randomString = user?.jwt ? user.jwt : "randomString";
    updatePassword(randomString, fp)
      .then((res) => {
        toast.success("Password Changed Successfully");
        setfp({});
        setLoading(false);
        setOn(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data);
      });
  };
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <SignUpModal />
      </Modal>
      <All.Modal open={on} onClose={(e) => setOn(false)} center>
        <div className={fancy.FPBackground}>
          <h2 className={fancy.FPHead}>Change Password</h2>
          <form onSubmit={handleFp}>
            <input
              type="password"
              className={fancy.FPInput}
              placeholder="Current Password"
              onChange={(e) => setfp({ ...fp, previous: e.target.value })}
              value={fp?.previous}
            />
            <input
              type="password"
              className={fancy.FPInput}
              placeholder="New Password"
              onChange={(e) => setfp({ ...fp, current: e.target.value })}
              value={fp?.current}
            />
            <input
              type="text"
              className={fancy.FPInput}
              placeholder="Confirm Password"
              onChange={(e) =>
                setfp({ ...fp, currentVerified: e.target.value })
              }
              value={fp?.currentVerified}
            />

            <label className={fancy.FPLabel}>
              * Passwords are Case-Sensitive
            </label>
            <center>
              <input
                type="submit"
                className={fancy.FPSubmit}
                value={loading ? "Please Wait..." : "Change Password"}
              />
            </center>
          </form>
        </div>
      </All.Modal>

      <header style={{ position: "relative", height: 70 }}>
        <div className="container-menu-desktop">
          <Drawerrr show={show} setShow={setShow} />
          <div className="wrap-menu-desktop">
            <nav
              className="limiter-menu-desktop "
              style={{ maxWidth: "100vw" }}
            >
              <Link to="/" className="logo">
                {/* <img src="images/icons/logo-01.png" alt="IMG-LOGO"> */}
                <h2
                  style={{
                    fontSize: 25,
                    fontFamily: '"Varela Round", sans-serif',
                    fontWeight: 700,
                    marginBottom: "0rem",
                  }}
                  className="custom"
                >
                  CafeCart
                </h2>
              </Link>
              <ul className="main-menu ">
                <li className="nav-item">
                  <Link className="nav-link nav_item" to="/pages/about-us">
                    About Us
                  </Link>
                </li>
                {headers.length > 0 &&
                  headers.map((curr, index) => {
                    return (
                      <li className="nav-item dropdown">
                        <Link
                          className="nav-link nav_item"
                          to={`/products/category/${curr.slug}`}
                          id="navbarDropdown"
                          aria-haspopup="true"
                          aria-expanded="false"
                        >
                          {curr.title}
                        </Link>
                        <div
                          className="dropdown-menu  "
                          aria-labelledby="navbarDropdown"
                          style={{ top: 62 }}
                        >
                          <div class="dropdown-menu-container">
                            {curr.Subcategories.length > 0 &&
                              curr.Subcategories.map((sub, index) => {
                                return (
                                  <div
                                    class="dropdown-menu-subsection"
                                    key={index}
                                  >
                                    <Link
                                      className="dropdown-item-header"
                                      to={`/products/category/${curr.slug}/${sub.Parent_Subcategory.slug}`}
                                    >
                                      {sub.Parent_Subcategory.title}
                                    </Link>
                                    <div class="dropdown-item-container">
                                      {sub.Child_Subcategory.length > 0 &&
                                        sub.Child_Subcategory.map(
                                          (last, index) => {
                                            return (
                                              <Link
                                                key={index}
                                                className="dropdown-item"
                                                to={`/products/category/${curr.slug}/${sub.Parent_Subcategory.slug}/${last.slug}`}
                                              >
                                                {last.title}
                                              </Link>
                                            );
                                          }
                                        )}
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </li>
                    );
                  })}
                <li className="nav-item">
                  <Link to="/blog" class=" nav-link nav_item">
                    Blogs
                  </Link>
                </li>
              </ul>
              {/* {//right section} */}
              <div className="wrap-icon-header flex-w flex-r-m">
                <div className="search-container">
                  <div className="search-box-container">
                    <form autoComplete="off">
                      <div className="search-box">
                        <input
                          id="search-input"
                          name="search"
                          className="form-control"
                          type="text"
                          placeholder="Search for items, brands & inspiration"
                        />
                        <button className="search-button">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={19}
                            height={19}
                            viewBox="0 0 19 19"
                          >
                            <path
                              fill="#212121"
                              stroke="#000"
                              strokeWidth=".2"
                              d="M18.78 17.722l-4.328-4.328A7.588 7.588 0 0 0 8.585 1a7.586 7.586 0 1 0 0 15.171 7.546 7.546 0 0 0 4.806-1.715l4.327 4.324 1.062-1.058zm-10.194-3.06a6.084 6.084 0 0 1-6.08-6.076c0-3.35 2.726-6.08 6.08-6.08a6.09 6.09 0 0 1 6.08 6.08c0 3.35-2.73 6.076-6.08 6.076z"
                            />
                          </svg>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                {user && (
                  <li className="nav-item dropdown">
                    {user && (
                      <Link id="navbarDropdown" to="/home">
                        <div
                          className="header-user icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11"
                          style={{ height: 60, marginTop: 32 }}
                        >
                          <i className="zmdi zmdi-account-circle" />
                        </div>
                      </Link>
                    )}
                    {!user && (
                      <Link id="navbarDropdown" to="/">
                        <div
                          className="header-user icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11"
                          style={{ height: 60, marginTop: 32 }}
                        >
                          <i className="zmdi zmdi-account-circle" />
                        </div>
                      </Link>
                    )}
                    <div
                      className="dropdown-menu  "
                      aria-labelledby="navbarDropdown"
                      style={{ left: "-20px", top: 80 }}
                    >
                      {" "}
                      <Link className="dropdown-item" to="/user/profile">
                        <div className="dropdown-menu-container">
                          <div
                            className="dropdown-menu-subsection"
                            style={{ display: "flex" }}
                          >
                            Profile &nbsp;
                            <i
                              className="fa fa-angle-right"
                              style={{ fontSize: 20 }}
                            />
                          </div>
                        </div>
                      </Link>
                      <Link className="dropdown-item" to="#">
                        <div className="dropdown-menu-container">
                          <div
                            className="dropdown-menu-subsection"
                            style={{ display: "flex" }}
                            onClick={(e) => setOn(true)}
                          >
                            Change Password &nbsp;
                            <i
                              className="fa fa-angle-right"
                              style={{ fontSize: 20 }}
                            />
                          </div>
                        </div>
                      </Link>
                      <p
                        className="dropdown-item"
                        style={{ cursor: "pointer" }}
                        onClick={logoutHandler}
                      >
                        <div className="dropdown-menu-container">
                          <div
                            className="dropdown-menu-subsection"
                            style={{ display: "flex" }}
                          >
                            Logout &nbsp;
                            <i
                              className="fa fa-angle-right"
                              style={{ fontSize: 20 }}
                            />
                          </div>
                        </div>
                      </p>
                    </div>
                  </li>
                )}
                {!user && (
                  <li className="nav-item dropdown">
                    {/* <a href="/" id="navbarDropdown"> */}
                    <div
                      className="header-user icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11"
                      style={{ height: 60, marginTop: 32 }}
                    >
                      <i className="zmdi zmdi-account-circle" />
                    </div>
                    {/* </a> */}
                    <div
                      className="dropdown-menu  "
                      aria-labelledby="navbarDropdown"
                      style={{ left: "-20px", top: 80 }}
                    >
                      <div className="dropdown-menu-container">
                        <div
                          className="dropdown-menu-subsection"
                          style={{ display: "flex" }}
                          onClick={openModal}
                        >
                          Login &nbsp;
                          <i
                            className="fa fa-angle-right"
                            style={{ fontSize: 20 }}
                          />
                        </div>
                      </div>
                    </div>
                  </li>
                )}
                {/* <div
                  className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart"
                  data-notify
                  id="js-cart"
                >
                  <ShoppingCartIcon />
                </div> */}
                <div className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11">
                  <Badge
                    count={local?.length}
                    color="warning"
                    showZero={false}
                    onClick={(e) => setShow(!show)}
                  >
                    <ShoppingCartIcon
                      sx={{ fontSize: 28 }}
                      // onClick={(e) => setCartd(!cartd)}
                    />
                  </Badge>
                </div>

                <div
                  className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11"
                  // onclick="postdata()"
                >
                  <Badge
                    count={wishlist?.length}
                    color="warning"
                    showZero={false}
                  >
                    <FavoriteBorderIcon
                      sx={{ fontSize: 28 }}
                      onClick={(e) => navigate("/wishlist")}
                      // onClick={(e) => setCartd(!cartd)}
                    />
                  </Badge>
                  <div className="point-badge p-t-7" id="dot" />
                </div>
                <form id="wishform" action="/wishlist" method="POST">
                  <input id="datafiles" name="ids" defaultValue type="hidden" />
                </form>
              </div>
            </nav>
          </div>
        </div>
        <div
          className="wrap-header-mobile"
          style={{ display: "flex", flexDirection: "column" }}
        >
          {/* Button show menu */}

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              height: "100%",
              width: "100%",
            }}
          >
            <div
              className="btn-show-menu-mobile hamburger hamburger--squeeze"
              onClick={
                (e) => setVisible(!visible)
                // document
                //   .querySelector(".mobile-menu")
                //   .classList.add("show-header-cart")
              }
            >
              <span className="hamburger-box">
                <span className="hamburger-inner" />
              </span>
            </div>
            <Drawerr
              visible={visible}
              setVisible={setVisible}
              user={user}
              headers={headers}
              logoutHandler={logoutHandler}
              openModal={openModal}
            />
            {/* //<Drawer /> */}
            <div className="logo-mobile">
              {/* <a href="index.html"><img src="images/icons/logo-01.png" alt="IMG-LOGO"></a> */}
              <Link to="/">
                <h2
                  style={{
                    textAlign: "initial",
                    marginTop: "-12px",
                    marginLeft: 5,
                    fontSize: 25,
                    fontWeight: 700,
                    color: "#3E1404",
                    fontFamily: '"Varela Round", sans-serif',
                  }}
                >
                  Cafecart
                </h2>
              </Link>
            </div>
            <div className="wrap-icon-header flex-w flex-r-m m-r-15">
              {/* <div
                className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart"
                data-notify
                id="js-cart1"
              >
                <i className="zmdi zmdi-shopping-cart" />
              </div> */}
              <div className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11">
                <Badge
                  count={local?.length}
                  color="warning"
                  showZero={false}
                  onClick={(e) => setShow(!show)}
                >
                  <ShoppingCartIcon
                    sx={{ fontSize: 28 }}
                    // onClick={(e) => setCartd(!cartd)}
                  />
                </Badge>
              </div>
              <div
                className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11"
                // onclick="postdata()"
              >
                <Badge
                  count={wishlist?.length}
                  color="warning"
                  showZero={false}
                >
                  <FavoriteBorderIcon
                    sx={{ fontSize: 28 }}
                    onClick={(e) => navigate("/wishlist")}
                    // onClick={(e) => setCartd(!cartd)}
                  />
                </Badge>
                <div className="point-badge p-t-7" id="dot1" />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div>
        <div className="wrap-header-cart js-panel-cart">
          <div className="s-full js-hide-cart" />
          <div className="header-cart flex-col-l p-l-35 p-r-25 p-b-20">
            <div className="header-cart-title flex-w flex-sb-m p-b-4">
              <span className="mtext-103 cl2">Your Cart</span>
              <div className="fs-35 lh-10 cl2 p-lr-5 pointer hov-cl1 trans-04 js-hide-cart">
                <i className="zmdi zmdi-close" />
              </div>
            </div>
            <div className="header-cart-content flex-w w-full js-pscroll">
              <ul className="header-cart-wrapitem w-full" id="cart"></ul>
            </div>
            <div className="w-full">
              <div
                className="header-cart-total w-full p-tb-8"
                id="side-cost"
              ></div>
              <div className="header-cart-buttons flex-w w-full">
                <a
                  href="/shopping-cart"
                  className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-r-8 m-b-10"
                >
                  View Cart
                </a>
                <a
                  href="/shopping-cart"
                  className="flex-c-m stext-101 cl0 size-107 bg3 bor2 hov-btn3 p-lr-15 trans-04 m-b-10"
                  id="check_out_nav"
                >
                  Check Out
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Back to top */}
        <div className="btn-back-to-top" id="myBtn">
          <span className="symbol-btn-back-to-top">
            <i className="zmdi zmdi-chevron-up" />
          </span>
        </div>
      </div>
    </>
  );
};
export default Header;
