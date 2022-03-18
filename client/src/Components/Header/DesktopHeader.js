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
import CartDrawer from "./CartDrawer.js";
import {
  passwordless,
  login,
  generateOTP,
  verifyOTP,
  setPassForgot,
} from "../../Axios/Authentication.js";

import { Menu, Badge } from "antd";

import SearchIcon from "@mui/icons-material/Search";

import "react-dropdown/style.css";
import { register } from "../../Axios/Authentication.js";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import CircularProgress from "@mui/material/CircularProgress";
import { cartDetails } from "../../Axios/Cart.js";
const { SubMenu } = Menu;

const DesktopHeader = ({ cart, user, wishlist, headers, show, setShow }) => {
  const firebaseConfig = {
    apiKey: "AIzaSyBzguredb4wBzgIaHHBIezG2Dbfl2uqSJw",
    authDomain: "cafecart-bace8.firebaseapp.com",
    projectId: "cafecart-bace8",
    storageBucket: "cafecart-bace8.appspot.com",
    messagingSenderId: "745716393557",
    appId: "1:745716393557:web:5260928b87fb388987d6dc",
  };
  const [current, setCurrent] = React.useState("mail");
  const [fp, setfp] = React.useState({});
  const [on, setOn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const [formData, setFormData] = React.useState({});
  const [showForm, setShowForm] = React.useState(true);
  const [otp, setOtp] = React.useState(null);
  // const [data, setData] = React.useState([]);
  const handleClick = (e) => {
    setCurrent(setCurrent(e.key));
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  const auth = firebase.auth();
  const submitHandler = (e) => {
    e.preventDefault();
    configureCaptcha();
    const contact = "+91" + formData.phone;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, contact, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        toast.success("📲 OTP has been Sent to your Phone Number!");
        setShowForm(false);
        // ...
      })
      .catch((error) => {
        console.log(error);
        // Error; SMS not sent
        // ...
      });
  };
  const configureCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "registerBtn",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          submitHandler();
          console.log(response);
        },
      },
      auth
    );
  };
  const validateOTP = (e) => {
    e.preventDefault();
    setLoading(true);
    window.confirmationResult
      .confirm(otp)
      .then((res) =>
        register(formData)
          .then((res) => {
            //first dispatch to the local storage and redux...
            toast.success("Registration Success");

            setLoading(false);
            setSignUpOpen(false);
            setShowForm(true);
            setFormData({});
            setOtp("");
          })
          .catch((err) => {
            toast.error(err.response.data);
            setLoading(false);
          })
      )
      .catch((err) => toast.error("OTP Invalid"));
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
  //for forgot password hereby
  const [fgpwd, setfgpwd] = React.useState(false);
  const [fgemail, setfgemail] = React.useState("");
  const [stage, setStage] = React.useState(0);
  const [fgotp, setfgotp] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [x, setX] = React.useState(false);
  const handlefg = (e) => {
    e.preventDefault();
    setX(true);
    console.log(fgemail);
    generateOTP(fgemail)
      .then((res) => {
        toast.success(
          "OTP has been succesfully been sent to your email address"
        );
        setStage(1);
        setX(false);
      })
      .catch((err) => {
        toast.error(err.response.data);
        setX(false);
      });
  };
  const passwordOTP = (e) => {
    e.preventDefault();
    setX(true);
    console.log(fgotp);
    verifyOTP(fgemail, fgotp)
      .then((res) => {
        toast.success(
          "OTP Validation Successfull! Please Change Your Password"
        );
        setStage(2);
        setX(false);
      })
      .catch((err) => {
        toast.error(err.response.data);
        setX(false);
      });
  };
  const setPasswordForgot = (e) => {
    e.preventDefault();
    setX(true);
    console.log(pass);
    setPassForgot(fgemail, pass)
      .then((res) => {
        toast.success("Password Changed Successfully! Login to Continue");
        setfgpwd(false);
        setLoginOpen(true);
        setX(false);
      })
      .catch((err) => setX(false));
  };
  return (
    <>
      <CartDrawer />
      {/* FORGOT PASSWORD AND SEND OTP HERE */}
      <All.Modal open={fgpwd} onClose={(e) => setfgpwd(false)} center>
        <div className={fancy.FPBackground}>
          {stage === 0 && (
            <>
              <h2 className={fancy.FPHead}>Forgot Password ? </h2>
              <form onSubmit={handlefg}>
                <input
                  type="email"
                  className={fancy.FPInput}
                  placeholder="Enter Account Email"
                  onChange={(e) => setfgemail(e.target.value)}
                  value={fgemail}
                  style={{ textAlign: "center" }}
                />
                <center>
                  <input
                    type="submit"
                    className={fancy.FPSubmit}
                    value={x ? "Please Wait..." : "Send OTP"}
                    disabled={x}
                  />
                </center>
              </form>
            </>
          )}
          {stage === 1 && (
            <>
              <h2 className={fancy.FPHead}>Enter OTP</h2>
              <form onSubmit={passwordOTP}>
                <input
                  type="number"
                  className={fancy.FPInput}
                  placeholder="Enter OTP"
                  onChange={(e) => setfgotp(e.target.value)}
                  value={fgotp}
                  style={{ textAlign: "center" }}
                  minLength={6}
                  maxLength={6}
                />
                <center>
                  <input
                    type="submit"
                    className={fancy.FPSubmit}
                    value={x ? "Please Wait..." : "Confirm OTP"}
                    disabled={x}
                  />
                </center>
              </form>
            </>
          )}
          {stage === 2 && (
            <>
              <h2 className={fancy.FPHead}>Change Password</h2>
              <form onSubmit={setPasswordForgot}>
                <input
                  type="password"
                  className={fancy.FPInput}
                  placeholder="Enter Password"
                  onChange={(e) => setPass(e.target.value)}
                  value={pass}
                  style={{ textAlign: "center" }}
                />
                <center>
                  <input
                    type="submit"
                    className={fancy.FPSubmit}
                    value={x ? "Please Wait..." : "Finish"}
                    disabled={x}
                  />
                </center>
              </form>
            </>
          )}
        </div>
      </All.Modal>
      {/* forgot password ends here */}
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
              <div
                className={styles.label}
                style={{ textAlign: "right", cursor: "pointer" }}
                onClick={(e) => {
                  setLoginOpen(false);
                  setfgpwd(true);
                  setStage(0);
                  setfgemail("");
                  setfgotp("");
                  setPass("");
                }}
              >
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
            {showForm && (
              <>
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
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    value={formData.name}
                    className={styles.LOGForm_input}
                    placeholder="Enter your Full Name"
                  />
                  <div className={styles.label}>Email</div>
                  <input
                    type="text"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    value={formData.email}
                    className={styles.LOGForm_input}
                    placeholder="Enter your Email Address"
                  />
                  <div className={styles.label}>Contact Number</div>
                  <input
                    type="number"
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    value={formData.phone}
                    className={styles.LOGForm_input}
                    placeholder="Enter your Contact Number"
                  />
                  <div className={styles.label}>Password</div>
                  <input
                    type="password"
                    onChange={(e) =>
                      setFormData({ ...formData, password: e.target.value })
                    }
                    value={formData.password}
                    className={styles.LOGForm_input}
                    placeholder="Enter your Password"
                  />
                  <div className={styles.label}>Confirm Password</div>
                  <input
                    type="password"
                    className={styles.LOGForm_input}
                    placeholder="Confirm your Password"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        confirmPassword: e.target.value,
                      })
                    }
                    value={formData.confirmPassword}
                  />

                  <button
                    className={styles.loginBtn}
                    disabled={
                      !formData.name ||
                      !formData.email ||
                      !formData.phone ||
                      !formData.password ||
                      !formData.confirmPassword
                    }
                    onClick={submitHandler}
                    id="registerBtn"
                  >
                    {loading ? "Signing Up..." : "Sign Up"}
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
              </>
            )}
            {!showForm && (
              <>
                <div className={styles.LOGForm_title}>Validate OTP</div>
                <div className={styles.LOGForm_Details}>
                  <div className={styles.label}>Enter OTP</div>
                  <input
                    type="number"
                    className={styles.LOGForm_input}
                    placeholder="Enter OTP"
                    onChange={(e) => setOtp(e.target.value)}
                    value={otp}
                  />
                  <button
                    className={styles.loginBtn}
                    disabled={!otp || otp.length !== 6}
                    onClick={validateOTP}
                  >
                    {loading ? "Validating..." : "Validate"}
                  </button>
                </div>
              </>
            )}
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
            onClick={(e) => navigate("/pages/about-us")}
          >
            About Us
          </div>
          <div
            className={styles.DHLink}
            style={{ marginLeft: "20px" }}
            onClick={(e) => navigate("/blog")}
          >
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
              key="mail"
              icon={
                <Badge count={cart.length}>
                  <ShoppingCartOutlined
                    style={{ fontSize: "25px" }}
                    onClick={(e) => {
                      dispatch({
                        type: "DRAWER_VISIBLE",
                        payload: true,
                      });
                    }}
                  />
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
