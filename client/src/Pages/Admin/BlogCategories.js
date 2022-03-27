import React from "react";
import styles from "../../AdminStyles/AdminList.module.css";
import AdminList from "../../Components/Admin/AdminList.js";
import { Table, Badge, Button } from "antd";
import {
  getAllBlogsCategories,
  deleteBlogCaetgory,
} from "../../Axios/Admin.js";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

const BlogCategories = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  let token = "randomString";
  if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
    token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
  }
  const getCoupons = () => {
    getAllBlogsCategories(token)
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
      // render: (text) => <Link to={`/admin/coupon/${text}`}>{text}</Link>,
    },
    {
      title: "Blog Category",
      dataIndex: "categoryName",
      width: 150,
      align: "center",
    },
    {
      title: "Icon",
      dataIndex: "iconLink",
      width: 150,
      align: "center",
      render: (text) => (
        <img
          src={text}
          alt="Icon Images"
          style={{ height: "40px", width: "40px" }}
        />
      ),
    },
    {
      title: "Delete",
      align: "center",
      dataIndex: "_id",
      width: 50,
      render: (text) => (
        <DeleteIcon
          sx={{ fontSize: 24, color: "red", cursor: "pointer" }}
          className={styles.deleteIcon}
          onClick={(e) => {
            deleteBlogCaetgory(token, text)
              .then((res) => {
                toast.success("Blog Category Deleted Successfully!");
                getCoupons();
              })
              .catch((err) => toast.error("Please Try Again"));
          }}
        />
      ),
    },
    {
      title: "Edit",
      align: "center",
      dataIndex: "_id",
      width: 50,
      render: (text) => (
        <ModeEditIcon
          sx={{ fontSize: 24, color: "green", cursor: "pointer" }}
          className={styles.deleteIcon}
          onClick={(e) => {
            navigate(`/admin/blog-category/${text}/edit`);
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
              <div className={styles.couponLeft}>Blog Categories</div>
            </Badge>

            <div className={styles.couponRight}>
              {" "}
              <Button
                type="primary"
                size="large"
                onClick={(e) => navigate("/admin/blogs/category/new")}
              >
                Create Blog Category
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

export default BlogCategories;
