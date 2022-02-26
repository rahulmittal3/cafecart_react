import React from "react";
import styles from "../../AdminStyles/AdminList.module.css";
import AdminList from "../../Components/Admin/AdminList.js";
import { Form, Input, Button, Checkbox, InputNumber } from "antd";
import { createCoupon } from "../../Axios/Admin.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CreateCoupon = () => {
  const [data, setData] = React.useState({});
  const navigate = useNavigate();
  const create = (e) => {
    e.preventDefault();
    let token = "randomString";
    if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
      token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
    }
    createCoupon(data, token)
      .then((res) => {
        toast.success("Coupon Created Successfully");
        navigate("/admin/coupons");
      })
      .catch((err) => toast.error(err.response.data));
  };
  return (
    <div className={styles.overall}>
      <div className={styles.left}>
        <AdminList />
      </div>
      <div className={styles.right}>
        <div className={styles.rightInner}>
          <div className={styles.couponHeading}>
            <div className={styles.couponLeft}>Create Coupon</div>
          </div>
          <center>
            <div>
              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                initialValues={{
                  remember: true,
                }}
                //   onFinish={onFinish}
                //   onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Name"
                  name="name"
                  rules={[
                    {
                      required: true,
                      message: "Please input Coupon Name!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => setData({ ...data, name: e.target.value })}
                  />
                </Form.Item>
                <Form.Item
                  label="Minimum Cart Amount"
                  name="minimumCartAmount"
                  rules={[
                    {
                      required: true,
                      message: "Please input Minimum Cart Amount",
                    },
                  ]}
                >
                  <InputNumber
                    onChange={(e) => setData({ ...data, minimumCartAmount: e })}
                  />
                </Form.Item>
                <Form.Item
                  label="Pricedrop"
                  name="pricedrop"
                  rules={[
                    {
                      required: true,
                      message: "Please input Pricedrop",
                    },
                  ]}
                >
                  <InputNumber
                    onChange={(e) => setData({ ...data, pricedrop: e })}
                  />
                </Form.Item>
                <Form.Item
                  label="Maximum Amount"
                  name="maximumAmount"
                  rules={[
                    {
                      required: true,
                      message: "Please input Maximum Discount Amount",
                    },
                  ]}
                >
                  <InputNumber
                    onChange={(e) => setData({ ...data, maxAmount: e })}
                  />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    offset: 8,
                    span: 16,
                  }}
                >
                  <Button type="primary" htmlType="submit" onClick={create}>
                    Submit
                  </Button>
                </Form.Item>
              </Form>{" "}
            </div>{" "}
          </center>
        </div>
      </div>
    </div>
  );
};

export default CreateCoupon;
