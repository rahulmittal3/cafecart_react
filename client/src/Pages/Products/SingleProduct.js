import React from "react";
import styles from "./SingleProduct.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link, useNavigate } from "react-router-dom";
import { singleProduct, createReview } from "../../Axios/Products.js";
import { Carousel } from "react-responsive-carousel";
import ModalImage from "react-modal-image";
import { toast } from "react-toastify";
import axios from "axios";
import { Tabs } from "antd";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"; // requires a loader
import { otherProducts, getReviews } from "../../Axios/Products.js";
import styles1 from "../../Components/Products/Canvas.module.css";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import _ from "lodash";
import StarRatings from "react-star-ratings";
import moment from "moment";
import { Progress } from "antd";
import { Helmet } from "react-helmet";
const { TabPane } = Tabs;

const SingleProduct = () => {
  const params = useParams();
  React.useEffect(() => {
    document.body.scrollTop = 0;
  }, [params]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [other, setOther] = React.useState([]);
  const [current, setCurrent] = React.useState({ quantity: 1 });
  const [star, setStar] = React.useState(1);
  const [text, setText] = React.useState("");
  const { user } = useSelector((state) => ({ ...state }));
  const [rev, setRev] = React.useState([]);
  let WL = [];

  const [value, setValue] = React.useState("one");
  const [addedtoCart, setAddedtoCart] = React.useState(false);
  const [p, setP] = React.useState(null);

  const getProduct = () => {
    singleProduct(params.id)
      .then((res) => setP(res.data))
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getProduct();
  }, [params.id]);

  const getEveryReview = () => {
    getReviews(params.id)
      .then((res) => setRev(res.data))
      .catch((err) => toast.error("Error Fetching the Reviews"));
  };

  const [pin, setPin] = React.useState("");
  const [pinMsg, setPinMsg] = React.useState(false);
  const handlePin = async (e) => {
    setPinMsg(true);
    e.preventDefault();

    try {
      const result = await axios({
        method: "GET",
        url: `https://api.postalpincode.in/pincode/${pin}`,
      });

      if (result.data[0].PostOffice) {
        //means a valid post office here, gte the 1st item here
        toast.success(
          `Shipping Available at ${result.data[0].PostOffice[0].Name},${result.data[0].PostOffice[0].District}! Happy Shopping! 🛍️`
        );
        setPinMsg(false);
        setPin("");
      } else {
        //means valid post office not present
        toast.error("Item unavailable for delivery at your doorstep!");
        setPin("");
        setPinMsg(false);
      }
    } catch (error) {
      setPinMsg(false);
      toast.error("Unexpected Error");
    }
  };
  //add to cart to
  const handleCart = (id, name) => {
    //set to the localStorage
    let cartLS = [];
    if (window !== "undefined" && window.localStorage.getItem("cartLS")) {
      cartLS = JSON.parse(window.localStorage.getItem("cartLS"));
    }
    //1st add it to the starting, so that it can override the other changes in the array
    const x = cartLS.unshift({
      _id: id,
      name: name,
      quantity: current?.quantity,
    });
    //now get the unique
    cartLS = _.uniqBy(cartLS, "_id");
    window.localStorage.setItem("cartLS", JSON.stringify(cartLS));
    dispatch({
      type: "CART",
      payload: cartLS,
    });
    dispatch({
      type: "DRAWER_VISIBLE",
      payload: true,
    });
    toast.success(`${name} has been successfully added to Cart`);
  };
  const handleWishlist = (id) => {
    console.log(id);
    let wishlist = [];
    if (window !== "undefined" && window.localStorage.getItem("wishlist")) {
      wishlist = JSON.parse(window.localStorage.getItem("wishlist"));
    }
    //1st add it to the starting, so that it can override the other changes in the array
    wishlist.push(id);
    wishlist = _.uniq(wishlist);

    //now get the unique
    window.localStorage.setItem("wishlist", JSON.stringify(wishlist));
    dispatch({
      type: "WISHLIST",
      payload: wishlist,
    });
    toast.success(`Item has been successfully added to Wishlist`);
  };
  const createMarkup = () => {
    return { __html: p?.short_description };
  };
  const createMarkup1 = () => {
    return { __html: p?.description };
  };
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoPlay: true,
    fade: true,
  };
  const getOtherProducts = () => {
    otherProducts(p?.title)
      .then((res) => setOther(res.data))
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getOtherProducts();
  }, [p]);
  const handleReview = () => {
    if (!user) {
      toast.warning("Please Login to Review");
      return;
    }
    createReview(user.jwt, p?._id, star, text)
      .then((res) => {
        toast.success("Review Added Successfully");
        getEveryReview();
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    p && getEveryReview();
  }, [p]);
  //now get the reviewMarks
  let one = 0;
  let two = 0;
  let three = 0;
  let four = 0;
  let five = 0;

  for (let i = 0; i < rev?.length; i++) {
    const rate = rev[i].rating;
    if (rate === 1) one++;
    if (rate === 2) two++;
    if (rate === 3) three++;
    if (rate === 4) four++;
    if (rate === 5) five++;
  }
  let avg = 0;
  if (rev.length === 0) {
    avg = 0;
  } else {
    avg = one * 1 + two * 2 + three * 3 + five * 5 + four * 4;
    avg = (avg / rev.length).toFixed(1);
  }
  const buyNowHandler = (p) => {
    //id is in params.id
    //add to cart, and dispatch to redux
    let cart = [];

    const createObj = {
      _id: p?._id,
      name: p?.title,
      quantity: current?.quantity,
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
    <React.Fragment>
      <Helmet>
        <title>Cafecart | {`${p?.title ? p.title : ""}`}</title>
      </Helmet>
      <div className={styles.notif}>
        Free Shipping over <span className={styles.notifAmount}>₹ 499</span>
      </div>
      <div className={styles.topMost}>
        <div className={styles.carousel}>
          <Slider
            {...settings}
            // style={{ height: "", width: "90%", objectFit: "contain" }}
          >
            {p &&
              p.imagePath &&
              p.imagePath.map((curr, index) => {
                return (
                  <img
                    src={curr}
                    alt="Craousel"
                    key={index}
                    className={styles.carouselStyling}
                  />
                );
              })}
          </Slider>
        </div>
        <div className={styles.info}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {p?.available && <div className={styles.inStock}>In Stock</div>}
            {p?.available === false && (
              <div className={styles.inStock} style={{ color: "red" }}>
                Out of Stock
              </div>
            )}
            <FavoriteBorderOutlinedIcon
              sx={{ fontSize: 40 }}
              style={{ cursor: "pointer" }}
              onClick={(e) => handleWishlist(params?.id)}
            />
          </div>

          <div className={styles.title}>{p?.title}</div>
          <div
            className={styles.starsTotal}
            style={{
              margin: "0px 0px",
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-end",
            }}
          >
            <StarRatings
              rating={Number(avg)}
              starRatedColor="#fccc4d"
              // changeRating={this.changeRating}
              numberOfStars={5}
              svgIconPath="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
              starDimension="20px"
            />
            <span className={styles.starDetail}>
              ({rev?.length} {rev?.length <= 1 ? "Review" : "Reviews"})
            </span>
          </div>
          <div className={styles.price}>
            <span className={styles.price}>₹ {p?.price}</span>
            <span className={styles.mrpPrice}>₹ {p?.mrpPrice}</span>
          </div>
          <div className={styles.variants}>
            {p &&
              p.variants &&
              p.variants.map((curr, index) => {
                return (
                  <div key={index}>
                    <div className={styles.variantTitle}>
                      {curr.main_varient}
                    </div>

                    <div className={styles.variantSubs}>
                      {curr &&
                        curr.sub_variants &&
                        curr.sub_variants.map((curr, index) => {
                          return (
                            <div
                              key={index}
                              onClick={(e) =>
                                navigate(`/products/${curr.variantid}`)
                              }
                              className={`${styles.variantItem} ${
                                params.id === curr.variantid
                                  ? styles.variant_selected
                                  : ""
                              }`}
                              id={
                                params.id === curr.variantid
                                  ? "variant_selected"
                                  : ""
                              }
                            >
                              {curr.quantity_type}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className={styles.quantity}>
            <span
              className={styles.plus}
              onClick={(e) => {
                if (current?.quantity === 5) {
                  toast.warning("Maximum Quantity per Order is 5");
                  return;
                } else {
                  const x = current.quantity;
                  setCurrent({ ...current, quantity: x + 1 });
                }
              }}
            >
              +
            </span>
            <input type="text" value={current?.quantity} disabled={true} />
            <span
              className={styles.plus}
              onClick={(e) => {
                if (current?.quantity === 1) {
                  toast.warning("Minimum Quantity per Order is 1");
                  return;
                } else {
                  const x = current.quantity;
                  setCurrent({ ...current, quantity: x - 1 });
                }
              }}
            >
              -
            </span>
          </div>
          <br />
          <div className={styles.checkout}>
            <div className={styles.variantTitle}>Checkout</div>
            <div className={styles.checkoutBtns}>
              <button
                className={styles.addToCart}
                style={{ cursor: "pointer" }}
                onClick={(e) => handleCart(p?._id, p?.title)}
                disabled={p?.available !== true}
              >
                {p?.available !== true ? "Out of Stock" : "Add to Cart"}
              </button>
              <button
                className={styles.buyNow}
                style={{ cursor: "pointer" }}
                disabled={p?.available !== true}
                onClick={(e) => buyNowHandler(p)}
              >
                {p?.available !== true ? "Out of Stock" : "Buy Now"}
              </button>
            </div>
          </div>
          <div className={styles.checkout}>
            <div className={styles.variantTitle}>Description</div>
            <div
              dangerouslySetInnerHTML={createMarkup()}
              className={styles.description}
            />
          </div>
          <div className={styles.meta}>
            <img
              src="https://res.cloudinary.com/techbuy/image/upload/v1646214227/Group_125_s17liq.png"
              alt="cafecart"
            />

            <img
              src="https://res.cloudinary.com/techbuy/image/upload/v1646214228/Group_98_nguqa4.png"
              alt="cafecart"
            />
            <img
              src="https://res.cloudinary.com/techbuy/image/upload/v1646214228/Group_101_bzenjv.png"
              alt="cafecart"
            />
            <img
              src="https://res.cloudinary.com/techbuy/image/upload/v1646214227/Group_124_scg5ro.png"
              alt="cafecart"
            />
          </div>
          <div className={styles.pin}>
            <span className={styles.pinInput}>
              <input
                type="number"
                onChange={(e) => setPin(e.target.value)}
                value={pin}
              />
            </span>
            <span className={styles.pinBtn}>
              <button
                className={styles.pinBtnClick}
                onClick={handlePin}
                disabled={pinMsg}
              >
                {pinMsg ? "Verifying.." : "Check Pin"}
              </button>
            </span>
          </div>
          <div className={styles.pinInfo}>
            Enter your Pincode to check Delivery Options available in your Area.
          </div>
        </div>
      </div>
      <div className={styles.tabs}>
        <Tabs defaultActiveKey="1" centered size="large">
          <TabPane tab="Description" key="1">
            <center>
              <div dangerouslySetInnerHTML={createMarkup1()}></div>
            </center>
          </TabPane>
          <TabPane tab="Specifications" key="2">
            <center>
              <div className="table-responsive">
                <div className=" m-lr-auto">
                  <ul className="p-lr-5 p-lr-5-sm">
                    <li className="flex-w flex-t p-b-7">
                      <span className="stext-102 c15 size-205 ">Weight</span>
                      <span className="stext-102 cl6 size-206">
                        {p?.specific_quantity}
                      </span>
                    </li>
                    <li className="flex-w flex-t p-b-7">
                      <span className="stext-102 c15 size-205 ">Materials</span>
                      <span className="stext-102 cl6 size-206">
                        {p?.specific_ingredients}
                      </span>
                    </li>
                    <li className="flex-w flex-t p-b-7">
                      <span className="stext-102 c15 size-205 ">Type</span>
                      <span className="stext-102 cl6 size-206">
                        {p?.specific_type}
                      </span>
                    </li>
                    <li className="flex-w flex-t p-b-7">
                      <span className="stext-102 c15 size-205 ">
                        Manufacturing Date
                      </span>
                      <span className="stext-102 cl6 size-206">
                        {p?.specific_date}
                      </span>
                    </li>
                    <li className="flex-w flex-t p-b-7">
                      <span className="stext-102 c15 size-205 ">
                        Expiry Date
                      </span>
                      <span className="stext-102 cl6 size-206">
                        {p?.specific_expiry_date}
                      </span>
                    </li>
                    <li className="flex-w flex-t p-b-7">
                      <span className="stext-102 c15 size-205 ">
                        Manufacturer
                      </span>
                      <span className="stext-102 cl6 size-206">
                        {p?.manufacturer}
                      </span>
                    </li>
                  </ul>
                </div>
                <table className="table table-bordered ps-table ps-table--specification">
                  <tbody></tbody>
                </table>
              </div>
            </center>
          </TabPane>
        </Tabs>
      </div>
      <div className={styles1.heading}>Reviews</div>
      <div className={styles.reviews_stars}>
        <div className={styles.stars}>
          <div className={styles.averageStars}>{avg}</div>
          <div className={styles.starsTotal}>
            <StarRatings
              rating={Number(avg)}
              starRatedColor="#fccc4d"
              // changeRating={this.changeRating}
              numberOfStars={5}
              svgIconPath="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
            />
          </div>
          <div className={styles.singleStar}>
            <div className={styles.singleStarItem}>
              <div className={styles.singleStarItemCount}>1 Star</div>
              <div className={styles.singleStarItemTable}>
                <Progress
                  percent={(
                    (one / (rev.length ? rev.length : 1)) *
                    100
                  ).toFixed(1)}
                  strokeColor="#fccc4d"
                />
              </div>
            </div>
            <div className={styles.singleStarItem}>
              <div className={styles.singleStarItemCount}>2 Stars</div>
              <div className={styles.singleStarItemTable}>
                <Progress
                  percent={(
                    (two / (rev.length ? rev.length : 1)) *
                    100
                  ).toFixed(1)}
                  strokeColor="#fccc4d"
                />
              </div>
            </div>
            <div className={styles.singleStarItem}>
              <div className={styles.singleStarItemCount}>3 Stars</div>
              <div className={styles.singleStarItemTable}>
                <Progress
                  percent={(
                    (three / (rev.length ? rev.length : 1)) *
                    100
                  ).toFixed(1)}
                  strokeColor="#fccc4d"
                />
              </div>
            </div>
            <div className={styles.singleStarItem}>
              <div className={styles.singleStarItemCount}>4 Stars</div>
              <div className={styles.singleStarItemTable}>
                <Progress
                  percent={(
                    (four / (rev.length ? rev.length : 1)) *
                    100
                  ).toFixed(1)}
                  strokeColor="#fccc4d"
                />
              </div>
            </div>
            <div className={styles.singleStarItem}>
              <div className={styles.singleStarItemCount}>5 Stars</div>
              <div className={styles.singleStarItemTable}>
                <Progress
                  percent={(
                    (five / (rev.length ? rev.length : 1)) *
                    100
                  ).toFixed(1)}
                  strokeColor="#fccc4d"
                />
              </div>
            </div>
          </div>
          <div className={styles.reviewBox}>Add Your Review</div>
          <div className={styles.rateUs}>
            <div className={styles.starRate}>
              <StarRatings
                rating={star}
                starRatedColor="#fccc4d"
                // changeRating={this.changeRating}
                numberOfStars={5}
                name="rating"
                svgIconPath="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
                starDimension="30px"
                starHoverColor="#0000ff"
                isSelectable={true}
                changeRating={(value) => setStar(value)}
              />
            </div>
            <div className={styles.text}>
              <input
                type="text"
                className={styles.textInput}
                onChange={(e) => setText(e.target.value)}
                placeholder="Add a Review"
              />
            </div>
            <div className={styles.btnReview}>
              <button className={styles.addToCart} onClick={handleReview}>
                POST
              </button>
            </div>
          </div>
        </div>

        <div className={styles.reviews}>
          <div className={styles.reviewBox}>Reviews</div>
          {rev &&
            rev.length > 0 &&
            rev.map((curr, index) => {
              return (
                <div className={styles.reviewsSection}>
                  <div className={styles.review}>
                    <span className={styles.reviewPerson}>{curr?.name}</span>
                    <span className={styles.date}>
                      {moment(curr?.createdAt).format("MMMM Do YYYY, h:mm a")}
                    </span>
                  </div>
                  <div className={styles.reviewStars}>
                    <StarRatings
                      rating={curr?.rating}
                      starRatedColor="#fccc4d"
                      // changeRating={this.changeRating}
                      numberOfStars={5}
                      name="rating"
                      svgIconPath="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"
                      starDimension="18px"
                      starSpacing="5px"
                    />
                  </div>
                  <div className={styles.reviewText}>{curr?.comment}</div>
                </div>
              );
            })}
          {rev && rev.length === 0 && (
            <p>No Review Yet! Be The First One to Review</p>
          )}
        </div>
      </div>
      <div className={styles1.heading}>Related Products</div>
      <div className={styles1.newArrivals1}>
        {other &&
          other.length > 0 &&
          other.map((curr, index) => {
            return (
              <div key={index} className={styles1.newArrivalItem1}>
                <div className={styles1.top1}>
                  <div>
                    <center>
                      <img
                        src={curr?.imagePath[0]}
                        alt="imr"
                        className={styles1.newArrivalItem__img1}
                        onClick={(e) => navigate(`/products/${curr._id}`)}
                      />
                    </center>
                  </div>
                  <div>
                    <FavoriteBorderOutlinedIcon
                      sx={{ fontSize: 24 }}
                      className={styles1.icon}
                      onClick={(e) => {
                        handleWishlist(curr?._id, curr?.title);
                      }}
                    />
                  </div>
                </div>
                <div className={styles1.text1}>
                  <div>
                    <div
                      className={styles1.newArrivalItem__meta__title}
                      style={{ fontSize: "100%", textAlign: "left" }}
                      onClick={(e) => navigate(`/products/${curr._id}`)}
                    >
                      {curr?.title}
                    </div>
                    <div>
                      <span
                        className={styles1.price}
                        style={{ fontSize: "110%" }}
                      >
                        ₹{curr?.price}
                      </span>
                      <span
                        className={styles1.mrpPrice}
                        style={{ fontSize: "100%" }}
                      >
                        <del>₹{curr?.mrpPrice}</del>
                      </span>
                    </div>
                  </div>
                  <div
                    className={styles1.newArrivalItem__meta__actions__buttons}
                  >
                    {/* <FavoriteBorderOutlinedIcon
                        sx={{ fontSize: 30 }}
                        className={styles1.icon}
                        onClick={(e) => {
                          handleWishlist(curr?._id, curr?.title);
                        }}
                      /> */}
                    <ShoppingCartOutlinedIcon
                      sx={{ fontSize: 30 }}
                      className={styles1.icon}
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
                      className={styles1.buyNowButton}
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
      <div className={styles1.newArrivals}>
        {other &&
          other.length > 0 &&
          other.map((curr, index) => {
            return (
              <div
                className={styles1.newArrivalItem}
                key={index}
                onClick={(e) => navigate(`/products/${curr._id}`)}
              >
                <div>
                  <center>
                    <img
                      src={curr?.imagePath[0]}
                      alt="imr"
                      className={styles1.newArrivalItem__img}
                    />
                  </center>
                </div>
                <div className={styles1.newArrivalItem__meta}>
                  <div className={styles1.newArrivalItem__meta__title}>
                    {curr?.title}
                  </div>
                  {/* <div className={styles1.newArrivalItem__meta__description}>
                    {`${curr?.short_description?.substring(0, 80)}...`}
                  </div> */}
                  <div className={styles1.newArrivalItem__meta__actions}>
                    <div
                      className={styles1.newArrivalItem__meta__actions__buttons}
                    >
                      <FavoriteBorderOutlinedIcon
                        sx={{ fontSize: 30 }}
                        className={styles1.icon}
                      />
                      <ShoppingCartOutlinedIcon
                        sx={{ fontSize: 30 }}
                        className={styles1.icon}
                        onClick={(e) => handleCart(curr?._id, curr?.title)}
                      />
                    </div>
                    <div
                      className={styles1.newArrivalItem__meta__actions__price}
                    >
                      <p className={styles1.price}>₹{curr?.price}</p>
                      <p className={styles1.mrpPrice}>
                        <del>₹{curr?.mrpPrice}</del>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>{" "}
      {/* {JSON.stringify(p)} */}
    </React.Fragment>
  );
};

export default SingleProduct;
