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
import { getShipping, updateBlog, deleteShipping } from "../../Axios/Admin.js";
import { toast } from "react-toastify";
import DoneOutlineTwoToneIcon from "@mui/icons-material/DoneOutlineTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import moment from "moment";

const SingleShippingCharge = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = React.useState({});
  const [content, setContent] = React.useState("");
  let token = "randomString";
  if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
    token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
  }
  const getData = () => {
    getShipping(token, params.id)
      .then((res) => {
        setData(res.data);
        setContent(res.data.description);
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getData();
  }, []);
  const deleteHandler = () => {
    deleteShipping(token, params.id)
      .then((res) => {
        toast.success("Shipping Charge Removed");
        navigate("/admin/shipping-charges");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };
  return (
    <div className={styles.overall}>
      <div className={styles.left}>
        <AdminList />
      </div>
      <div className={styles.right}>
        <div className={styles.rightInner}>
          <div className={styles.couponHeading}>
            <div className={styles.couponLeft}>Shipping</div>
          </div>
          <div className={style.p1}>
            <div className={style.q}>
              <div className={style.ask}> Id</div>
              <div className={style.answer}>{data?._id}</div>
            </div>
            <div className={style.q}>
              <div className={style.ask}>Cart Size</div>
              <div className={style.answer}>{data?.cartsize}</div>
            </div>
            <div className={style.q}>
              <div className={style.ask}>Shipping Charge </div>
              {data?.shipping_charge}
            </div>
          </div>
          <div>
            <center>
              <button
                style={{
                  backgroundColor: "blue",
                  color: "white",
                  margin: "30px",
                  borderRadius: "5px",
                  padding: "10px",
                  fontSize: "16px",
                }}
                onClick={(e) =>
                  navigate(`/admin/shipping-charge/${params.id}/edit`)
                }
              >
                Edit
              </button>
              <button
                style={{
                  backgroundColor: "red",
                  color: "white",
                  margin: "30px",
                  borderRadius: "5px",
                  padding: "10px",
                  fontSize: "16px",
                }}
                onClick={deleteHandler}
              >
                Delete
              </button>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleShippingCharge;
