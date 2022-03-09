import React from "react";
import styles from "./Canvas.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
import { Carousel } from "react-responsive-carousel";
import { newArrival, trending, best } from "../../Axios/Products.js";
import _ from "lodash";
import { toast } from "react-toastify";
const Canvas = () => {
  const [newData, setNewData] = React.useState([]);
  const [newTrending, setNewTrending] = React.useState([]);
  const [newBest, setNewbest] = React.useState([]);
  const dispatch = useDispatch();

  const setUser = () => {
    let userr = null;
    let cartLS = [];
    if (window !== "undefined" && window.localStorage.getItem("cartLS"))
      cartLS = JSON.parse(window.localStorage.getItem("cartLS"));

    dispatch({
      type: "CART",
      payload: cartLS,
    });
    let wishlist = [];
    if (window !== "undefined" && window.localStorage.getItem("wishlist"))
      wishlist = JSON.parse(window.localStorage.getItem("wishlist"));

    dispatch({
      type: "WISHLIST",
      payload: wishlist,
    });
    if (window !== "undefined" && window.localStorage.getItem("user"))
      userr = JSON.parse(window.localStorage.getItem("user"));

    dispatch({
      type: "USER_CHANGED",
      payload: userr,
    });
  };

  React.useEffect(() => {
    setUser();
  }, []);

  const { user } = useSelector((state) => ({ ...state }));

  const getNewArrivals = () => {
    newArrival()
      .then((res) => {
        const arr = res.data;
        var width = document.documentElement.clientWidth;

        const x = arr.slice(0, 5);
        if (width < 562) {
          setNewData(x);
        } else setNewData(arr);
      })
      .catch((err) => console.log(err));
  };
  const getTrending = () => {
    trending()
      .then((res) => {
        const arr = res.data;
        var width = document.documentElement.clientWidth;

        const x = arr.slice(0, 5);
        if (width < 562) {
          setNewTrending(x);
        } else setNewTrending(arr);
      })
      .catch((err) => console.log(err));
  };
  const getbest = () => {
    best()
      .then((res) => {
        const arr = res.data;
        var width = document.documentElement.clientWidth;

        const x = arr.slice(0, 4);
        if (width < 562) {
          setNewbest(x);
        } else setNewbest(arr);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getNewArrivals();
    getTrending();
    getbest();
  }, []);
  const navigate = useNavigate();

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
  return (
    <>
      <div className={styles.canvasWrapper}>
        <Carousel
          showIndicators={false}
          autoPlay={true}
          infiniteLoop={true}
          stopOnHover={true}
        >
          <div className={styles.bannerLeft}>
            <p className={styles.leftStyle}>
              {/* <p className={styles.headStyle}>New Arrivals</p> */}
              <p className={styles.middleStyle}>Nescafe Taster's Choice</p>
              <span className={styles.shopNow}>
                Buy Now <ArrowRightAltOutlinedIcon sx={{ fontSize: 20 }} />
              </span>
            </p>
            <div className={styles.bannerImg}>
              <img
                src="https://res.cloudinary.com/techbuy/image/upload/v1645949093/Group_561_jswj7f.png"
                alt="pew"
              />
            </div>
          </div>
          <div className={styles.bannerLeft}>
            <p className={styles.leftStyle}>
              {/* <p className={styles.headStyle}>New Arrivals</p> */}
              <p className={styles.middleStyle}>Nestle Coffee Mate</p>
              <span className={styles.shopNow}>
                Buy Now <ArrowRightAltOutlinedIcon sx={{ fontSize: 20 }} />
              </span>
            </p>
            <div className={styles.bannerImg}>
              <img
                src="https://res.cloudinary.com/techbuy/image/upload/v1645949093/Group_561_jswj7f.png"
                alt="pew"
              />
            </div>
          </div>
          <div className={styles.bannerLeft}>
            <p className={styles.leftStyle}>
              {/* <p className={styles.headStyle}>New Arrivals</p> */}
              <p className={styles.middleStyle}>Nescafé Gold Decaff</p>
              <span className={styles.shopNow}>
                Buy Now <ArrowRightAltOutlinedIcon sx={{ fontSize: 20 }} />
              </span>
            </p>
            <div className={styles.bannerImg}>
              <img
                src="https://res.cloudinary.com/techbuy/image/upload/v1645949093/Group_561_jswj7f.png"
                alt="pew"
              />
            </div>
          </div>
        </Carousel>
      </div>
      <div className={styles.logoImg}>
        {/* <center> */}
        <img
          src="https://res.cloudinary.com/techbuy/image/upload/v1646058507/brands/country_bean_1_onwggz.png"
          alt="hshs"
          // style={{ width: "auto", height: "120px", objectFit: "contain" }}
          onClick={(e) =>
            navigate(
              "/products/category/coffee/coffee-brands/country-bean-6eQ_Fq7vY"
            )
          }
        />
        <img
          src="https://res.cloudinary.com/techbuy/image/upload/v1646058507/brands/starbucks_1_jdybfr.png"
          alt="hshs"
          onClick={(e) =>
            navigate("/products/category/coffee/coffee-brands/starbucks")
          }
        />
        <img
          src=" https://res.cloudinary.com/techbuy/image/upload/v1646058506/brands/Illy_ycf22o.png"
          alt="hshs"
          onClick={(e) =>
            navigate("/products/category/coffee/coffee-brands/illy")
          }
        />
        <img
          src="https://res.cloudinary.com/techbuy/image/upload/v1646058506/brands/Nescafe_udmrqz.png"
          alt="hshs"
          onClick={(e) =>
            navigate("/ products/category/coffee/coffee-brands/nescafe")
          }
        />
        <img
          src="https://res.cloudinary.com/techbuy/image/upload/v1646059857/brands/kenco_srxwba.png"
          alt="hshs"
          onClick={(e) =>
            navigate("/products/category/coffee/coffee-brands/kenco")
          }
        />
        <img
          src="https://res.cloudinary.com/techbuy/image/upload/v1646060059/brands/Jacobs_kelwjg.png"
          alt="hshs"
          onClick={(e) =>
            navigate("/products/category/coffee/coffee-brands/jacobs-QHzLMjpsi")
          }
        />
        <img
          src=" https://res.cloudinary.com/techbuy/image/upload/v1646060205/brands/lavazza_tv5ax7.png"
          alt="hshs"
          onClick={(e) =>
            navigate("/products/category/coffee/coffee-brands/lavazza")
          }
        />
        <img
          src="https://res.cloudinary.com/techbuy/image/upload/v1646058508/brands/Davidoff_logo_1_rp3kmx.png"
          alt="hshs"
          onClick={(e) =>
            navigate("/products/category/coffee/coffee-brands/davidoff")
          }
        />
      </div>

      <div className={styles.whyCafecart}>
        <center>
          <img
            src="https://res.cloudinary.com/techbuy/image/upload/v1645949093/Group_561_jswj7f.png"
            alt="hshs"
            style={{ padding: "2px 10px" }}
          />
        </center>
      </div>
      <div className={styles.heading}>Categories</div>
      <div className={styles.categories}>
        <div
          className={styles.category}
          onClick={(e) => navigate("/products/category/coffee")}
        >
          <img
            src="https://wallpaperaccess.com/full/309831.jpg"
            alt="imr"
            className={styles.category__img}
          />
          <div className={styles.categories__text}>Instant Coffee</div>
        </div>
        <div
          className={styles.category}
          onClick={(e) => navigate("/products/category/coffee/coffee-brands")}
        >
          <img
            src="https://wallpaperaccess.com/full/309833.jpg"
            alt="imr"
            className={styles.category__img}
          />
          <div className={styles.categories__text}>Coffee Beans</div>
        </div>
        <div
          className={styles.category}
          onClick={(e) => navigate("/products/category/pods")}
        >
          <img
            src="https://wallpaperaccess.com/full/247868.jpg"
            alt="imr"
            className={styles.category__img}
          />
          <div className={styles.categories__text}>Coffee Pods</div>
        </div>
      </div>
      <div className={styles.heading}>New Arrivals</div>
      <div className={styles.newArrivals}>
        {newData &&
          newData.length > 0 &&
          newData.map((curr, index) => {
            return (
              <div className={styles.newArrivalItem} key={index}>
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
                      <FavoriteBorderOutlinedIcon
                        sx={{ fontSize: 30 }}
                        className={styles.icon}
                        onClick={(e) => {
                          handleWishlist(curr?._id, curr?.title);
                        }}
                      />
                      <ShoppingCartOutlinedIcon
                        sx={{ fontSize: 30 }}
                        className={styles.icon}
                        onClick={(e) => {
                          handleCart(curr?._id, curr?.title);
                        }}
                      />
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
      <div className={styles.bannerImg}>
        <img
          src="https://res.cloudinary.com/techbuy/image/upload/v1645956998/COVID/Rectangle_306_cezbh7.png"
          alt="banner"
          style={{ width: "100%", height: "50%", margin: "10px 0px 20px 0px" }}
        />
      </div>
      <div className={styles.bestOnes}>
        <div className={styles.bestOnesHead}>Best In Cafecart</div>
        <div className={styles.bestOnesItems}>
          {newBest &&
            newBest.length > 0 &&
            newBest.map((curr, index) => {
              return (
                <div
                  className={styles.bestOnesItem}
                  key={index}
                  onClick={(e) => navigate(`/products/${curr._id}`)}
                >
                  <div className={styles.bestOnesOuter}>
                    <div className={styles.bestOnesImg}>
                      <img
                        src={curr?.imagePath[0]}
                        alt="imr"
                        className={styles.special__img}
                      />
                    </div>
                    <div className={styles.bestOnesMeta}>
                      <div className={styles.bestOnesMetaLeft}>
                        <div className={styles.bestOnesMetaLeftTitle}>
                          {curr?.title}
                        </div>
                        {/* <div className={styles.bestOnesMetaLeftDescription}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </div> */}
                      </div>
                      <div className={styles.bestOnesMetaRight}>
                        <div className={styles.bestOnesMetaRightPrice}>
                          ₹{curr?.price}
                        </div>
                        <div className={styles.bestOnesMetaRightMRP}>
                          <del>₹{curr.mrpPrice}</del>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className={styles.heading}>Trending</div>
      <div className={styles.newArrivals}>
        {newTrending &&
          newTrending.length > 0 &&
          newTrending.map((curr, index) => {
            return (
              <div className={styles.newArrivalItem} key={index}>
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
                      <FavoriteBorderOutlinedIcon
                        sx={{ fontSize: 30 }}
                        className={styles.icon}
                        onClick={(e) => {
                          handleWishlist(curr?._id, curr?.title);
                        }}
                      />
                      <ShoppingCartOutlinedIcon
                        sx={{ fontSize: 30 }}
                        className={styles.icon}
                        onClick={(e) => {
                          handleCart(curr?._id, curr?.title);
                        }}
                      />
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
      <div className={styles.bannerImg}>
        <img
          src="https://res.cloudinary.com/techbuy/image/upload/v1645956998/COVID/Rectangle_306_cezbh7.png"
          alt="banner"
          style={{ width: "100%", height: "50%", margin: "10px 0px 0px 0px" }}
        />
      </div>
    </>
  );
};

export default Canvas;
