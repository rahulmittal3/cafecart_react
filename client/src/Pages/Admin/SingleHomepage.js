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
import { getHomepage, updateBlog } from "../../Axios/Admin.js";
import { toast } from "react-toastify";
import DoneOutlineTwoToneIcon from "@mui/icons-material/DoneOutlineTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import moment from "moment";
const SingleHomepage = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = React.useState({});
  const [content, setContent] = React.useState("");
  let token = "randomString";
  if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
    token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
  }
  const getData = () => {
    getHomepage(token, params.id)
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
            <div className={styles.couponLeft}>Homepage</div>
            <div>
              <button
                style={{
                  backgroundColor: "purple",
                  color: "white",
                  padding: "5px 10px",
                  borderRadis: "5px",
                  fontSize: "20px",
                }}
                onClick={(e) => navigate(`/admin/home-page/${params.id}/edit`)}
              >
                Edit
              </button>
            </div>
          </div>
          <div className={style.p1}>
            <div className={style.q}>
              <div className={style.ask}>Product Id</div>
              <div className={style.answer}>{data?._id}</div>
            </div>

            <div className={style.q}>
              <div className={style.ask}>Banner Images</div>
              <Carousel infiniteLoop={true} autoPlay={true}>
                {data?.bannerImages &&
                  data.bannerImages.map((cur, index) => {
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
              <div className={style.ask}>New Arrivals</div>
              {data?.newArrivals?.length <= 0 && (
                <div className={style.answer}>Not Available</div>
              )}
              {data?.newArrivals?.length > 0 && (
                <div className={style.answer}>
                  <ol type="A">
                    {data.newArrivals.map((curr, index) => {
                      return <li key={index}>{curr}</li>;
                    })}
                  </ol>
                </div>
              )}
            </div>
            <div className={style.q}>
              <div className={style.ask}>Best In Cafecart</div>
              {data?.bestInBruh?.length <= 0 && (
                <div className={style.answer}>Not Available</div>
              )}
              {data?.bestInBruh?.length > 0 && (
                <div className={style.answer}>
                  <ol type="A">
                    {data.bestInBruh.map((curr, index) => {
                      return <li key={index}>{curr}</li>;
                    })}
                  </ol>
                </div>
              )}
            </div>
            <div className={style.q}>
              <div className={style.ask}>Trending</div>
              {data?.trending?.length <= 0 && (
                <div className={style.answer}>Not Available</div>
              )}
              {data?.trending?.length > 0 && (
                <div className={style.answer}>
                  <ol type="A">
                    {data.trending.map((curr, index) => {
                      return <li key={index}>{curr}</li>;
                    })}
                  </ol>
                </div>
              )}
            </div>
            <div className={style.q}>
              <div className={style.ask}>You May Like</div>
              {data?.youMayLike?.length <= 0 && (
                <div className={style.answer}>Not Available</div>
              )}
              {data?.youMayLike?.length > 0 && (
                <div className={style.answer}>
                  <ol type="A">
                    {data.youMayLike.map((curr, index) => {
                      return <li key={index}>{curr}</li>;
                    })}
                  </ol>
                </div>
              )}
            </div>
            <div className={style.q}>
              <div className={style.ask}>Brands</div>
              {data?.brands?.length <= 0 && (
                <div className={style.answer}>Not Available</div>
              )}
              {data?.brands?.length > 0 && (
                <div className={style.answer}>
                  <ol type="A">
                    {data.brands.map((curr, index) => {
                      return <li key={index}>{curr}</li>;
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

export default SingleHomepage;
