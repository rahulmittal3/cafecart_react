import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NewArrival.module.css";

//importing methods...
import { newArrival } from "../../Axios/Products.js";

const NewArrival = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const function1 = () => {
    newArrival()
      .then((res) => setNewArrivals(res.data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    function1();
  }, []);
  return (
    <section className="sec-relate-product bg0  ">
      <div className="container">
        <div
          className="block-header flex"
          style={{ paddingTop: "0px !important" }}
        >
          <div
            className="mr-auto"
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "left",
            }}
          >
            <h2 className="block-header-heading">New Arrivals </h2>
            <p className="block-header-info">Most loved items on our Shop</p>
          </div>
        </div>

        <div className="wrap-slick2">
          <div className="slick2">
            {newArrivals.length > 0 &&
              newArrivals.map((curr, el) => {
                return (
                  <div className="item-slick2  p-t-15 p-b-15" key={el}>
                    <div
                      className="product"
                      style={{ zIndex: 1, margin: "0 auto" }}
                    >
                      <div
                        className="make3D"
                        style={{ transition: "all 100ms ease-out 0s" }}
                      >
                        <div
                          className="product-front"
                          style={{ display: "block" }}
                        >
                          <div>
                            <a
                              role="button"
                              className="favourite-icon"
                              href="/"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 29 24"
                              >
                                <path
                                  className={`love${curr._id}`}
                                  fill="#fff"
                                  stroke="#000"
                                  strokeWidth="1.826"
                                  d="M14.617 21.99l-.058-.029a34.366 34.366 0 0 1-1.923-1.036 36.172 36.172 0 0 1-4.452-3.05l-.002-.001C3.83 14.386 1.787 10.747 1.854 7.37v-.035L1.852 7.3c-.097-1.745.552-3.357 1.744-4.497v-.001C4.72 1.725 6.32 1.117 8.06 1.117c1.283 0 2.498.498 3.546 1.167a12.346 12.346 0 0 1 2.342 1.98l.67.72.668-.72c.477-.514 1.298-1.314 2.342-1.98 1.049-.669 2.264-1.167 3.547-1.167 1.776 0 3.34.607 4.463 1.686h.001c1.182 1.133 1.809 2.711 1.742 4.55v.052c.067 3.341-1.976 6.98-6.328 10.469l-.001.001a36.533 36.533 0 0 1-6.378 4.086l-.057.028z"
                                />
                              </svg>
                            </a>
                          </div>
                          <Link
                            to={`/products/${curr._id}`}
                            style={{ color: "#fff" }}
                          >
                            <div
                              style={{
                                width: 200,
                                height: 200,
                                marginTop: 5,
                              }}
                              className={styles.image_wrapper}
                            >
                              <img
                                style={{
                                  height: "100%",
                                  objectFit: "cover",
                                  margin: "0 auto",
                                }}
                                src={curr.imagePath[0]}
                                alt="img"
                              />
                            </div>
                          </Link>
                          <div className="add_to_cart">
                            <i className="fa fa-shopping-cart" />
                          </div>
                          <Link
                            to={`/products/${curr._id}`}
                            style={{ color: "#fff" }}
                          >
                            <div className="view_gallery">
                              <i className="fa fa-eye" />
                            </div>
                          </Link>
                          <div className="stats">
                            <div className="stats-container">
                              <div
                                style={{
                                  display: "flex",
                                  flexDirection: "row",
                                  justifyContent: "flex-start",
                                }}
                              >
                                {" "}
                                <span className="product_price">
                                  ₹ {curr.price}
                                </span>
                                <span
                                  className="product_price mrp"
                                  style={{
                                    color: "#666",
                                    fontSize: 12,
                                    marginTop: 2,
                                    textAlign: "center",
                                    marginLeft: 10,
                                  }}
                                >
                                  <del>₹{curr.mrpPrice}</del>
                                </span>
                                {curr.discount && (
                                  <span
                                    className="product_price "
                                    style={{
                                      color: "#f30",
                                      marginLeft: 10,
                                      fontSize: 12,
                                      marginTop: 2,
                                      textAlign: "center",
                                    }}
                                  >
                                    {curr.discount}
                                  </span>
                                )}
                              </div>
                              <div className="elipse">
                                <span className="product_name">
                                  {curr.title}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewArrival;
