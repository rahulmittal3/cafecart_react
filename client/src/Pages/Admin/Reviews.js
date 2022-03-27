import React from "react";
import styles from "../../AdminStyles/AdminList.module.css";
import AdminList from "../../Components/Admin/AdminList.js";
import { Table, Badge, Button } from "antd";
import { getAllReviews, deleteReview } from "../../Axios/Admin.js";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Reviews = () => {
  const navigate = useNavigate();
  const [data, setData] = React.useState([]);
  let token = "randomString";
  if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
    token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
  }
  const getReviews = () => {
    getAllReviews(token)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getReviews();
  }, []);
  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      width: 150,
      align: "center",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      width: 50,
      align: "center",
    },
    {
      title: "Comment",
      dataIndex: "comment",
      width: 150,
      align: "center",
    },
    {
      title: "Review By",
      dataIndex: "name",
      width: 150,
      align: "center",
    },
    {
      title: "Product Id",
      dataIndex: "productId",
      width: 150,
      align: "center",
      render: (text) => <Link to={`/admin/product/${text}`}>{text}</Link>,
    },
    {
      title: "Delete",
      dataIndex: "_id",
      width: 75,
      align: "center",
      render: (text) => (
        <DeleteIcon
          sx={{ fontSize: 30, color: "red", cursor: "pointer" }}
          onClick={(e) => {
            deleteReview(token, text)
              .then((res) => {
                toast.success("Deleted Review Succesfully");
                getReviews();
              })
              .catch((err) => {
                toast.error("Deletion Failed!");
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
              <div className={styles.couponLeft}>Reviews</div>
            </Badge>

            <div className={styles.couponRight}>
              {" "}
              <Button
                type="primary"
                size="large"
                onClick={(e) => navigate("/admin/review/new")}
              >
                Create Review
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

export default Reviews;
