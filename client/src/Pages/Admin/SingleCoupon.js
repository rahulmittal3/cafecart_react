import React from "react";
import styles from "../../AdminStyles/AdminList.module.css";
import AdminList from "../../Components/Admin/AdminList.js";
import { Form, Input, Button, Checkbox, InputNumber } from "antd";
import { useParams } from "react-router-dom";
import { getCoupon } from "../../Axios/Admin.js";

const SingleCoupon = () => {
  const params = useParams();
  const [data, setData] = React.useState({});
  const [existing, setExisting] = React.useState(null);
  let token = "randomString";
  if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
    token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
  }
  const getExisting = () => {
    getCoupon(token, params.id)
      .then((res) => setExisting(res.data))
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getExisting();
  }, []);
  console.log(existing?.coupon);
  return (
    <div className={styles.overall}>
      <div className={styles.left}>
        <AdminList />
      </div>
      <div className={styles.right}>
        <div className={styles.rightInner}>
          <div className={styles.couponHeading}>
            <div className={styles.couponLeft}>Edit Coupon</div>
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
                    defaultValue={existing?.coupon}
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
                  <Button type="primary" htmlType="submit">
                    Submit
                  </Button>
                </Form.Item>
              </Form>{" "}
            </div>{" "}
          </center>
        </div>
      </div>
      {existing ? JSON.stringify(existing) : ""}
    </div>
  );
};

export default SingleCoupon;
