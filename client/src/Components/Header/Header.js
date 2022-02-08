import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Modal from "react-modal";
import { categories } from "../../Axios/Products.js";
import { useDispatch } from "react-redux";
import SignUpModal from "../../Modals/SignUpModal.js";
import { toast } from "react-toastify";
const Header = () => {
  const [headers, setHeaders] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
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
    document.body.style.position = "fixed";
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }
  Modal.setAppElement("#modal");
  function closeModal() {
    setIsOpen(false);
    document.body.style.position = "initial";
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
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
      <header style={{ position: "relative", height: 70 }}>
        <div className="container-menu-desktop">
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
                                      to="/"
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
                                                to=""
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
                      <Link className="dropdown-item" to="/change-password">
                        <div className="dropdown-menu-container">
                          <div
                            className="dropdown-menu-subsection"
                            style={{ display: "flex" }}
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
                <div
                  className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart"
                  data-notify
                  id="js-cart"
                >
                  <i className="zmdi zmdi-shopping-cart" />
                </div>
                <div
                  className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11"
                  onclick="postdata()"
                >
                  <i className="zmdi zmdi-favorite-outline p-t-7" />
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
            <div className="btn-show-menu-mobile hamburger hamburger--squeeze">
              <span className="hamburger-box">
                <span className="hamburger-inner" />
              </span>
            </div>
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
              <div
                className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart"
                data-notify
                id="js-cart1"
              >
                <i className="zmdi zmdi-shopping-cart" />
              </div>
              <div
                className="dis-block icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11"
                onclick="postdata()"
              >
                <i className="zmdi zmdi-favorite-outline p-t-7" />
                <div className="point-badge p-t-7" id="dot1" />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
export default Header;
