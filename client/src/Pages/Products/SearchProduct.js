import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { searchKeyword } from "../../Axios/Products.js";
import { useDispatch } from "react-redux";
import _ from "lodash";
import { toast } from "react-toastify";
import styles from "../../Components/Products/Canvas.module.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import randomColor from "randomcolor";
import CircularProgress from "@mui/material/CircularProgress";
import { Helmet } from "react-helmet";
const SearchProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const [p, setP] = useState([]);
  const [load, setLoad] = useState(true);
  const getData = () => {
    document.body.scrollTop = 0;
    setLoad(true);
    searchKeyword(params.keyword)
      .then((res) => {
        setLoad(false);
        setP(res.data);
      })
      .catch((err) => {
        setLoad(false);
        toast.error("Unexpected Error, Loading your Searched Products");
      });
  };
  useEffect(() => {
    getData();
  }, [params]);
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
  return (
    <>
      <Helmet>
        <title>Cafecart | Search</title>
      </Helmet>
      {load && (
        <center>
          <CircularProgress size={80} color="secondary" />
        </center>
      )}
      {!load && p.length === 0 && (
        <>
          <div className={styles.heading} style={{ textAlign: "center" }}>
            Your search -{" "}
            <span
              style={{ color: randomColor(), fontWeight: "600" }}
            >{`${params.keyword}`}</span>{" "}
            - did not match any documents.
          </div>
          <center>
            <img
              src="https://res.cloudinary.com/techbuy/image/upload/v1648296565/Screenshot_2022-03-26_173852_qdgvn9.png"
              alt="Items Not Found"
              className={styles.notFound}
            />
          </center>
        </>
      )}
      {!load && p.length > 0 && (
        <>
          <div className={styles.heading}>
            Search Results for :{" "}
            <span
              style={{ color: randomColor(), fontWeight: "600" }}
            >{`${params.keyword}`}</span>
          </div>
          <div className={styles.newArrivals}>
            {p &&
              p.length > 0 &&
              p.map((curr, index) => {
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
                          className={
                            styles.newArrivalItem__meta__actions__buttons
                          }
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
                          className={
                            styles.newArrivalItem__meta__actions__price
                          }
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
            {p &&
              p.length > 0 &&
              p.map((curr, index) => {
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
                        className={
                          styles.newArrivalItem__meta__actions__buttons
                        }
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
        </>
      )}
    </>
  );
};

export default SearchProduct;
