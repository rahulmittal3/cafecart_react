import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./NewArrival.module.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
//importing methods...
import { newArrival } from "../../Axios/Products.js";

const YouMayLike = () => {
  useEffect(() => {
    document.body.scrollTop = 0;
  }, []);
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
                          <p className="favourite-icon">
                            <ShoppingCartIcon />
                          </p>
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
                              <span className="product_name">{curr.title}</span>
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
    </section>
  );
};

export default YouMayLike;
