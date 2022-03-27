import React from "react";
import styles from "../../AdminStyles/AdminList.module.css";
import AdminList from "../../Components/Admin/AdminList.js";
import { Form, Input, Button, Checkbox, InputNumber } from "antd";
import { createReview } from "../../Axios/Admin.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CreateReviewPage = () => {
  const [data, setData] = React.useState({ rating: 5 });
  const navigate = useNavigate();
  let token = "randomString";
  if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
    token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
  }
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(data);
    createReview(token, data)
      .then((res) => {
        toast.success("Review Has Been Created Successfully!");
        navigate("/admin/reviews");
      })
      .catch((err) => {
        toast.error("Review Could not Be Created!");
        navigate("/admin/reviews");
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
            <div className={styles.couponLeft}>Create Review</div>
          </div>
          <center>
            <div>
              <form onSubmit={submitHandler}>
                <div className="form-row">
                  <div className="col">
                    <label htmlFor="exampleFormControlSelect1">
                      Product Id
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Product Id"
                      required={true}
                      onChange={(e) =>
                        setData({ ...data, productId: e.target.value })
                      }
                      value={data.productId}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="exampleFormControlSelect1">User Id</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="User Id"
                      required={true}
                      onChange={(e) =>
                        setData({ ...data, user: e.target.value })
                      }
                      value={data.user}
                    />
                  </div>
                </div>
                <br />
                <br />
                <div className="form-row">
                  <div className="col">
                    <label htmlFor="exampleFormControlSelect1">Review</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Review"
                      required={true}
                      onChange={(e) =>
                        setData({ ...data, comment: e.target.value })
                      }
                      value={data.comment}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="exampleFormControlSelect1">
                      Select Rating
                    </label>
                    <select
                      className="form-control"
                      id="exampleFormControlSelect1"
                      value={data.rating}
                      onChange={(e) =>
                        setData({ ...data, rating: e.target.value })
                      }
                    >
                      <option value={1} selected={data.rating === 1}>
                        1
                      </option>
                      <option value={2} selected={data.rating === 2}>
                        2
                      </option>
                      <option value={3} selected={data.rating === 3}>
                        3
                      </option>
                      <option value={4} selected={data.rating === 4}>
                        4
                      </option>
                      <option value={5} selected={data.rating === 5}>
                        5
                      </option>
                    </select>
                  </div>
                </div>
                <br />
                <br />
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </form>
            </div>{" "}
          </center>
        </div>
      </div>
    </div>
  );
};

export default CreateReviewPage;
