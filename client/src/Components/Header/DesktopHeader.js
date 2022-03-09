import React from "react";
import styles from "./DesktopHeader.module.css";
import { useNavigate } from "react-router-dom";
import * as All from "react-responsive-modal";
import fancy from "./Header.module.css";
import { updatePassword } from "../../Axios/Authentication.js";
import { toast } from "react-toastify";
import "react-responsive-modal/styles.css";
import { useDispatch } from "react-redux";
import { GoogleLogin } from "react-google-login";
import {
  UserOutlined,
  AppstoreOutlined,
  SettingOutlined,
  ProfileOutlined,
  HeartOutlined,
  KeyOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import Drawerrr from "../Cart/Drawer.js";
import { passwordless, login } from "../../Axios/Authentication.js";
import Avatar from "@mui/material/Avatar";
import { Menu, Badge } from "antd";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Navigation from "react-sticky-nav";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

// import { HamburgerMenu, Logo } from "./components";
const { SubMenu } = Menu;

const DesktopHeader = ({ cart, user, wishlist, headers }) => {
  const [current, setCurrent] = React.useState("mail");
  const [fp, setfp] = React.useState({});
  const [on, setOn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const handleClick = (e) => {
    setCurrent(setCurrent(e.key));
  };
  const dispatch = useDispatch();
  console.log(headers);
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
  };
  const handleFp = (e) => {
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

  //FOR LOGIN PURPOSES//
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const responseGoogle = (res) => {
    if (!res.profileObj) {
      toast.warning("Unexpected Error! Please try again");
      return;
    }
    if (res.profileObj) {
      passwordless(res.profileObj)
        .then((res) => {
          toast.success("Login Successfully");
          if (window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(res.data));
          }
          dispatch({
            type: "USER_CHANGED",
            payload: res.data,
          });
          setLoginOpen(false);
          window.location.reload("/home");
          setEmail("");
          setPassword("");
        })
        .catch((err) => {
          toast.error(err);
        });
    }
  };
  const normalLogin = async (e) => {
    e.preventDefault();
    //here we have the normal login and everything.
    setLoading(true);
    login(email, password)
      .then((res) => {
        toast.success("Login Successful");
        if (window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        dispatch({
          type: "USER_CHANGED",
          payload: res.data,
        });
        setLoading(false);
        window.location.reload("/home");
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        toast.error(err.response.data);
        setLoading(false);
      });
  };
  //FOR Signup PURPOSES//
  const [signUpOpen, setSignUpOpen] = React.useState(false);
  return (
    <>
      <Drawerrr show={show} setShow={setShow} />
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
      {/*LOGIUT MODAL*/}

      <All.Modal
        open={loginOpen}
        onClose={(e) => setLoginOpen(false)}
        center
        className={styles.LOGModal}
      >
        <div className={styles.LOGWrapper}>
          <div className={styles.LOGForm}>
            <div className={styles.LOGForm_title}>Login</div>
            <div className={styles.LOGForm_Description}>
              {" "}
              lorem ipsum dolor sit amet, consectetur adipiscing
            </div>
            <div className={styles.LOGForm_Details}>
              <GoogleLogin
                clientId="664020622197-h8henpf256g1e1llh4hkcfr56uiuvtfo.apps.googleusercontent.com"
                buttonText={
                  <>
                    <span className={styles.SIWGDetails}>
                      Sign In With Google
                    </span>
                  </>
                }
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy="single_host_origin"
              />
              {/* <button className={styles.LOGForm_SIWGButton}>
                <img
                  src="https://res.cloudinary.com/techbuy/image/upload/v1646508088/search_1_ccov6i.png"
                  alt="SIWGLogo"
                />
                <span className={styles.SIWGDetails}>Sign In With Google</span>
              </button> */}
              <div className={styles.boxes}>
                <hr className={styles.leftBox} />
                <div className={styles.centerBox}>Or Sign In With Email</div>
                <hr className={styles.leftBox} />
              </div>

              {/* form details here */}
              <div className={styles.label}>Email</div>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={styles.LOGForm_input}
                placeholder="Enter your Email"
              />
              <div className={styles.label}>Password</div>
              <input
                type="password"
                className={styles.LOGForm_input}
                placeholder="Enter your Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <div className={styles.label} style={{ textAlign: "right" }}>
                Forgot Password?
              </div>
              <button
                className={styles.loginBtn}
                disabled={!email || !password || loading}
                onClick={normalLogin}
              >
                {loading ? "Logging In..." : "Login"}
              </button>
              <div className={styles.label} style={{ textAlign: "center" }}>
                Don't have an account?{" "}
                <span
                  style={{ color: "#a0522c", cursor: "pointer" }}
                  onClick={(e) => {
                    setLoginOpen(false);
                    setSignUpOpen(true);
                  }}
                >
                  Sign Up
                </span>
              </div>
            </div>
          </div>
          <div className={styles.LOGPicture}>
            {/* <img
              src="https://res.cloudinary.com/techbuy/image/upload/v1646508391/Rectangle_500_kvsw0u.png"
              alt="rightImage"
            /> */}
          </div>
        </div>
      </All.Modal>
      {/*logiut modal ends*/}
      {/* Sign Up Here */}
      <All.Modal
        open={signUpOpen}
        onClose={(e) => setSignUpOpen(false)}
        center
        className={styles.LOGModal}
      >
        <div className={styles.LOGWrapper}>
          <div className={styles.LOGForm}>
            <div className={styles.LOGForm_title}>Register</div>
            <div className={styles.LOGForm_Description}>
              {" "}
              lorem ipsum dolor sit amet, consectetur adipiscing
            </div>
            <div className={styles.LOGForm_Details}>
              {/* form details here */}
              <div className={styles.label}>Full Name</div>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={styles.LOGForm_input}
                placeholder="Enter your Full Name"
              />
              <div className={styles.label}>Email</div>
              <input
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={styles.LOGForm_input}
                placeholder="Enter your Email Address"
              />
              <div className={styles.label}>Contact Number</div>
              <input
                type="number"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={styles.LOGForm_input}
                placeholder="Enter your Contact Number"
              />
              <div className={styles.label}>Password</div>
              <input
                type="password"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className={styles.LOGForm_input}
                placeholder="Enter your Password"
              />
              <div className={styles.label}>Confirm Password</div>
              <input
                type="password"
                className={styles.LOGForm_input}
                placeholder="Confirm your Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />

              <button
                className={styles.loginBtn}
                disabled={!email || !password || loading}
                onClick={normalLogin}
              >
                {loading ? "Singing Up..." : "Sign Up"}
              </button>
              <div className={styles.label} style={{ textAlign: "center" }}>
                Have an Account?&nbsp;
                <span
                  style={{ color: "#a0522c", cursor: "pointer" }}
                  onClick={(e) => {
                    setSignUpOpen(false);
                    setLoginOpen(true);
                  }}
                >
                  Login
                </span>
              </div>
            </div>
          </div>
          <div className={styles.LOGPicture}>
            {/* <img
              src="https://res.cloudinary.com/techbuy/image/upload/v1646508391/Rectangle_500_kvsw0u.png"
              alt="rightImage"
            /> */}
          </div>
        </div>
      </All.Modal>
      {/* Sign Op ends here */}
      <div className={styles.DHWrapper}>
        <div className={styles.DHLogo} onClick={(e) => navigate("/")}>
          <center>
            <img
              src="https://res.cloudinary.com/techbuy/image/upload/v1644658063/helllo_po0gga.jpg"
              className={styles.logoImg}
              alt="Desktop Logo"
            />
          </center>
        </div>
        <div className={styles.DHLinks}>
          <Menu
            onClick={handleClick}
            style={{ width: "auto" }}
            mode="horizontal"
          >
            {headers &&
              headers.length > 0 &&
              headers.map((curr, index) => {
                return (
                  <SubMenu
                    key={curr.slug}
                    title={
                      <div
                        className={styles.DHLink}
                        onClick={(e) =>
                          navigate(`/products/category/${curr.slug}`)
                        }
                      >
                        {curr.title}
                      </div>
                    }
                  >
                    {curr.Subcategories.length > 0 &&
                      curr.Subcategories.map((sub, index) => {
                        return (
                          <SubMenu
                            key={sub.slug}
                            title={
                              <div
                                className={styles.DHLink}
                                onClick={(e) =>
                                  navigate(
                                    `/products/category/${curr.slug}/${sub.Parent_Subcategory.slug}`
                                  )
                                }
                              >
                                {sub.Parent_Subcategory.title}
                              </div>
                            }
                          >
                            {sub.Child_Subcategory.length > 0 &&
                              sub.Child_Subcategory.map((last, index) => {
                                return (
                                  <Menu.Item key={last.slug}>
                                    <div
                                      className={styles.DHLink}
                                      onClick={(e) =>
                                        navigate(
                                          `/products/category/${curr.slug}/${sub.Parent_Subcategory.slug}/${last.slug}`
                                        )
                                      }
                                    >
                                      {last.title}
                                    </div>
                                  </Menu.Item>
                                );
                              })}
                          </SubMenu>
                        );
                      })}
                  </SubMenu>
                );
              })}
          </Menu>
          <div
            className={styles.DHLink}
            onClick={(e) => navigate("pages/about-us")}
          >
            About Us
          </div>
          <div className={styles.DHLink} onClick={(e) => navigate("/blog")}>
            Coffee Talks
          </div>
        </div>
        <div className={styles.DHSearch}>
          <div className={styles.DHSearchBox}>
            <div>
              {" "}
              <input
                type="text"
                placeholder="Search for items, brands & inspirations"
              />
            </div>
            <div>
              {" "}
              <button>
                <SearchIcon sx={{ fontSize: 25 }} />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.DHButtons}>
          <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
            style={{ width: "280px" }}
          >
            <Menu.Item
              onClick={(e) => setShow(!show)}
              key="mail"
              icon={
                <Badge count={cart.length}>
                  <ShoppingCartOutlined style={{ fontSize: "25px" }} />
                </Badge>
              }
            ></Menu.Item>
            <Menu.Item
              onClick={(e) => navigate("/wishlist")}
              key="app"
              icon={
                <Badge count={wishlist.length}>
                  <HeartOutlined style={{ fontSize: "25px" }} />
                </Badge>
              }
            ></Menu.Item>
            {user && (
              <SubMenu
                key="SubMenu"
                icon={<UserOutlined style={{ fontSize: "25px" }} />}
                title=""
              >
                <Menu.Item
                  key="setting:1"
                  onClick={(e) => navigate("/user/profile")}
                >
                  <ProfileOutlined style={{ fontSize: "20px" }} />
                  &emsp; Profile
                </Menu.Item>
                <Menu.Item key="setting:2" onClick={(e) => setOn(true)}>
                  <KeyOutlined style={{ fontSize: "20px" }} />
                  &emsp; Change Password
                </Menu.Item>
                <Menu.Item key="setting:3" onClick={logoutHandler}>
                  <LogoutOutlined style={{ fontSize: "20px" }} />
                  &emsp; Logout
                </Menu.Item>
              </SubMenu>
            )}
            {!user && (
              <Menu.Item key="setting:4">
                <button
                  className={styles.loginButton}
                  onClick={(e) => setLoginOpen(true)}
                >
                  Login
                </button>
              </Menu.Item>
            )}
          </Menu>
        </div>
      </div>
    </>
  );
};

export default DesktopHeader;
