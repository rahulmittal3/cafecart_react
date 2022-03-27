import React from "react";
import styles from "./MobileHeader.module.css";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import { HeartOutlined, SearchOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import SearchIcon from "@mui/icons-material/Search";
import * as All from "react-responsive-modal";
import { GoogleLogin } from "react-google-login";
import { toast } from "react-toastify";
import { passwordless, login } from "../../Axios/Authentication.js";
import "react-responsive-modal/styles.css";
import { useDispatch, useSelector } from "react-redux";
import Drawerr from "./Drawerr.js";
import { categories } from "../../Axios/Products.js";
import { useNavigate } from "react-router-dom";
import {
  register,
  generateOTP,
  verifyOTP,
  setPassForgot,
} from "../../Axios/Authentication.js";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import firebase from "firebase/compat/app";
import fancy from "./Header.module.css";
import "firebase/compat/auth";
const MobileHeader = ({ cart, user, wishlist }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mobileSearch } = useSelector((state) => ({ ...state }));
  const [current, setCurrent] = React.useState("mail");
  const [fp, setfp] = React.useState({});
  const [on, setOn] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const handleClick = () => {
    document.querySelector(".MHSearch").classList.remove("display");
  };
  //FOR LOGIN PURPOSES//
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  //FOR Signup PURPOSES//
  const [signUpOpen, setSignUpOpen] = React.useState(false);
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
  const [visible, setVisible] = React.useState(false);
  const [headers, setHeaders] = React.useState([]);
  const [isOpen, setOpen] = React.useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({});
  const [showForm, setShowForm] = React.useState(true);
  const [otp, setOtp] = React.useState(null);
  function openModal() {
    setIsOpen(true);
    document.querySelector("#root").style.display = "none";
  }
  const getHeaders = () => {
    categories()
      .then((res) => setHeaders(res.data))
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getHeaders();
  }, []);
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
  const firebaseConfig = {
    apiKey: "AIzaSyBzguredb4wBzgIaHHBIezG2Dbfl2uqSJw",
    authDomain: "cafecart-bace8.firebaseapp.com",
    projectId: "cafecart-bace8",
    storageBucket: "cafecart-bace8.appspot.com",
    messagingSenderId: "745716393557",
    appId: "1:745716393557:web:5260928b87fb388987d6dc",
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
            toast.success(res.data);

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
                  />
                </center>
              </form>
            </>
          )}
        </div>
      </All.Modal>
      {/* forgot password ends here */}
      <Drawerr
        visible={visible}
        setVisible={setVisible}
        user={user}
        headers={headers}
        logoutHandler={logoutHandler}
        openModal={openModal}
      />
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
      <div className={styles.mobileWrapper}>
        <div className={styles.hamburger} onClick={(e) => setVisible(!visible)}>
          <div className={styles.line1}></div>
          <div className={styles.line2}></div>
          <div className={styles.line3}></div>
        </div>
        <div className={styles.MHImage}>
          <img
            onClick={(e) => navigate("/home")}
            src="https://res.cloudinary.com/techbuy/image/upload/v1644658063/helllo_po0gga.jpg"
            className={styles.logoImg}
            alt="Desktop Logo"
          />
        </div>
        <div className={styles.MHButtons}>
          {user && (
            <>
              <SearchOutlined
                style={{ marginRight: "20px", fontSize: "25px" }}
                onClick={(e) => {
                  dispatch({
                    type: "MOBILE_SEARCH_VISIBLE",
                    payload: !mobileSearch,
                  });
                }}
              />
              <Badge count={wishlist.length} style={{ marginRight: "20px" }}>
                <HeartOutlined
                  style={{ fontSize: "25px", marginRight: "20px" }}
                  onClick={(e) => navigate("/wishlist")}
                />
              </Badge>
              <Badge count={cart.length} style={{ marginRight: "20px" }}>
                <ShoppingCartOutlined
                  sx={{ fontSize: 30 }}
                  onClick={(e) =>
                    dispatch({ type: "DRAWER_VISIBLE", payload: true })
                  }
                  style={{ marginRight: "20px" }}
                />
              </Badge>
            </>
          )}
          {!user && (
            <>
              <SearchOutlined
                style={{ marginRight: "20px", fontSize: "25px" }}
                onClick={(e) => {
                  dispatch({
                    type: "MOBILE_SEARCH_VISIBLE",
                    payload: !mobileSearch,
                  });
                }}
              />
              <Badge count={wishlist.length} style={{ marginRight: "20px" }}>
                <HeartOutlined
                  style={{ fontSize: "25px", marginRight: "20px" }}
                  onClick={(e) => navigate("/wishlist")}
                />
              </Badge>
              <button
                className={styles.loginButton}
                onClick={(e) => setLoginOpen(true)}
              >
                Login
              </button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
