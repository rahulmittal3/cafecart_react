import React from "react";
import styles from "../../AdminStyles/AdminList.module.css";
import { Link } from "react-router-dom";
import AdminList from "../../Components/Admin/AdminList.js";
import { getUsers } from "../../Axios/Admin.js";
import { Table, Badge, Button } from "antd";
import moment from "moment";
const columns = [
  {
    title: "Id",
    dataIndex: "_id",
    width: 150,
    align: "center",
    // render: (text) => <Link to={`/admin/coupon/${text}`}>{text}</Link>,
  },
  {
    title: "Email",
    dataIndex: "email",
    width: 150,
    align: "center",
  },
  {
    title: "Name",
    dataIndex: "username",
    width: 150,
    align: "center",
  },
  // {
  //   title: "Pricedrop",
  //   dataIndex: "pricedrop",
  //   width: 150,
  //   align: "center",
  // },
  {
    title: "Contact Verified",
    dataIndex: "contactVerified",
    width: 75,
    align: "center",
    render: (text) =>
      text ? (
        <span className={styles.user__yes}>Yes</span>
      ) : (
        <span className={styles.user__no}>No</span>
      ),
  },
  {
    title: "Contact Number",
    dataIndex: "contact",
    width: 100,
    align: "center",
    render: (text) => (text ? text : "NA"),
  },
];
const User = () => {
  const [data, setData] = React.useState(null);
  const getData = () => {
    getUsers(token)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  let token = "randomString";
  if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
    token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
  }
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div className={styles.overall}>
      <div className={styles.left}>
        <AdminList />
      </div>
      <div className={styles.right}>
        <div className={styles.rightInner}>
          <div className={styles.couponHeading}>
            <Badge count={data ? data.length : 0} offset={[20, 10]}>
              <div className={styles.couponLeft}>Users</div>
            </Badge>
          </div>
          <center>
            <Table
              columns={columns}
              dataSource={data}
              pagination={{ pageSize: 10 }}
              scroll={{ y: 1000 }}
            />
          </center>
        </div>
      </div>
      {/* {data && JSON.stringify(data)} */}
    </div>
  );
};

export default User;
