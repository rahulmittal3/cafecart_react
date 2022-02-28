import React from "react";
import styles from "../../AdminStyles/AdminList.module.css";
import style from "../../AdminStyles/AdminProduct.module.css";
import AdminList from "../../Components/Admin/AdminList.js";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Table, Badge, Button } from "antd";
import { useNavigate, Link, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getProduct, updateBlog } from "../../Axios/Admin.js";
import { toast } from "react-toastify";
import DoneOutlineTwoToneIcon from "@mui/icons-material/DoneOutlineTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import moment from "moment";
const SingleProduct = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = React.useState({});
  const [content, setContent] = React.useState("");
  let token = "randomString";
  if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
    token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
  }
  const getData = () => {
    getProduct(token, params.id)
      .then((res) => {
        setData(res.data);
        setContent(res.data.description);
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getData();
  }, []);
  function createMarkup() {
    return { __html: data?.description };
  }
  return (
    <div className={styles.overall}>
      <div className={styles.left}>
        <AdminList />
      </div>
      <div className={styles.right}>
        <div className={styles.rightInner}>
          <div className={styles.couponHeading}>
            <div className={styles.couponLeft}>Product</div>
          </div>
          <div className={style.p1}>
            <div className={style.q}>
              <div className={style.ask}>Product Id</div>
              <div className={style.answer}>{data?._id}</div>
            </div>
            <div className={style.q}>
              <div className={style.ask}>Title</div>
              <div className={style.answer}>{data?.title}</div>
            </div>
            <div className={style.q}>
              <div className={style.ask}>Availiability </div>
              {data?.available === true && (
                <div
                  className={style.answer}
                  style={{ color: "green", fontWeight: "bold" }}
                >
                  <DoneOutlineTwoToneIcon sx={{ fontSize: 30 }} />
                </div>
              )}
              {data?.available === !true && (
                <div
                  className={style.answer}
                  style={{ color: "red", fontWeight: "bold" }}
                >
                  <CancelTwoToneIcon sx={{ fontSize: 30 }} />
                </div>
              )}
            </div>
            <div className={style.q}>
              <div className={style.ask}>Product Code</div>
              <div className={style.answer}>{data?.productCode}</div>
            </div>
            <div className={style.q}>
              <div className={style.ask}>Category Details</div>
              {data?.category?.length <= 0 && (
                <div className={style.answer}>Not Available</div>
              )}
              {data?.category?.length > 0 &&
                data.category.map((curr, index) => {
                  return (
                    <div key={index}>
                      <li>MainCategory: {curr.MainCategory}</li>

                      {curr.Subcategories.map((i, index) => {
                        return (
                          <div key={index} style={{ marginLeft: "20px" }}>
                            Parent SubCategory : {i.Parent_Subcategory}
                            {i.Child_Subcategory.map((j, index) => {
                              return (
                                <div key={index} style={{ marginLeft: "40px" }}>
                                  Child SubCategory : {j}
                                </div>
                              );
                            })}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
            </div>
            <div className={style.q}>
              <div className={style.ask}>Short Description</div>
              <div className={style.answer}>{data?.short_description}</div>
            </div>
            <div className={style.q}>
              <div className={style.ask}>Specific Quantity</div>
              <div className={style.answer}>{data?.specific_quantity}</div>
            </div>
            <div className={style.q}>
              <div className={style.ask}>Selling Price</div>
              <div className={style.answer}>
                ₹{data?.price?.toLocaleString()}
              </div>
            </div>
            <div className={style.q}>
              <div className={style.ask}>MRP</div>
              <div className={style.answer}>
                ₹{data?.mrpPrice?.toLocaleString()}
              </div>
            </div>
            <div className={style.q}>
              <div className={style.ask}>Manufacturer</div>
              <div className={style.answer}>
                {data?.manufacturer ? data.manufacturer : "Not Available"}
              </div>
            </div>
            <div className={style.q}>
              <div className={style.ask}>Specific For</div>
              <div className={style.answer}>
                {data?.specific_type ? data.specific_type : "Not Available"}
              </div>
            </div>
            <div className={style.q}>
              <div className={style.ask}>Images</div>
              <Carousel infiniteLoop={true} autoPlay={true}>
                {data?.imagePath &&
                  data.imagePath.map((cur, index) => {
                    return (
                      <div key={index}>
                        <img
                          src={cur}
                          alt="1"
                          style={{ height: "auto", width: "30vw" }}
                        />
                      </div>
                    );
                  })}
              </Carousel>
            </div>
            <div className={style.q}>
              <div className={style.ask}>Description</div>
              <div
                className={style.answer}
                dangerouslySetInnerHTML={createMarkup()}
              ></div>
            </div>
            <div className={style.q}>
              <div className={style.ask}>Description Use First</div>
              <div className={style.answer}>
                {data?.description_use_first
                  ? data.description_use_first
                  : "Not Available"}
              </div>
            </div>
            <div className={style.q}>
              <div className={style.ask}>Description Use Second</div>
              <div className={style.answer}>
                {data?.description_use_second
                  ? data.description_use_second
                  : "Not Available"}
              </div>
            </div>
            <div className={style.q}>
              <div className={style.ask}>Description Use Third</div>
              <div className={style.answer}>
                {data?.description_use_third
                  ? data.description_use_third
                  : "Not Available"}
              </div>
            </div>
            <div className={style.q}>
              <div className={style.ask}>Expiry Date</div>
              <div className={style.answer}>
                {moment(data.specific_expiry_date).format("Do MMMM YYYY")}
              </div>
            </div>
            <div className={style.q}>
              <div className={style.ask}>Recommended Products</div>
              {data?.recommendedProducts?.length <= 0 && (
                <div className={style.answer}>Not Available</div>
              )}
              {data?.recommendedProducts?.length > 0 && (
                <div className={style.answer}>
                  <ol type="A">
                    {data.recommendedProducts.map((curr, index) => {
                      return <li key={index}>{curr.code}</li>;
                    })}
                  </ol>
                </div>
              )}
            </div>
            <div className={style.q}>
              <div className={style.ask}>Other Products</div>
              {data?.otherProducts?.length <= 0 && (
                <div className={style.answer}>Not Available</div>
              )}
              {data?.otherProducts?.length > 0 && (
                <div className={style.answer}>
                  <ol type="A">
                    {data.otherProducts.map((curr, index) => {
                      return <li key={index}>{curr.code}</li>;
                    })}
                  </ol>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
