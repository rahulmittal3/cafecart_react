import React from "react";
import styles from "../../AdminStyles/AdminList.module.css";
import AdminList from "../../Components/Admin/AdminList.js";
import { Form, Input, Button, Checkbox, InputNumber } from "antd";
import { createBlogTag } from "../../Axios/Admin.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CreateBlogTag = () => {
  const [data, setData] = React.useState({});
  const navigate = useNavigate();
  let token = "randomString";
  if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
    token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
  }
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(data);
    createBlogTag(token, data)
      .then((res) => {
        toast.success("Blog Tag Has Been Created Successfully!");
        navigate("/admin/blogs/tags");
      })
      .catch((err) => {
        toast.error("Blog Tag Could not Be Created!");
        navigate("/admin/blogs/tags");
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
            <div className={styles.couponLeft}>Create Blog Tag</div>
          </div>
          <center>
            <div>
              <form onSubmit={submitHandler}>
                <div className="form-row">
                  <div className="col">
                    <label htmlFor="exampleFormControlSelect1">
                      Blog Tag Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Blog Tag Name"
                      required={true}
                      onChange={(e) =>
                        setData({ ...data, tag: e.target.value })
                      }
                      value={data.tag}
                    />
                  </div>
                </div>
                <br />
                <br />
                <button type="submit" className="btn btn-primary">
                  Create
                </button>
              </form>
            </div>{" "}
          </center>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogTag;
