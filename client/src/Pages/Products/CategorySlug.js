import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { categorySlug } from "../../Axios/Products.js";
import styles from "./CategorySlug.module.css";
import CircleInfinite from "../../Components/Utilities/CircleInfinite.js";
import { useDispatch } from "react-redux";
import { createName } from "../../Components/Utilities/createNameBreadcrumbs.js";
const CategorySlug = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const [ans, setAns] = useState(null);
  const getData = () => {
    setLoading(true);
    categorySlug(params.slug)
      .then((res) => {
        setAns(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };
  useEffect(() => {
    getData();
  }, [params.slug]);
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

  return (
    <section className="bg0 p-b-0">
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
                        style={{}}
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
                      <Link to="/">Home</Link>
                      <span class="b-arrow">
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
                    <li>
                      {createName(params.slug)}
                      <span class="b-arrow">
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
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {loading === true ? (
        <CircleInfinite loading={loading} />
      ) : (
        <div className="container p-t-30 p-b-30 m-t-50">
          <div id="grid">
            {(!ans || ans.length === 0) && (
              <div
                style={{
                  height: "73vh !important",
                  position: "relative",
                  width: "92vw",
                }}
                className="p-t-220"
              >
                <h1
                  style={{
                    color: "#333",
                    fontSize: 20,
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                  }}
                >
                  No Data found !
                </h1>
              </div>
            )}
            {ans &&
              ans.map((curr, index) => {
                return (
                  <div
                    className={`product ${styles.product__manavesh1}`}
                    style={{ zIndex: 1, margin: "0 auto", marginBottom: 20 }}
                    key={index}
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
                          <a role="button" className="favourite-icon" href="/">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 576 512"
                            >
                              <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                            </svg>
                          </a>
                        </div>

                        <Link
                          to={`/products/${curr._id}`}
                          style={{ color: "#fff" }}
                        >
                          <div
                            style={{ width: 200, height: 200, marginTop: 5 }}
                            className="image_wrapper"
                          >
                            <img
                              style={{
                                height: "100%",
                                objectFit: "cover",
                                margin: "0 auto",
                              }}
                              src={curr.imagePath[0]}
                              alt="hello"
                            />
                          </div>
                          <div
                            className={styles.add_to_cart}
                            style={{ opacity: 1 }}
                          >
                            <i
                              className="fa fa-shopping-cart"
                              style={{ opacity: 1 }}
                            />
                          </div>
                          <div className={styles.view_gallery}>
                            <i className="fa fa-eye" style={{ opacity: 1 }} />
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
                              <span class="product_price">₹{curr.price}</span>
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
                );
              })}
          </div>
        </div>
      )}
    </section>
  );
};

export default CategorySlug;
