import React from "react";
import styles from "../../AdminStyles/AdminList.module.css";
import AdminList from "../../Components/Admin/AdminList.js";
import { Table, Badge, Button } from "antd";
import { useNavigate, Link, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getShipping, updateShipping } from "../../Axios/Admin.js";
import { toast } from "react-toastify";
const SingleBlog = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = React.useState({});
  let token = "randomString";
  if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
    token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
  }
  const getData = () => {
    getShipping(token, params.id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getData();
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    updateShipping(token, data)
      .then((res) => {
        toast.success("Shipping Charge has been Modified Successfully");
        navigate("/admin/shipping-charges");
      })
      .catch((err) => {
        toast.error("Unexpected Error occured!");
        navigate("/admin/shipping-charges");
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
            <div className={styles.couponLeft}>Edit Shipping Charge</div>
          </div>
          <form className={styles.blogForm} onSubmit={handleForm}>
            <label>Blog Id</label>
            <input
              type="text"
              style={{ width: "100%" }}
              value={data._id}
              disabled={true}
            />
            <label>Cart Size</label>
            <input
              type="text"
              style={{ width: "100%" }}
              onChange={(e) => setData({ ...data, cartsize: e.target.value })}
              value={data?.cartsize}
            />
            <label>Shipping Charge</label>
            <input
              type="text"
              style={{ width: "100%" }}
              onChange={(e) =>
                setData({ ...data, shipping_charge: e.target.value })
              }
              value={data?.shipping_charge}
            />

            <center>
              <input
                type="submit"
                value="Update Shipping Charge"
                className={styles.cbBtn}
              />
            </center>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
