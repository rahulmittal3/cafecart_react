import React from "react";
import styles from "./SingleProduct.module.css";
import { useParams, Link } from "react-router-dom";
import { singleProduct } from "../../Axios/Products.js";
import { Carousel } from "react-responsive-carousel";
import ModalImage from "react-modal-image";

import { Tabs } from "antd";

const { TabPane } = Tabs;
const SingleProduct = () => {
  const [value, setValue] = React.useState("one");
  const [p, setP] = React.useState(null);
  const params = useParams();
  const getProduct = () => {
    singleProduct(params.id)
      .then((res) => setP(res.data))
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getProduct();
  }, [params.id]);

  const create = (hello) => {
    return { __html: hello };
  };
  return (
    <React.Fragment>
      <section className="bg0 ">
        <div>
          <div
            className="categories-thumbs category-stories"
            style={{ backgroundColor: "#fff", position: "relative" }}
          >
            <div className="container">
              <div className="set-inline">
                <div className="category-strip">
                  <div className="bredcrumb">
                    <div
                      className="sidebar-links  st-search-bar"
                      style={{ marginTop: 20 }}
                    >
                      <form>
                        <input
                          type="text"
                          name="search"
                          placeholder="Search for items, brands & inspirations"
                          autoCapitalize="off"
                          autoComplete="off"
                          autoCorrect="off"
                        />
                      </form>
                    </div>
                    <ul>
                      <li>
                        <Link to="/">Home</Link>{" "}
                        <span className="b-arrow">
                          <svg
                            width="7"
                            height="12"
                            viewBox="0 0 7 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fill-rule="evenodd"
                              clip-rule="evenodd"
                              d="M0 2.107L4.351 6.4 0 10.693 1.324 12 7 6.4 1.324.8 0 2.107z"
                              fill="#212121"
                            ></path>
                          </svg>
                        </span>
                      </li>
                      <li className="active ">{p?.title}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Part TWO From Here */}
      <div className="ps-page--product">
        <div className="ps-container">
          <div className="ps-page__container">
            <div className="ps-page__left">
              <div className="ps-product--detail ps-product--fullwidth">
                <div className="ps-product__header">
                  {/* <div className="ps-product__thumbnail" data-vertical="true">
                    <figure>
                      <div className="ps-wrapper">
                        <div className="ps-product__gallery" data-arrow="true">
                          {p &&
                            p.imagePath &&
                            p.imagePath.length > 0 &&
                            p.imagePath.map((curr, index) => {
                              return (
                                <div
                                  className="item"
                                  style={{
                                    width: "100%",
                                    height: 500,
                                    maxWidth: 480,
                                  }}
                                  key={index}
                                >
                                  <a
                                    href={curr}
                                    id={`ContentPlaceHolder1_addImganchor${index}`}
                                  >
                                    <img
                                      src={curr}
                                      style={{
                                        margin: "auto",
                                        height: "50vh",
                                        objectFit: "fill",
                                      }}
                                      id={`ContentPlaceHolder1_addImganchor${index}`}
                                      alt="Images"
                                    />
                                  </a>
                                </div>
                              );
                            })}
                        </div>
                      </div>
                    </figure>
                    <div
                      className="ps-product__variants"
                      data-item={4}
                      data-md={4}
                      data-sm={4}
                      data-arrow="false"
                    >
                      {p &&
                        p.imagePath &&
                        p.imagePath.length > 0 &&
                        p.imagePath.map((curr, index) => {
                          return (
                            <div className="item">
                              <img
                                src={curr}
                                id={`ContentPlaceHolder1_baseImganchor${index}`}
                                style={{ transform: "scale3d(1,1,1)" }}
                                alt="here"
                              />
                            </div>
                          );
                        })}
                    </div>
                  </div> */}
                  <Carousel
                    showArrows={true}
                    autoPlay={true}
                    interval={2000}
                    infiniteLoop={true}
                  >
                    {p &&
                      p.imagePath &&
                      p.imagePath.length > 0 &&
                      p.imagePath.map((curr, index) => {
                        return (
                          <div key={index}>
                            <img src={curr} alt="1" height="100%" />
                          </div>
                        );
                      })}
                  </Carousel>

                  <div className="ps-product__info">
                    <h1
                      id="ContentPlaceHolder1_productName"
                      style={{ fontSize: 22, fontWeight: 600 }}
                    >
                      {p?.title} &emsp;
                      <i
                        className="fa fa-heart-o toggle"
                        //onclick="addwishlist(`<%=product._id%>`)"
                      ></i>
                    </h1>
                    <div className="row" style={{ marginLeft: 4 }}>
                      <h4
                        id="ContentPlaceHolder1_pro_mainPrice"
                        className="ps-product__price"
                      >
                        {" "}
                        ₹ &nbsp;{p?.price}
                      </h4>
                      &emsp;
                      <del
                        id="ContentPlaceHolder1_delprice"
                        style={{ color: "grey", textAlign: "center" }}
                      >
                        <h3
                          id="ContentPlaceHolder1_pro_delPrice"
                          className="ps-product__price"
                          style={{ color: "grey", fontSize: 16, marginTop: 5 }}
                        >
                          ₹{p?.mrpPrice}
                        </h3>
                      </del>
                      {p && p.discount && (
                        <h2
                          id="ContentPlaceHolder1_pro_mainPrice"
                          className="ps-product__price"
                          style={{
                            color: "#f30",
                            fontSize: 14,
                            marginTop: 7,
                            marginLeft: 5,
                          }}
                        >
                          {p?.discount} OFF
                        </h2>
                      )}
                    </div>
                    <div className="ps-product__desc">
                      {p && p.available && (
                        <p
                          style={{
                            marginTop: 5,
                            color: "green",
                            fontSize: 22,
                            fontWeight: 600,
                          }}
                        >
                          In stock
                        </p>
                      )}

                      {p && !p.available && (
                        <p
                          style={{
                            marginTop: 5,
                            color: "red",
                            fontSize: 22,
                            fontWeight: 600,
                          }}
                        >
                          Out of stock
                        </p>
                      )}
                    </div>
                    <div id="ContentPlaceHolder1_shortDesc">
                      <ul>
                        <li>{p?.short_description}</li>
                      </ul>
                    </div>
                    <div className={styles.manavesh_1}>
                      {/* <figure style={{ marginBottom: 5 }}>
                        <figcaption>Quantity</figcaption>
                        <p className="form-group--number">
                          <button
                            type="button"
                            className="up"
                            id="up"
                            //onclick="increment();"
                          >
                            <i
                              className="fa fa-plus mainbtn"
                              style={{ border: "none" }}
                            />
                          </button>
                          <button
                            type="button"
                            className="down"
                            id="down"
                            //onclick="decrement();"
                          >
                            <i
                              className="fa fa-minus mainbtn"
                              style={{ border: "none" }}
                            />
                          </button>
                          <input
                            name="qty"
                            type="text"
                            id="numitem"
                            class="form-control mainbtn"
                            value="1"
                            placeholder="1"
                          />
                        </p>
                      </figure> */}
                      <figure style={{ marginBottom: 5 }}>
                        <center>
                          <figcaption>Quantity</figcaption>
                        </center>
                        <div className={styles.outerDiv}>
                          <button className={styles.btnPlus}>+</button>
                          <input disabled value={1} />
                          <button className={styles.btnMinus}>-</button>
                        </div>

                        {/* <p className="form-group--number">
                          <button
                            type="button"
                            className="up"
                            id="up"
                            onclick="increment();"
                          >
                            <i
                              className="fa fa-plus mainbtn"
                              style={{ border: "none" }}
                            />
                          </button>
                          <button
                            type="button"
                            className="down"
                            id="down"
                            onclick="decrement();"
                          >
                            <i
                              className="fa fa-minus mainbtn"
                              style={{ border: "none" }}
                            />
                          </button>
                          <input
                            name="qty"
                            type="text"
                            id="numitem"
                            className="form-control mainbtn"
                            defaultValue={1}
                            placeholder={1}
                          />
                        </p> */}
                      </figure>
                      <center>
                        <p
                          id="ContentPlaceHolder1_adCart"
                          className="ps-btn "
                          //onclick="submitmyform()"
                          style={{
                            backgroundColor: "rgb(59, 17, 17)",
                            color: "white",
                            border: "solid",
                            borderWidth: "thin",
                            marginBottom: 5,
                            marginTop: "5px",
                          }}
                        >
                          Add to cart
                        </p>

                        <p
                          id="ContentPlaceHolder1_butNow"
                          className="ps-btn"
                          //onclick="addwishlist(`<%=product._id%>`)"
                          style={{
                            backgroundColor: "#f30",
                            color: "white",
                            border: "solid",
                            borderWidth: "thin",
                            marginBottom: 5,
                            marginTop: "5px",
                          }}
                        >
                          Wishlist It!
                        </p>
                      </center>
                    </div>
                    <hr />
                    <div>
                      <div id="ContentPlaceHolder1_updatepanelpincode"></div>
                      <table
                        className="table ps-table--product-groupped"
                        style={{ marginTop: "10px" }}
                      >
                        <tbody>
                          <tr>
                            <td style={{ width: "60%" }}>
                              <input
                                name="ctl00$ContentPlaceHolder1$pincode"
                                type="text"
                                id="zip"
                                className="form-control mainbtn"
                                placeholder="Enter Pincode For Delivery"
                              />
                            </td>
                            <td style={{ width: "40%" }}>
                              <input
                                type="submit"
                                defaultValue="Check"
                                id="checkPin"
                                className="ps-btn ps-btn--gray mainbtn"
                                style={{
                                  backgroundColor: "rgb(177 174 168)",
                                  textAlign: "center",
                                }}
                              />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <ul className="details-bullet">
                                <li>
                                  <p id="statusResult1">
                                    Enter your Pincode to check Delivery Options
                                    available in your Area.
                                  </p>
                                  <p id="statusResult2" />
                                </li>
                              </ul>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="ps-product__sharing" />
                    </div>
                    {/* <div className="ps-product__content ps-tab-root">
                      <ul className="ps-tab-list">
                        <li>
                          <a href="#tab-1">Description</a>
                        </li>
                        <li>
                          <a href="#tab-2">Specification</a>
                        </li>
                        <li>
                          <a href="#tab-4">
                            Reviews (
                            <span id="ContentPlaceHolder1_reviewCount">0</span>)
                          </a>
                        </li>
                      </ul>
                      <div className="ps-tabs">
                        <div className="ps-tab" id="tab-1">
                          <div
                            id="ContentPlaceHolder1_ProDescription"
                            className="ps-document"
                            dangerouslySetInnerHTML={create(p?.description)}
                          ></div>
                        </div>
                        <div className="ps-tab" id="tab-2">
                          <div className="table-responsive">
                            <table className="table table-bordered ps-table ps-table--specification">
                              <tbody>
                                <div className=" m-lr-auto">
                                  <ul className="p-lr-5 p-lr-5-sm">
                                    <li className="flex-w flex-t p-b-7">
                                      <span className="stext-102 c15 size-205 ">
                                        Weight
                                      </span>
                                      <span className="stext-102 cl6 size-206">
                                        {p?.specific_quantity}
                                      </span>
                                    </li>
                                  </ul>
                                </div>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div> */}
                    <Tabs defaultActiveKey="1">
                      <TabPane tab="Description" key="1">
                        <div
                          dangerouslySetInnerHTML={create(p?.description)}
                        ></div>
                      </TabPane>
                      <TabPane tab="Specifications" key="2">
                        <div className="table-responsive">
                          <div className=" m-lr-auto">
                            <ul className="p-lr-5 p-lr-5-sm">
                              <li className="flex-w flex-t p-b-7">
                                <span className="stext-102 c15 size-205 ">
                                  Weight
                                </span>
                                <span className="stext-102 cl6 size-206">
                                  {p?.specific_quantity}
                                </span>
                              </li>
                              <li className="flex-w flex-t p-b-7">
                                <span className="stext-102 c15 size-205 ">
                                  Materials
                                </span>
                                <span className="stext-102 cl6 size-206">
                                  {p?.specific_ingredients}
                                </span>
                              </li>
                              <li className="flex-w flex-t p-b-7">
                                <span className="stext-102 c15 size-205 ">
                                  Type
                                </span>
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
                      </TabPane>
                      <TabPane tab="Reviews" key="3">
                        <div className="row">
                          <div className="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12 ">
                            <div className="ps-block--average-rating">
                              <div className="ps-block__header">
                                <h3 id="ContentPlaceHolder1_avgstar">0.0</h3>
                                <select
                                  className="ps-rating"
                                  data-read-only="true"
                                >
                                  <option
                                    id="ContentPlaceHolder1_ops1"
                                    value={2}
                                  >
                                    1
                                  </option>
                                  <option
                                    id="ContentPlaceHolder1_ops2"
                                    value={2}
                                  >
                                    2
                                  </option>
                                  <option
                                    id="ContentPlaceHolder1_ops3"
                                    value={2}
                                  >
                                    3
                                  </option>
                                  <option
                                    id="ContentPlaceHolder1_ops4"
                                    value={2}
                                  >
                                    4
                                  </option>
                                  <option
                                    id="ContentPlaceHolder1_ops5"
                                    value={2}
                                  >
                                    5
                                  </option>
                                </select>
                                <span id="ContentPlaceHolder1_totalreview">
                                  0 Review
                                </span>
                              </div>
                              <div className="ps-block__star">
                                <span>5 Star</span>
                                <div
                                  id="ContentPlaceHolder1_star5"
                                  className="ps-progress"
                                  data-value={0}
                                >
                                  <span />
                                </div>
                                <span id="ContentPlaceHolder1_star51">0</span>
                              </div>
                              <div className="ps-block__star">
                                <span>4 Star</span>
                                <div
                                  id="ContentPlaceHolder1_star4"
                                  className="ps-progress"
                                  data-value={0}
                                >
                                  <span />
                                </div>
                                <span id="ContentPlaceHolder1_star41">0</span>
                              </div>
                              <div className="ps-block__star">
                                <span>3 Star</span>
                                <div
                                  id="ContentPlaceHolder1_star3"
                                  className="ps-progress"
                                  data-value={0}
                                >
                                  <span />
                                </div>
                                <span id="ContentPlaceHolder1_star31">0</span>
                              </div>
                              <div className="ps-block__star">
                                <span>2 Star</span>
                                <div
                                  id="ContentPlaceHolder1_star2"
                                  className="ps-progress"
                                  data-value={0}
                                >
                                  <span />
                                </div>
                                <span id="ContentPlaceHolder1_star21">0</span>
                              </div>
                              <div className="ps-block__star">
                                <span>1 Star</span>
                                <div
                                  id="ContentPlaceHolder1_star1"
                                  className="ps-progress"
                                  data-value={0}
                                >
                                  <span />
                                </div>
                                <span id="ContentPlaceHolder1_star11">0</span>
                              </div>
                            </div>
                          </div>
                          <div
                            id="ContentPlaceHolder1_ratingDiv"
                            className="col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12"
                            style={{}}
                          >
                            <div
                              id="ContentPlaceHolder1_submitDiv"
                              className="ps-form--review"
                            >
                              <div
                                id="flash-msg"
                                className="alert alert-danger dis-none"
                              />
                              <form className="w-full" id="cmform">
                                <h5 className="mtext-108 cl2 p-b-7">
                                  Add a review
                                </h5>
                                <p className="stext-102 cl6">
                                  Your email address will not be published.
                                  Required fields are marked *
                                </p>
                                <div
                                  className="flex-w p-t-5"
                                  style={{
                                    flexDirection: "column",
                                    justifyContent: "left",
                                  }}
                                >
                                  <span
                                    className="stext-102 cl3 m-r-16"
                                    style={{ textAlign: "left" }}
                                  >
                                    Your Rating
                                    <span
                                      style={{ color: "red", marginTop: 10 }}
                                    >
                                      *
                                    </span>
                                  </span>
                                  <span
                                    className="wrap-rating fs-18 cl11 pointer"
                                    style={{ textAlign: "left" }}
                                  >
                                    <i className="item-rating pointer zmdi zmdi-star-outline" />
                                    <i className="item-rating pointer zmdi zmdi-star-outline" />
                                    <i className="item-rating pointer zmdi zmdi-star-outline" />
                                    <i className="item-rating pointer zmdi zmdi-star-outline" />
                                    <i className="item-rating pointer zmdi zmdi-star-outline" />
                                    <input
                                      className="dis-none"
                                      type="number"
                                      id="rating"
                                      name="rating"
                                    />
                                  </span>
                                </div>
                                <div className="row ">
                                  <div className="col-12 p-b-5 p-l-0">
                                    <label
                                      className="stext-102 cl3"
                                      htmlFor="review"
                                      style={{ textAlign: "left" }}
                                    >
                                      Your review{" "}
                                      <span style={{ color: "red" }}>*</span>
                                    </label>
                                    <textarea
                                      className="size-110 bor8 stext-102 cl2 p-lr-20 p-tb-10"
                                      id="review"
                                      name="review"
                                      defaultValue={""}
                                    />
                                  </div>
                                </div>
                                <button className="flex-c-m stext-101 cl0 size-112 bg7 bor11 hov-btn3 p-lr-15 trans-04 m-b-10">
                                  Submit
                                </button>
                              </form>
                            </div>
                          </div>
                        </div>
                      </TabPane>
                    </Tabs>
                  </div>
                </div>
              </div>
            </div>

            <div className="ps-page__right">
              <aside className="widget widget_product widget_features">
                <p>
                  <i className="icon-network" />
                  Shipping all over India
                </p>
                <p>
                  <i className="icon-3d-rotate" />
                  Hassle free return
                </p>
                <p>
                  <i className="icon-credit-card" />
                  Pay online or Cash On Delivery (COD)
                </p>
                <p>
                  <i className="icon-receipt" />
                  Premium products, Premium Service
                </p>
              </aside>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default SingleProduct;
