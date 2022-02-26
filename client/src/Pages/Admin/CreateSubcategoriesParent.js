import React from "react";
import styles from "../../AdminStyles/AdminList.module.css";
import AdminList from "../../Components/Admin/AdminList.js";
import { Form, Input, Button, Checkbox, InputNumber } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createSubParent } from "../../Axios/Admin.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CreateSubcategoriesChildren = () => {
  const [data, setData] = React.useState({});
  const navigate = useNavigate();
  let token = "randomString";
  if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
    token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const object = { ...data };
    console.log(object);
    createSubParent(token, object)
      .then((res) => {
        toast.success("Blog Created Successfully");
        navigate("/admin/subcategory-parent");
      })
      .catch((err) => {
        toast.error("Unexpected Error");
        navigate("/admin/subcategory-parent");
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
            <div className={styles.couponLeft}>Create Subcategory Parent</div>
          </div>
          <form className={styles.blogForm} onSubmit={handleSubmit}>
            <label>Title</label>
            <input
              type="text"
              style={{ width: "100%" }}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              value={data.title}
            />

            <center>
              <input
                type="submit"
                value="Create"
                className={styles.cbBtn}
                disabled={!data.title}
              />
            </center>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateSubcategoriesChildren;
