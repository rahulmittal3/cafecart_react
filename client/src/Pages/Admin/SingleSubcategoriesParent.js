import React from "react";
import styles from "../../AdminStyles/AdminList.module.css";
import AdminList from "../../Components/Admin/AdminList.js";
import { Table, Badge, Button } from "antd";
import { useNavigate, Link, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getSubParent, updateSubParent } from "../../Axios/Admin.js";
import { toast } from "react-toastify";

const SingleSubcategoriesChildren = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = React.useState({});
  let token = "randomString";
  if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
    token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
  }
  const getData = () => {
    getSubParent(token, params.id)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getData();
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    const obj = { ...data };
    console.log(obj);
    updateSubParent(token, obj)
      .then((res) => {
        toast.success("Record has been Modified Successfully");
        navigate("/admin/subcategory-parent");
      })
      .catch((err) => {
        toast.error("Unexpected Error occured!");
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
            <div className={styles.couponLeft}>Edit Subcategory Parent</div>
          </div>
          <form className={styles.blogForm} onSubmit={handleForm}>
            <label>Subcategory Parent Id</label>
            <input
              type="text"
              style={{ width: "100%" }}
              value={data._id}
              disabled={true}
            />
            <label>Subcategory Children Parent</label>
            <input
              type="text"
              style={{ width: "100%" }}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              value={data.title}
            />
            <label>Subcategory Children Parent</label>
            <input
              type="text"
              style={{ width: "100%" }}
              onChange={(e) => setData({ ...data, slug: e.target.value })}
              value={data.slug}
            />

            <center>
              <input
                type="submit"
                value="Update Subcategory Parent"
                className={styles.cbBtn}
              />
            </center>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleSubcategoriesChildren;
