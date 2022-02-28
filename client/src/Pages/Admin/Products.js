import React from "react";
import styles from "../../AdminStyles/AdminList.module.css";
import AdminList from "../../Components/Admin/AdminList.js";
import { Table, Badge, Button } from "antd";
import { getAllProducts, deleteProduct } from "../../Axios/Admin.js";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const Coupons = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  let token = "randomString";
  if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
    token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
  }
  const getCoupons = () => {
    getAllProducts(token)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getCoupons();
  }, []);
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      width: 150,
      align: "center",
      render: (text) => <Link to={`/admin/product/${text}`}>{text}</Link>,
    },
    {
      title: "Title",
      dataIndex: "title",
      width: 150,
      align: "center",
    },
    {
      title: "Manufacturer",
      dataIndex: "manufacturer",
      width: 150,
      align: "center",
    },
    {
      title: "Quantity",
      dataIndex: "specific_quantity",
      width: 60,
      align: "center",
    },
    {
      title: "Selling Price",
      dataIndex: "price",
      width: 50,
      align: "center",
    },
    {
      title: "MRP",
      dataIndex: "mrpPrice",
      width: 50,
      align: "center",
    },
    {
      title: "Remove",
      dataIndex: "_id",
      width: 40,
      align: "center",
      render: (text) => (
        <DeleteIcon
          sx={{ fontSize: 30, color: "red" }}
          onClick={(e) => {
            deleteProduct(token, text)
              .then((res) => {
                toast.success("Deleted Successfully!");
                getCoupons();
              })
              .catch((eror) => {
                toast.error(eror.response.data);
              });
          }}
        />
      ),
    },
  ];
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
              <div className={styles.couponLeft}>Products</div>
            </Badge>

            <div className={styles.couponRight}>
              {" "}
              <Button
                type="primary"
                size="large"
                onClick={(e) => navigate("/admin/product/new")}
              >
                Create Product
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
