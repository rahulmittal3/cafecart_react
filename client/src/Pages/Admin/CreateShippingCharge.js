import React from "react";
import styles from "../../AdminStyles/AdminList.module.css";
import AdminList from "../../Components/Admin/AdminList.js";
import { Form, Input, Button, Checkbox, InputNumber } from "antd";
import { createShipping } from "../../Axios/Admin.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateShippingCharge = () => {
  const [data, setData] = React.useState({});
  const navigate = useNavigate();
  let token = "randomString";
  if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
    token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
  }
  const submitHandler = (e) => {
    e.preventDefault();
    createShipping(token, data)
      .then((res) => {
        toast.success("Shipping Charge created Succesfully");
        navigate("/admin/shipping-charges");
      })
      .catch((err) => {
        toast.error(err.response.data);
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
            <div className={styles.couponLeft}>Create Shipping Charge</div>
          </div>
          <div>
            <form onSubmit={submitHandler}>
              <div style={{ marginBottom: "20px" }}>
                <label>Enter Cart Size</label>
                <input
                  type="number"
                  style={{ textAlign: "left" }}
                  onChange={(e) => setData({ ...data, cart: e.target.value })}
                  value={data?.cart}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <label>Enter Shipping Charge</label>
                <input
                  type="number"
                  style={{ textAlign: "left" }}
                  onChange={(e) => setData({ ...data, charge: e.target.value })}
                  value={data?.charge}
                />
              </div>
              <div style={{ marginBottom: "20px" }}>
                <input
                  type={"submit"}
                  value="Create Shipping Charge"
                  style={{
                    backgroundColor: "blue",
                    border: "1px solid blue",
                    color: "white",
                  }}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateShippingCharge;
