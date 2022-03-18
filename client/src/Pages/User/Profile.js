import React from "react";
import styles from "./Profile.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactRoundedImage from "react-rounded-image";
import CallIcon from "@mui/icons-material/Call";
import { toast } from "react-toastify";
import _ from "lodash";
import { getMyOrders } from "../../Axios/Order.js";
import moment from "moment";
import ReplayIcon from "@mui/icons-material/Replay";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { completeWishlist } from "../../Axios/Cart.js";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import fancy from "../../Components/Products/Canvas.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CircularProgress from "@mui/material/CircularProgress";
import * as All from "react-responsive-modal";
import { updatePassword } from "../../Axios/Authentication.js";
import fancy1 from "../../Components/Header/Header.module.css";
const Profile = () => {
  const { user, wishlist } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orders, setOrders] = React.useState(null);
  const [wish, setWish] = React.useState(null);
  const getData = () => {
    getMyOrders(user?.id)
      .then((res) => {
        setOrders(res?.data);
        setOrdersLoading(false);
      })
      .catch((err) => {
        setOrdersLoading(false);
      });
  };

  React.useEffect(() => {
    getData();
  }, []);
  //to calculate quantity of order items
  const calculateQty = (order) => {
    const qty = order?.items?.length;
    if (qty > 0) return `${order?.items?.length}`;
    else return 0;
  };

  //--------------------------TO HANDLE WISHLIST--------------------------
  const getData1 = () => {
    completeWishlist(wishlist)
      .then((res) => {
        setWish(res.data);
        setWishlistLoading(false);
      })
      .catch((err) => setWishlistLoading(false));
  };
  React.useEffect(() => {
    getData1();
  }, [wishlist]);

  //HANDLING CART ITEMS
  const handleCart = (id, name) => {
    //first just insert it to the LS;
    let cartLS = [];
    if (window !== undefined && window.localStorage.getItem("cartLS")) {
      cartLS = JSON.parse(window.localStorage.getItem("cartLS"));
    }

    //WE WILL INSERT THE PRODUCTS AS {_id,quantity}
    const object = {
      _id: id,
      name: name,
      quantity: 1,
    };
    cartLS.push(object);
    cartLS = _.uniqBy(cartLS, "_id");
    //SEND IT TO THE LS
    window.localStorage.setItem("cartLS", JSON.stringify(cartLS));
    dispatch({
      type: "CART",
      payload: cartLS,
    });
    toast.success(`${name} has been added to your cart`);

    dispatch({
      type: "DRAWER_VISIBLE",
      payload: true,
    });
  };
  const buyNowHandler = (p) => {
    //id is in params.id
    //add to cart, and dispatch to redux
    let cart = [];

    const createObj = {
      _id: p?._id,
      name: p?.title,
      quantity: 1,
    };
    cart.push(createObj);
    window.localStorage.setItem("cartLS", JSON.stringify(cart));
    dispatch({
      type: "CART",
      payload: cart,
    });
    navigate("/cart");
  };
  //for loading spinners
  const [ordersLoading, setOrdersLoading] = React.useState(true);
  const [wishlistLoading, setWishlistLoading] = React.useState(true);
  const [loading, setLoading] = React.useState(false);

  /*FOR CHANGE PASSWORD*/
  const [on, setOn] = React.useState(false);
  const [fp, setfp] = React.useState({});
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

  return (
    <>
      <All.Modal open={on} onClose={(e) => setOn(false)} center>
        <div className={fancy1.FPBackground}>
          <h2 className={fancy1.FPHead}>Change Password</h2>
          <form onSubmit={handleFp}>
            <input
              type="password"
              className={fancy1.FPInput}
              placeholder="Current Password"
              onChange={(e) => setfp({ ...fp, previous: e.target.value })}
              value={fp?.previous}
            />
            <input
              type="password"
              className={fancy1.FPInput}
              placeholder="New Password"
              onChange={(e) => setfp({ ...fp, current: e.target.value })}
              value={fp?.current}
            />
            <input
              type="text"
              className={fancy1.FPInput}
              placeholder="Confirm Password"
              onChange={(e) =>
                setfp({ ...fp, currentVerified: e.target.value })
              }
              value={fp?.currentVerified}
            />

            <label className={fancy1.FPLabel}>
              * Passwords are Case-Sensitive
            </label>
            <center>
              <input
                type="submit"
                className={fancy1.FPSubmit}
                value={loading ? "Please Wait..." : "Change Password"}
              />
            </center>
          </form>
        </div>
      </All.Modal>
      <div className={styles.profileWrapper}>
        {/* We have 2 sections, on the left orders and profile, on the right : Wishlist */}
        <div className={styles.profileLeft}>
          <div className={styles.profile}>
            <div className={styles.profileImage}>
              <center>
                <ReactRoundedImage
                  image={
                    "https://res.cloudinary.com/techbuy/image/upload/v1647524323/avatar-g2b3bb93f8_1280_gq9zi5.png"
                  }
                  roundedColor="#fff"
                  imageWidth="150"
                  imageHeight="150"
                  roundedSize="13"
                  borderRadius="70"
                  style={{ boxShadow: " 0px 4px 12px rgba(0, 0, 0, 0.25)" }}
                />
              </center>
            </div>

            <div className={styles.profileMeta}>
              <div className={styles.profileId}>User Id:{user?.id}</div>
              <div className={styles.profileName}>Name:{user?.name}</div>
              <div className={styles.profileExtra}>@ {user?.email}</div>
              <div className={styles.profileExtra}>
                <CallIcon />{" "}
                {user?.contactVerified
                  ? "+91 " + user?.contact
                  : "Phone Number Not Verified"}
              </div>
            </div>
          </div>
          <div className={styles.profileButtons}>
            <button className={styles.btn} onClick={(e) => setOn(true)}>
              Change Password
            </button>
          </div>
          <div className={styles.list}>
            <div className={styles.head}>Order History</div>
            {ordersLoading && (
              <center>
                <CircularProgress
                  size={80}
                  sx={{ color: "#a0522d", size: 50 }}
                />
              </center>
            )}
            {!ordersLoading && (
              <div className={styles.orderList}>
                {orders &&
                  orders.length > 0 &&
                  orders.map((curr, index) => {
                    return (
                      <div className={styles.order} key={index}>
                        <div className={styles.order_left}>
                          <div className={styles.details}>
                            <div className={styles.orderFootprint}>
                              <div className={styles.details_title}>
                                {" "}
                                ✤ Ordered On
                              </div>
                              <div className={styles.details_text}>
                                <div className={styles.details_text_content}>
                                  &emsp;
                                  {moment(curr?.createdAt).format(
                                    "MMM Do YYYY"
                                  )}
                                </div>
                                <div className={styles.details_text_content}>
                                  &emsp;Payment Method : {curr?.orderType}
                                </div>
                                <div className={styles.details_text_content}>
                                  &emsp;Quantity :{" "}
                                  {curr?.items
                                    ? calculateQty(curr)
                                    : curr?.cart?.totalQty}
                                </div>
                              </div>
                            </div>
                            <div className={styles.orderFootprint}>
                              <div className={styles.details_title}>
                                {" "}
                                ✤ Contact Details
                              </div>
                              <div className={styles.details_text}>
                                <div className={styles.details_text_content}>
                                  &emsp;
                                  <img
                                    src="https://res.cloudinary.com/techbuy/image/upload/v1647529671/Vector_1_fkq4lu.png"
                                    alt="phone_icon"
                                  />{" "}
                                  {curr?.customerContact
                                    ? curr?.customerContact
                                    : user?.contact}
                                </div>
                                <div className={styles.details_text_content}>
                                  &emsp;
                                  <img
                                    src="https://res.cloudinary.com/techbuy/image/upload/v1647529767/Vector_2_azp9ny.svg"
                                    alt="icon"
                                  />{" "}
                                  {curr?.customerEmail
                                    ? curr.customerEmail
                                    : user.email}
                                </div>
                              </div>
                            </div>
                            <div className={styles.orderFootprint}>
                              <div className={styles.details_title}>
                                {" "}
                                ✤ Address
                              </div>
                              <div className={styles.details_text}>
                                <div className={styles.details_text_content}>
                                  &emsp;
                                  {curr?.customerAddress
                                    ? curr?.customerAddress
                                    : curr?.address}
                                </div>
                                <div className={styles.details_text_content}>
                                  &emsp;{curr?.customerCity}
                                </div>
                                <div className={styles.details_text_content}>
                                  &emsp;{curr?.customerState}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className={styles.order_right}>
                          <div className={styles.orderId}>
                            Order Id : {curr?._id}
                          </div>
                          <div className={styles.orderFirstItem}>
                            <div className={styles.orderFirstItemDetail}>
                              <div
                                className={styles.orderFirstItemDetail_title}
                              >
                                {curr?.items && curr?.items[0]?.productId?.title
                                  ? curr?.items[0]?.productId?.title
                                  : curr?.cart?.items[0]?.productId?.title}
                              </div>
                              <div
                                className={styles.orderFirstItemDetail_title}
                              >
                                ₹{" "}
                                {curr.items && curr?.items[0]?.productId?.price
                                  ? curr?.items[0]?.productId?.price
                                  : curr?.cart?.items[0]?.productId?.price}
                              </div>
                              <div>
                                <img
                                  src={
                                    curr.items &&
                                    curr?.items[0]?.productId?.imagePath[0]
                                      ? curr?.items[0]?.productId?.imagePath[0]
                                      : curr?.cart?.items[0]?.productId
                                          ?.imagePath[0]
                                  }
                                  alt="first Product Images"
                                  className={styles.imageProduct}
                                />
                              </div>
                            </div>
                            <div className={styles.statusButtons}>
                              {/* <div className={styles.status}>Hello</div> */}
                              <div className={styles.bttns}>
                                <button
                                  className={styles.btn}
                                  onClick={(e) =>
                                    navigate(
                                      `/products/${
                                        curr.items &&
                                        curr?.items[0]?.productId?._id
                                          ? curr?.items[0]?.productId?._id
                                          : curr?.cart.items[0]?.productId?._id
                                      }`
                                    )
                                  }
                                >
                                  <ReplayIcon /> Buy Again
                                </button>
                                <button
                                  className={styles.btn}
                                  onClick={(e) =>
                                    navigate(`/user/order/${curr?._id}`)
                                  }
                                >
                                  <RemoveRedEyeIcon /> View Order
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
        <div className={styles.profileRight}>
          <div className={styles.head}>Wishlist</div>
          {wishlistLoading && (
            <center>
              <CircularProgress size={50} sx={{ color: "#000", size: 50 }} />
            </center>
          )}
          <center>
            <div className={fancy.newArrivals}>
              {wish &&
                wish.length > 0 &&
                wish.map((curr, index) => {
                  return (
                    <div
                      className={fancy.newArrivalItem}
                      key={index}
                      style={{ width: "100%" }}
                    >
                      <div className={fancy.top}>
                        <div>
                          <center>
                            <img
                              src={curr?.imagePath[0]}
                              alt="imr"
                              className={fancy.newArrivalItem__img}
                              onClick={(e) => navigate(`/products/${curr._id}`)}
                            />
                          </center>
                        </div>
                        <div>
                          <FavoriteIcon
                            sx={{ fontSize: 30 }}
                            className={fancy.icon}
                          />
                        </div>
                      </div>
                      <div className={fancy.newArrivalItem__meta}>
                        <div
                          className={fancy.newArrivalItem__meta__title}
                          // onClick={(e) => navigate(`/products/${curr._id}`)}
                        >
                          {curr?.title}
                        </div>
                        {/* <div className={fancy.newArrivalItem__meta__description}>
                    {`${curr?.short_description?.substring(0, 80)}...`}
                  </div> */}
                        <div className={fancy.newArrivalItem__meta__actions}>
                          <div
                            className={
                              fancy.newArrivalItem__meta__actions__buttons
                            }
                          >
                            {/* <FavoriteBorderOutlinedIcon
                        sx={{ fontSize: 30 }}
                        className={fancy.icon}
                        onClick={(e) => {
                          handleWishlist(curr?._id, curr?.title);
                        }}
                      /> */}
                            <ShoppingCartOutlinedIcon
                              sx={{ fontSize: 30 }}
                              className={fancy.icon}
                              onClick={(e) => {
                                handleCart(curr?._id, curr?.title);
                                dispatch({
                                  type: "DRAWER_VISIBLE",
                                  payload: true,
                                });
                              }}
                            />
                            <button
                              className={fancy.buyNowButton}
                              onClick={(e) => buyNowHandler(curr)}
                            >
                              Buy
                            </button>
                          </div>
                          <div
                            className={
                              fancy.newArrivalItem__meta__actions__price
                            }
                          >
                            <p className={fancy.price}>₹{curr?.price}</p>
                            <p className={fancy.mrpPrice}>
                              <del>₹{curr?.mrpPrice}</del>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </center>
        </div>
      </div>
    </>
  );
};

export default Profile;
