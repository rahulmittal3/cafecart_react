import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { variety } from "../../Axios/Products.js";
import styles from "./CategorySlug.module.css";
import CircleInfinite from "../../Components/Utilities/CircleInfinite.js";
import { useDispatch } from "react-redux";
import { createName } from "../../Components/Utilities/createNameBreadcrumbs.js";
import { toast } from "react-toastify";
import _ from "lodash";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Breadcrumb } from "antd";
import { Dots } from "react-preloaders2";
import { Helmet } from "react-helmet";
const Variety = () => {
  useEffect(() => {
    document.body.scrollTop = 0;
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const [ans, setAns] = useState(null);
  const getData = () => {
    setLoading(true);
    variety(params.id1, params.id2, params.id3)
      .then((res) => {
        setAns(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    getData();
  }, [params]);
  useEffect(() => {
    let x = undefined;
    if (window !== "undefined" && window.localStorage.getItem("user")) {
      x = JSON.parse(window.localStorage.getItem("user"));
    }
    if (x) {
      dispatch({
        type: "USER_CHANGED",
        payload: x,
      });
    }
  }, []);
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
    dispatch({
      type: "DRAWER_VISIBLE",
      payload: true,
    });
    toast.success(`${name} has been added to your cart`);
  };
  const handleWishlist = (id, name) => {
    //first just insert it to the LS;
    let wishlist = [];
    if (window !== undefined && window.localStorage.getItem("wishlist")) {
      wishlist = JSON.parse(window.localStorage.getItem("wishlist"));
    }
    //WE WILL INSERT THE PRODUCTS AS {_id,quantity}

    wishlist.push(id);
    wishlist = _.uniq(wishlist);
    //SEND IT TO THE LS
    window.localStorage.setItem("wishlist", JSON.stringify(wishlist));
    dispatch({
      type: "WISHLIST",
      payload: wishlist,
    });
    toast.success(`${name} has been added to your wishlist`);
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
  return (
    <>
      <Helmet>
        <title>
          Cafecart | {createName(params.id1)} : {createName(params.id3)}{" "}
        </title>
      </Helmet>
      <Breadcrumb
        separator=">"
        style={{ marginLeft: "30px", marginBottom: "30px" }}
      >
        <Breadcrumb.Item>
          <Link to="/">Home</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <Link to={`/products/category/${params.id1}`}>
            {createName(params.id1)}
          </Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <Link
            to={`/products/category/${params.id1}/${params.id2}/${params.id3}`}
          >
            {createName(params.id2)}
          </Link>{" "}
        </Breadcrumb.Item>
      </Breadcrumb>

      <div className={styles.newArrivals}>
        {!ans | (ans && ans.length === 0) && (
          <div className={styles.noItem}>
            <div>No Items Found</div>
          </div>
        )}
        {ans &&
          ans.length > 0 &&
          ans.map((curr, index) => {
            return (
              <div className={styles.newArrivalItem} key={index}>
                <div className={styles.top}>
                  <div>
                    <center>
                      <img
                        src={curr?.imagePath[0]}
                        alt="imr"
                        className={styles.newArrivalItem__img}
                        onClick={(e) => navigate(`/products/${curr._id}`)}
                      />
                    </center>
                  </div>
                  <div>
                    <FavoriteBorderOutlinedIcon
                      sx={{ fontSize: 30 }}
                      className={styles.icon}
                      onClick={(e) => {
                        handleWishlist(curr?._id, curr?.title);
                      }}
                    />
                  </div>
                </div>

                <div className={styles.newArrivalItem__meta}>
                  <div
                    className={styles.newArrivalItem__meta__title}
                    onClick={(e) => navigate(`/products/${curr._id}`)}
                  >
                    {curr?.title}
                  </div>
                  {/* <div className={styles.newArrivalItem__meta__description}>
                    {`${curr?.short_description?.substring(0, 80)}...`}
                  </div> */}
                  <div className={styles.newArrivalItem__meta__actions}>
                    <div
                      className={styles.newArrivalItem__meta__actions__buttons}
                    >
                      {/* <FavoriteBorderOutlinedIcon
                        sx={{ fontSize: 30 }}
                        className={styles.icon}
                        onClick={(e) => {
                          handleWishlist(curr?._id, curr?.title);
                        }}
                      /> */}
                      <ShoppingCartOutlinedIcon
                        sx={{ fontSize: 30 }}
                        className={styles.icon}
                        onClick={(e) => {
                          handleCart(curr?._id, curr?.title);
                          dispatch({
                            type: "DRAWER_VISIBLE",
                            payload: true,
                          });
                        }}
                      />
                      <button
                        className={styles.buyNowButton}
                        onClick={(e) => buyNowHandler(curr)}
                      >
                        Buy
                      </button>
                    </div>
                    <div
                      className={styles.newArrivalItem__meta__actions__price}
                    >
                      <p className={styles.price}>₹{curr?.price}</p>
                      <p className={styles.mrpPrice}>
                        <del>₹{curr?.mrpPrice}</del>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className={styles.newArrivals1}>
        {!ans | (ans && ans.length === 0) && (
          <div className={styles.noItem}>
            <div>No Items Found</div>
          </div>
        )}
        {ans &&
          ans.length > 0 &&
          ans.map((curr, index) => {
            return (
              <div key={index} className={styles.newArrivalItem1}>
                <div className={styles.top1}>
                  <div>
                    <center>
                      <img
                        src={curr?.imagePath[0]}
                        alt="imr"
                        className={styles.newArrivalItem__img1}
                        onClick={(e) => navigate(`/products/${curr._id}`)}
                      />
                    </center>
                  </div>
                  <div>
                    <FavoriteBorderOutlinedIcon
                      sx={{ fontSize: 24 }}
                      className={styles.icon}
                      onClick={(e) => {
                        handleWishlist(curr?._id, curr?.title);
                      }}
                    />
                  </div>
                </div>
                <div className={styles.text1}>
                  <div>
                    <div
                      className={styles.newArrivalItem__meta__title}
                      style={{ fontSize: "100%", textAlign: "left" }}
                      onClick={(e) => navigate(`/products/${curr._id}`)}
                    >
                      {curr?.title}
                    </div>
                    <div>
                      <span
                        className={styles.price}
                        style={{ fontSize: "110%" }}
                      >
                        ₹{curr?.price}
                      </span>
                      <span
                        className={styles.mrpPrice}
                        style={{ fontSize: "100%" }}
                      >
                        <del>₹{curr?.mrpPrice}</del>
                      </span>
                    </div>
                  </div>
                  <div
                    className={styles.newArrivalItem__meta__actions__buttons}
                  >
                    {/* <FavoriteBorderOutlinedIcon
                        sx={{ fontSize: 30 }}
                        className={styles.icon}
                        onClick={(e) => {
                          handleWishlist(curr?._id, curr?.title);
                        }}
                      /> */}
                    <ShoppingCartOutlinedIcon
                      sx={{ fontSize: 30 }}
                      className={styles.icon}
                      onClick={(e) => {
                        handleCart(curr?._id, curr?.title);
                        dispatch({
                          type: "DRAWER_VISIBLE",
                          payload: true,
                        });
                      }}
                    />
                    &emsp;
                    <button
                      className={styles.buyNowButton}
                      onClick={(e) => buyNowHandler(curr)}
                    >
                      Buy
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      {loading && <Dots customLoading={true} />}
    </>
  );
};

export default Variety;
