import React from "react";
import styles from "../../AdminStyles/AdminList.module.css";
import AdminList from "../../Components/Admin/AdminList.js";
import { Form, Input, Button, Checkbox, InputNumber } from "antd";
import { createBlogCategory } from "../../Axios/Admin.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CreateBlogCategory = () => {
  const [data, setData] = React.useState({});
  const navigate = useNavigate();
  let token = "randomString";
  if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
    token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
  }
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(data);
    createBlogCategory(token, data)
      .then((res) => {
        toast.success("Blog Category Has Been Created Successfully!");
        navigate("/admin/blogs/categories");
      })
      .catch((err) => {
        toast.error("Blog Category Could not Be Created!");
        navigate("/admin/blogs/categories");
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
            <div className={styles.couponLeft}>Create Blog Category</div>
          </div>
          <center>
            <div>
              <form onSubmit={submitHandler}>
                <div className="form-row">
                  <div className="col">
                    <label htmlFor="exampleFormControlSelect1">
                      Blog Category Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Blog Category Name"
                      required={true}
                      onChange={(e) =>
                        setData({ ...data, category: e.target.value })
                      }
                      value={data.category}
                    />
                  </div>
                  <div className="col">
                    <label htmlFor="exampleFormControlSelect1">
                      Blog Icon Link
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Blog Icon Link"
                      required={true}
                      onChange={(e) =>
                        setData({ ...data, icon: e.target.value })
                      }
                      value={data.icon}
                    />
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

export default CreateBlogCategory;
