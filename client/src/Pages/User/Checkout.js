import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./Checkout.module.css";
import axios from "axios";
import { toast } from "react-toastify";
import PaymentIcon from "@mui/icons-material/Payment";
import MoneyIcon from "@mui/icons-material/Money";
import Tooltip from "@mui/material/Tooltip";
import { getFromCart } from "../../Axios/Cart.js";
import { checkCoupon } from "../../Axios/Coupon.js";
import { createPayment, createPaymentPrepaid } from "../../Axios/Payment.js";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
const Checkout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  const [data, setData] = React.useState({ email: user.email });
  const [cart, setCart] = React.useState(null);
  const [method, setMethod] = React.useState(null);
  const [prepaid, setPrepaid] = React.useState(null);

  const [coupon, setCoupon] = React.useState();
  const handlePin = async (e) => {
    if (data.pin.length === 6) {
      try {
        const result = await axios({
          method: "GET",
          url: `https://api.postalpincode.in/pincode/${data.pin}`,
        });
        console.log(result);
        if (result.data[0].PostOffice) {
          const [state, district] = [
            result.data[0].PostOffice[0].State,
            result.data[0].PostOffice[0].District,
          ];
          setData({ ...data, state: state, district: district });
          toast.success("Your PIN is Servicable!");
        } else {
          toast.error("Item Could not be delivered at your doorstep!");
          setData({ ...data, state: "", district: "" });
        }
      } catch (error) {
        console.log(error);
      }
    }
    //call the api and fill the details........
    console.log(data);
  };

  const getCart = () => {
    getFromCart(user.id, user.jwt)
      .then((res) => {
        setCart(res.data);
        setDiscount(res.data.discountApplied);
      })
      .catch((err) => console.log(""));
  };
  React.useEffect(() => {
    getCart();
  }, []);
  const [discount, setDiscount] = React.useState(0);
  const handleCoupon = (e) => {
    e.preventDefault();
    console.log("Coupon is Applied", coupon);
    // setloading(true);
    checkCoupon(coupon)
      .then((res) => {
        if (cart?.total < res?.data?.minimumCartAmount) {
          toast.error(
            `You need items worth ₹${res?.data?.minimumCartAmount} for this Coupon! Shop More 🛍️`
          );
          // setloading(false);
          return;
        }
        toast.success("Coupon has been applied Succesfully! 🎉");
        // setloading(false);
        const discountPercentageNumber =
          (res.data.pricedrop / 100.0) * cart?.total;
        setDiscount(
          discountPercentageNumber < res.data.maxAmount
            ? discountPercentageNumber.toFixed(0)
            : res.data.maxAmount
        );
      })
      .catch((err) => {
        toast.error(err?.response?.data);
        // setloading(false);
        // setDiscount(0);
      });
  };
  const handleCheckout = () => {
    //1) calling backend function for payment
    // if (method === "COD") {
    //   createPayment(data)
    //     .then((res) => {
    //       toast.success(
    //         "Order has been placed succesfully! An email has been succesfully sent to your email id"
    //       );
    //       window.localStorage.removeItem("cart");
    //       dispatch({
    //         type: "CART",
    //         payload: [],
    //       });
    //       navigate("/user/profile");
    //     })
    //     .catch((err) => {
    //       toast.error(
    //         "Order could not be placed! Complete the Checkout Process Again to Confirm your Order"
    //       );
    //       navigate("/home");
    //     });
    // } else {
    //   createPaymentPrepaid(data)
    //     .then((res) => bolt.launch(res.data))
    //     .catch((err) => console.log(err));
    // }
  };
  return (
    <React.Fragment>
      <center>
        {" "}
        <div className={styles.heading}>CheckOut</div>
      </center>
      {cart && (
        <>
          <Helmet>
            <meta charSet="utf-8" />
            <title>My Title</title>
            <script
              id="bolt"
              src="https://checkout-static.citruspay.com/bolt/run/bolt.min.js"
              bolt-
              color="<color-code>"
              bolt-logo="<image path>"
            ></script>
          </Helmet>
          <div className={styles.page}>
            <div className={styles.left}>
              <div className={styles.email}>
                <h4>Email</h4>
                <input
                  type="text"
                  disabled
                  value={user.email}
                  autoComplete="off"
                />
              </div>
              <div className={styles.fullAddress}>
                <h4 style={{ marginBottom: "30px" }}>Shipping Address</h4>
                <div className={styles.email}>
                  <h4>First Name</h4>
                  <input
                    autoComplete="off"
                    type="text"
                    onChange={(e) =>
                      setData({ ...data, fName: e.target.value })
                    }
                    value={data?.fName}
                  />
                </div>

                <div className={styles.email}>
                  <h4>Last Name</h4>
                  <input
                    autoComplete="off"
                    type="text"
                    onChange={(e) =>
                      setData({ ...data, lName: e.target.value })
                    }
                    value={data?.lName}
                  />
                </div>
                <div className={styles.email}>
                  <h4>Phone</h4>
                  <input
                    autoComplete="off"
                    type="text"
                    onChange={(e) =>
                      setData({ ...data, contact: e.target.value })
                    }
                    value={data?.contact}
                  />
                </div>
                <div className={styles.email}>
                  <h4>Address Line 1</h4>
                  <input
                    autoComplete="off"
                    type="text"
                    onChange={(e) => setData({ ...data, add1: e.target.value })}
                    value={data?.add1}
                  />
                </div>
                <div className={styles.email}>
                  <h4>Address Line 2</h4>
                  <input
                    autoComplete="off"
                    type="text"
                    onChange={(e) => setData({ ...data, add2: e.target.value })}
                    value={data?.add2}
                  />
                </div>
                <div className={styles.email}>
                  <h4>PIN Code</h4>
                  <input
                    type="text"
                    onChange={(e) => setData({ ...data, pin: e.target.value })}
                    value={data?.pin}
                  />
                </div>
                <div className={styles.email}>
                  <h4>City</h4>
                  <input
                    autoComplete="off"
                    type="text"
                    onChange={(e) => setData({ ...data, city: e.target.value })}
                    value={data?.city}
                  />
                </div>
                <div className={styles.email}>
                  <h4>District</h4>
                  <input
                    autoComplete="off"
                    type="text"
                    onChange={handlePin}
                    value={data?.district}
                  />
                </div>
                <div className={styles.email}>
                  <h4>State</h4>
                  <input
                    autoComplete="off"
                    type="text"
                    onChange={(e) =>
                      setData({ ...data, state: e.target.value })
                    }
                    value={data?.state}
                    disabled={true}
                  />
                </div>
                <div className={styles.email}>
                  <h4>Country</h4>
                  <input
                    autoComplete="off"
                    type="text"
                    disabled={true}
                    value={"India"}
                  />
                </div>
              </div>
              <div className={styles.options}>
                <button onClick={(e) => setMethod("COD")}>
                  <Tooltip title="Pay Now">
                    <PaymentIcon sx={{ fontSize: 60 }} />
                  </Tooltip>
                  <br />
                </button>
                <button onClick={(e) => setMethod("Prepaid")}>
                  <Tooltip title="Cash on Delivery">
                    <MoneyIcon sx={{ fontSize: 60 }} />
                  </Tooltip>
                </button>
              </div>
              <br></br>
              <div className={styles.paymentMethod}>
                {method ? method : "Select a Payment Method"}
              </div>
            </div>

            {/*Order Summary*/}
            <div className={styles.right}>
              <h1 className={styles.rightHeading}>Order Summary</h1>
              <hr />
              <div className={styles.productList}>
                {cart &&
                  cart?.items &&
                  cart.items.length > 0 &&
                  cart.items.map((curr, index) => {
                    return (
                      <div className={styles.individual} key={index}>
                        <div className={styles.listImage}>
                          <img
                            src={curr?.productId?.imagePath[0]}
                            alt="cartImg"
                            className={styles.cartImage}
                          />
                        </div>
                        <div className={styles.details}>
                          <div className={styles.title}>
                            {curr.productId?.title}
                          </div>
                          <div className={styles.branding}>
                            ₹{curr?.productId.price} X {curr?.quantity} = ₹
                            {curr?.productId.price * curr?.quantity}
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <hr />
              <div className={styles.cartMoney}>
                <div className={styles.wrap}>
                  <div className={styles.info}>Total : </div>
                  <div className={styles.value}>₹{cart?.total}</div>
                </div>
                <div className={styles.wrap}>
                  <div className={styles.info}>Your Savings : </div>
                  <div className={styles.value}>- ₹{discount}</div>
                </div>
                <div className={styles.wrap}>
                  <div className={styles.info}>Payable Amount : </div>
                  <div className={styles.value}>₹{cart?.total - discount}</div>
                </div>
              </div>
              <hr />
              <div>
                <center>
                  <div className={styles.applyCouponHeading}>APPLY COUPON</div>
                  <div className={styles.applyCoupon}>
                    <input
                      type="text"
                      placeholder="Check Coupon Here"
                      onChange={(e) => setCoupon(e.target.value)}
                      value={coupon}
                    />
                    <button disabled={!coupon} onClick={handleCoupon}>
                      Check Coupon
                    </button>
                  </div>
                </center>
                <center>
                  {" "}
                  <Tooltip
                    text="Choose a Payment Method to Place An Order"
                    position="right"
                  >
                    <button
                      onClick={(e) => {
                        if (method === "COD") {
                          createPayment(data)
                            .then((res) => {
                              toast.success(
                                "Order has been placed succesfully! An email has been succesfully sent to your email id"
                              );
                              window.localStorage.removeItem("cart");
                              dispatch({
                                type: "CART",
                                payload: [],
                              });
                              navigate("/user/profile");
                            })
                            .catch((err) => {
                              toast.error(
                                "Order could not be placed! Complete the Checkout Process Again to Confirm your Order"
                              );
                              navigate("/home");
                            });
                        } else {
                          console.log("PREPAID");
                          console.log(data);
                          createPaymentPrepaid(data)
                            .then(async (res) => {
                              console.log(res.data);
                              // await axios(
                              //   {
                              //     method: "POST",
                              //     headers: {
                              //       Accept: "application/json",
                              //       "Content-Type":	"multipart/form-data"
                              //     },
                              //     url: "http://secure.payu.in/_payment", //Production  url
                              //     form: res.data,
                              //   },
                              fetch("https://secure.payu.in/_payment", {
                                method: "POST",
                                headers: {
                                  Accept: "application/json",
                                  "Content-Type": "application/json",
                                },
                                form: res.data,
                              })
                                .then((res) => console.log(res))
                                .catch((err) => console.log(err));

                              // function (error, httpRes, body) {
                              //   if (error)
                              //     res.send({
                              //       status: false,
                              //       message: error.toString(),
                              //     });
                              //   if (httpRes.statusCode === 200) {
                              //     ////console.log("hi bae");
                              //     res.send(body);
                              //   } else if (
                              //     httpRes.statusCode >= 300 &&
                              //     httpRes.statusCode <= 400
                              //   ) {
                              //     res.redirect(
                              //       httpRes.headers.location.toString()
                              //     );
                              //   }
                              // }
                              // );
                            })
                            .catch((err) => console.log(err));
                        }
                      }}
                      className={styles.finalPress}
                      disabled={!method}
                    >
                      Checkout
                    </button>
                  </Tooltip>
                </center>
              </div>
            </div>
          </div>
        </>
      )}
      {!cart && (
        <h3 style={{ height: "50vh", marginTop: "60px" }}>
          Shop More to Checkout!
        </h3>
      )}
    </React.Fragment>
  );
};

export default Checkout;
