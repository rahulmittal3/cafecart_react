import React from "react";
import styles from "../../AdminStyles/AdminList.module.css";
import AdminList from "../../Components/Admin/AdminList.js";
import { Table, Badge, Button } from "antd";
import { getAllShipping } from "../../Axios/Admin.js";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
const columns = [
  {
    title: "Id",
    dataIndex: "_id",
    width: 150,
    align: "center",
    render: (text) => <Link to={`/admin/shipping-charge/${text}`}>{text}</Link>,
  },
  {
    title: "Cart Size",
    dataIndex: "cartsize",
    width: 150,
    align: "center",
  },
  {
    title: "Shipping Charge",
    dataIndex: "shipping_charge",
    width: 150,
    align: "center",
  },
];

const Coupons = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  let token = "randomString";
  if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
    token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
  }
  const getCoupons = () => {
    getAllShipping(token)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getCoupons();
  }, []);

  return (
    <div className={styles.overall}>
      <div className={styles.left}>
        <AdminList />
      </div>
      <div className={styles.right}>
        <div className={styles.rightInner}>
          <div className={styles.couponHeading}>
            <Badge
              count={data ? data.length : 0}
              offset={[20, 10]}
              overflowCount={999}
            >
              <div className={styles.couponLeft}>Shipping Charges</div>
            </Badge>

            <div className={styles.couponRight}>
              {" "}
              <Button
                type="primary"
                size="large"
                onClick={(e) => navigate("/admin/shipping-charge/new")}
              >
                Create Shipping Charge
              </Button>
            </div>
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
    </div>
  );
};

export default Coupons;
