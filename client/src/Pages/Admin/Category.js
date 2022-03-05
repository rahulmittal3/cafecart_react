import React from "react";
import styles from "../../AdminStyles/AdminList.module.css";
import AdminList from "../../Components/Admin/AdminList.js";
import { Table, Badge, Button } from "antd";
import { useNavigate, Link } from "react-router-dom";
import { getAllCategories, deleteCategory } from "../../Axios/Admin.js";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import { toast } from "react-toastify";
const Category = () => {
  const [data, setData] = React.useState([]);
  const navigate = useNavigate();
  let token = "randomString";
  if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
    token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
  }
  const getData = () => {
    getAllCategories(token)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getData();
  }, []);
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      // : 60,
      align: "center",
      // render: (text) => (
      //   <Link to={`/admin/subcategory-parent/${text}`}>{text}</Link>
      // ),
    },
    {
      title: "Title",
      dataIndex: "title",
      // : 80,
      align: "center",
    },
    {
      title: "Slug",
      dataIndex: "slug",
      // : 80,
      align: "center",
    },
    {
      title: "Available Subcategories",
      dataIndex: "Subcategories",
      // : 80,
      align: "center",
      render: (text) => text.length,
    },
    {
      title: "Delete",
      align: "center",
      dataIndex: "_id",
      render: (text) => (
        <DeleteIcon
          sx={{ fontSize: 24, color: "red" }}
          className={styles.deleteIcon}
          onClick={(e) => {
            deleteCategory(token, text)
              .then((res) => {
                toast.success("Category Deleted Successfully!");
                getData();
              })
              .catch((err) => toast.error("Please Try Again"));
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
            <Badge count={data ? data.length : 0} offset={[20, 10]}>
              <div className={styles.couponLeft}>Categories</div>
            </Badge>
            <div className={styles.couponRight}>
              {" "}
              <Button
                type="primary"
                size="large"
                onClick={(e) => navigate("/admin/category/new")}
              >
                + Create New
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

export default Category;