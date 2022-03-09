import React from "react";

import { useDispatch, useSelector } from "react-redux";
import styles from "./Cart.module.css";
import { cartDetails, addToCartDB, getShipping } from "../../Axios/Cart.js";
import { checkCoupon } from "../../Axios/Coupon.js";
import * as All from "react-responsive-modal";
import _ from "lodash";
import { toast } from "react-toastify";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { GoogleLogin } from "react-google-login";
import { passwordless, login, addPhone } from "../../Axios/Authentication.js";
import axios from "axios";
import firebase from "firebase/compat/app";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
const Cart = () => {
  const navigate = useNavigate();
  const { cart, wishlist, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [data, setdata] = React.useState([]);
  const [texting, setTexting] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [total, setTotal] = React.useState(0);
  const [disc, setDisc] = React.useState(0);
  const [msg, setMsg] = React.useState("");
  const [couponText, setCouponText] = React.useState("");
  const [pinMsg, setPinMsg] = React.useState("");
  const [pin, setPin] = React.useState("");
  const [shipping, setShipping] = React.useState({
    cartsize: 0,
    shipping_charge: 0,
  });
  const setData = () => {
    setLoading(true);
    cartDetails(cart)
      .then((res) => {
        setdata(res.data);

        //calculate the total and set
        const initialValue = 0;
        const sumWithInitial = res.data.reduce(
          (previousValue, currentValue) =>
            previousValue + currentValue?._doc?.price * currentValue?.quantity,
          initialValue
        );
        setTotal(sumWithInitial);
        setLoading(false);
      })
      .catch((err) => window.location.reload());
  };
  React.useEffect(() => {
    cart && setData();
  }, [cart]);

  const handleShipping = () => {
    getShipping(total)
      .then((res) => {
        setShipping(res.data);
        console.log("SHIP  :", res.data.shipping_charge);
        if (res.data.shipping_charge === 0) {
          setMsg(
            "Congratulations! 🎉 Your Order is eligible for free delivery.!"
          );
        } else if (res.data.shipping_charge > 0) {
          setMsg(
            `Shop for ₹ ${(res.data.cartsize + 1).toLocaleString(
              "en-IN"
            )} or more, to avail free Shipping at your doorstep..!`
          );
        }
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    handleShipping();
  }, [total]);

  const handleIncrement = (id) => {
    const localCart = cart;
    for (let i = 0; i < localCart.length; i++) {
      if (localCart[i]?._id === id) {
        //id matched
        let qty = localCart[i].quantity;
        if (qty === 5) {
          toast.warning("More than 5 items not allowed!");
          return;
        }
        qty = qty + 1;
        localCart[i].quantity = qty;
        window.localStorage.setItem("cartLS", JSON.stringify(localCart));
        dispatch({
          type: "CART",
          payload: localCart,
        });
        setData();
      }
    }
  };
  const handleDecrement = (id) => {
    const localCart = cart;
    for (let i = 0; i < localCart.length; i++) {
      if (localCart[i]?._id === id) {
        //id matched
        let qty = localCart[i].quantity;
        if (qty === 1) {
          toast.warning("Remove the item from Remove All Option");
          return;
        }
        qty = qty - 1;
        localCart[i].quantity = qty;
        window.localStorage.setItem("cartLS", JSON.stringify(localCart));
        dispatch({
          type: "CART",
          payload: localCart,
        });
        setData();
      }
    }
  };
  const removeAllHandler = (id) => {
    let localCart = cart;
    for (let i = 0; i < localCart.length; i++) {
      if (localCart[i]?._id === id) {
        //id matched
        localCart.splice(i, 1);
        window.localStorage.setItem("cartLS", JSON.stringify(localCart));
        dispatch({
          type: "CART",
          payload: localCart,
        });
        setData();
      }
    }
  };

  const handleCoupon = () => {
    setTexting(true);
    checkCoupon(couponText)
      .then((res) => {
        setDisc(res.data);
        setTexting(false);
      })
      .catch((err) => setTexting(false));
  };
  const calcDisc = () => {
    //work on total number
    if (!disc._id) {
      return 0;
    }
    const option1 = ((disc?.pricedrop * total) / 100).toFixed(0);
    const option2 = disc?.maxAmount;
    return option1 < option2 ? option1 : option2;
  };

  const handlePIN = async (e) => {
    e.preventDefault();
    setTexting(true);

    try {
      const result = await axios({
        method: "GET",
        url: `https://api.postalpincode.in/pincode/${pin}`,
      });

      if (result.data[0].PostOffice) {
        //means a valid post office here, gte the 1st item here
        setPinMsg(
          `Shipping Available at ${result.data[0].PostOffice[0].Name},${result.data[0].PostOffice[0].District}! Happy Shopping! 🛍️`
        );
      } else {
        //means valid post office not present
        setPinMsg("Item unavailable for delivery at your doorstep!");
      }
      setTexting(false);
    } catch (error) {
      console.log(error);
      toast.error("Unexpected Error");
      setTexting(false);
    }
  };

  const addToWishlist = (id) => {
    //first add to wishlist arrayToLatLng
    let localwishlist = wishlist;
    localwishlist.push(id);
    localwishlist = _.uniq(localwishlist);
    window.localStorage.setItem("wishlist", JSON.stringify(localwishlist));
    dispatch({
      type: "WISHLIST",
      payload: localwishlist,
    });
    removeAllHandler(id);
  };

  //for checkout handker
  const [loginOpen, setLoginOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  //FOR Signup PURPOSES//
  const [signUpOpen, setSignUpOpen] = React.useState(false);

  const checkoutHandler = () => {
    //check whwther, anyout of stock item is there and
    let result = 1;
    for (let i = 0; i < data.length; i++) {
      const curr = data[i];
      if (curr?._doc?.available === false) {
        result = result & 0;
      }
    }
    if (result === 0) {
      //means out of stock item is there and
      toast.error(
        "Please remove Out of Stock items from the Cart to Checkout!"
      );
      return;
    }
    if (!user) {
      toast.success("Please Login to Continue to Checkout");
      setLoginOpen(true);
      return;
    }
    if (!user.contactVerified) {
      toast.success(
        "Please Verify your Contact Number, before placing your Order"
      );
      setOpenVerif(true);
      return;
    }
    //CREATE A CHECKOUT OBJECT :
    let coupon = "";
    if (disc !== 0) {
      coupon = disc.coupon;
    }
    let x = calcDisc();

    //create the products array from
    let arr = [];
    for (let i = 0; i < cart.length; i++) {
      const obj = {
        productId: cart[i]?._id,
        quantity: cart[i]?.quantity,
      };
      arr.push(obj);
    }
    console.log(arr);
    const createObject = {
      user: user?.id,
      priceBeforeDiscount: total,
      discount: x,
      shipping: shipping.shipping_charge,
      couponApplied: coupon,
      items: arr,
    };
    console.log(createObject);
    addToCartDB(createObject)
      .then((res) => {
        navigate("/checkout");
      })
      .catch((err) => toast.error("Please Try Again!"));
  };

  //for login modal......

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

  //FOR VERIFYING PHONE NUMBER, IF THE USER HAS STILL NOT REGISTERED :
  const [openverif, setOpenVerif] = React.useState(false);
  const [phone, setPhone] = React.useState("");
  const [otpSent, setOtpSent] = React.useState(false);
  const [otp, setotp] = React.useState("");
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
    const contact = "+91" + phone;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, contact, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        toast.success("📲 OTP has been Sent to your Phone Number!");
        setOtpSent(true);

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
    window.confirmationResult
      .confirm(otp)
      .then((res) =>
        addPhone(user.jwt, user.id, phone)
          .then((res) => {
            console.log(res.data);
            window.localStorage.setItem("user", JSON.stringify(res.data));
            dispatch({
              type: "USER_CHANGED",
              payload: res.data,
            });
            toast.success("Phone Number added Successfully");
            setOtpSent(false);
            setOpenVerif(false);
            setotp("");
            setPhone("");
          })
          .catch((err) => console.log(err))
      )
      .catch((err) => toast.error("OTP Invalid"));
  };

  return (
    <>
      <All.Modal
        open={openverif}
        center
        onClose={(e) => {
          setOtpSent(false);
          setOpenVerif(false);
          setotp("");
          setPhone("");
        }}
      >
        <div>
          <div className={styles.headerAsk}>
            {otpSent ? "Verify OTP" : "Verify your Phone"}
          </div>
          {!otpSent && (
            <form onSubmit={submitHandler}>
              <input
                className={styles.headerInput}
                minLength="10"
                maxLength="10"
                placeholder="Contact Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                disabled={otpSent}
              />
              <center>
                <button
                  className={styles.headerBtn}
                  id="registerBtn"
                  disabled={phone.length < 10}
                >
                  Send OTP
                </button>
              </center>
            </form>
          )}
          {otpSent && (
            <form onSubmit={validateOTP}>
              <input
                className={styles.headerInput}
                minLength="6"
                maxLength="6"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setotp(e.target.value)}
              />
              <center>
                <button
                  className={styles.headerBtn}
                  disabled={otp.length !== 6}
                >
                  Verify OTP
                </button>
              </center>
            </form>
          )}
        </div>
      </All.Modal>
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
              {/* <div className={styles.label} style={{ textAlign: "center" }}>
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
              </div> */}
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
      <div className={styles.cartHead}>Cart</div>
      {data.length === 0 && (
        <div className={styles.noItem}>
          No Items in the Cart To Display!
          <ShoppingBagIcon sx={{ fontSize: 200 }} />
        </div>
      )}
      {data.length > 0 && (
        <div className={styles.cartDivider}>
          <div className={styles.cartItems}>
            <hr />
            {loading && <LoadingOutlined style={{ fontSize: "50px" }} />}
            <div className={styles.cartItemList}>
              {data &&
                data.length > 0 &&
                data.map((curr, index) => {
                  return (
                    <div key={index}>
                      <div className={styles.cartItem}>
                        <div className={styles.cartItemImage}>
                          <img
                            src={curr?._doc?.imagePath[0]}
                            alt={curr?._doc?.title}
                            className={styles.cartImageIndividual}
                          />
                        </div>
                        <div className={styles.cartItemMeta}>
                          <div className={styles.cartTitle}>
                            {curr?._doc?.title}
                          </div>
                          <div className={styles.cartPrice}>
                            <span
                              className={styles.cartPrice}
                              style={{ opacity: 0.6 }}
                            >
                              Each :
                            </span>{" "}
                            ₹{curr?._doc?.price?.toLocaleString("en-IN")}
                          </div>
                          <div
                            className={styles.cartPrice}
                            style={{
                              color: curr?._doc?.available ? "green" : "red",
                            }}
                          >
                            {curr?._doc?.available
                              ? "IN STOCK"
                              : "OUT OF STOCK"}
                          </div>
                          <br />
                          <div className={styles.cartPrice}>Quantity</div>
                          <div className={styles.buttons}>
                            <div className={styles.btnGroup}>
                              <button
                                onClick={(e) => handleIncrement(curr._doc?._id)}
                              >
                                +
                              </button>
                              <input
                                type="number"
                                disabled={true}
                                value={curr?.quantity}
                              />
                              <button
                                onClick={(e) => handleDecrement(curr._doc?._id)}
                              >
                                -
                              </button>
                              <div
                                className={styles.link}
                                onClick={(e) =>
                                  removeAllHandler(curr._doc?._id)
                                }
                              >
                                Remove
                              </div>
                              <div
                                className={styles.link}
                                style={{ color: "#A0522C" }}
                                onClick={(e) => addToWishlist(curr._doc?._id)}
                              >
                                Add to Wishlist
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />
                    </div>
                  );
                })}
            </div>
            {/* <div className={styles.total}>
            Total : &emsp;&emsp; ₹{total?.toLocaleString("en-IN")}
          </div> */}
            <div className={styles.PINHead}>Check PIN Code</div>
            <div className={styles.PIN}>
              <input
                type="number"
                className={styles.PINInput}
                minLength={6}
                maxLength={6}
                placeholder="Enter PIN Code"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                disabled={texting}
              />
              <button className={styles.PINCheck} onClick={handlePIN}>
                {texting ? <LoadingOutlined /> : "Check"}
              </button>
            </div>
            <div
              style={{
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: "16px",
                paddingTop: "10px",
                borderRadius: "10px",
                color: "brown",
                marginTop: "10px",
                width: "80%",
              }}
            >
              {pinMsg}
            </div>
          </div>
          <div className={styles.cartCoupons}>
            <div className={styles.couponHead}>Check Coupon</div>
            <div className={styles.PIN}>
              <input
                type="text"
                className={styles.PINInput}
                style={{ width: "80%", padding: "10px" }}
                placeholder="Enter Coupon Code to Check"
                onChange={(e) => setCouponText(e.target.value)}
                value={couponText}
              />
              <button
                className={styles.PINCheck}
                style={{ width: "20%" }}
                disabled={couponText.length === 0 || texting}
                onClick={handleCoupon}
              >
                {texting ? <LoadingOutlined /> : "Check"}
              </button>
            </div>
            <div className={styles.info}>
              <div className={styles.ask}>SubTotal</div>
              <div className={styles.answer}>
                ₹{Number(total).toLocaleString("en-IN")}
              </div>
            </div>
            <div className={styles.info}>
              <div className={styles.ask}>Discount</div>
              <div className={styles.answer}>- ₹{calcDisc()}</div>
            </div>
            <div className={styles.info}>
              <div className={styles.ask}>Shipping</div>
              <div className={styles.answer}>
                + ₹{shipping.shipping_charge.toLocaleString("en-IN")}
              </div>
            </div>
            <div
              style={{
                fontFamily: "Poppins",
                fontWeight: 600,
                fontSize: "16px",
                color: "white",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: msg.startsWith("Cong") ? "green" : "red",
              }}
            >
              {msg}
            </div>
            <br />
            <br />
            <hr />
            <div className={styles.info}>
              <div className={styles.ask}>Total</div>
              <div className={styles.answer}>
                ₹
                {Number(
                  total + shipping.shipping_charge - calcDisc()
                ).toLocaleString("en-IN")}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "row-reverse" }}>
              <button
                className={styles.checkoutButton}
                onClick={checkoutHandler}
                disabled={loading}
              >
                {" "}
                <ShoppingBagIcon sx={{ fontSize: 30 }} />
                &nbsp; Checkout
              </button>
            </div>
            <div className={styles.infoCart}>
              cartitems will be saved in your cart for 30 days. To save
              cartitems longer, add them to your Wish List.
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
