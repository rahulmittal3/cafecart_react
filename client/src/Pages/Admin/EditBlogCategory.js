import React from "react";
import styles from "../../AdminStyles/AdminList.module.css";
import AdminList from "../../Components/Admin/AdminList.js";
import { Form, Input, Button, Checkbox, InputNumber } from "antd";
import { getBlogsCategory, updateBlogCategory } from "../../Axios/Admin.js";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
const EditBlogCategory = () => {
  const [data, setData] = React.useState({});
  const params = useParams();
  const navigate = useNavigate();
  let token = "randomString";
  if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
    token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
  }
  const getData = () => {
    getBlogsCategory(token, params.blogCategoryId)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getData();
  }, [params]);
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(data);
    updateBlogCategory(token, data)
      .then((res) => {
        toast.success("Blog Category Has Been Edited Successfully!");
        navigate("/admin/blogs/categories");
      })
      .catch((err) => {
        toast.error("Blog Category Could not Be Edited!");
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
            <div className={styles.couponLeft}>Edit Blog Category</div>
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
                        setData({ ...data, categoryName: e.target.value })
                      }
                      value={data.categoryName}
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
                        setData({ ...data, iconLink: e.target.value })
                      }
                      value={data.iconLink}
                    />
                  </div>
                </div>
                <br />
                <br />
                <button type="submit" className="btn btn-success">
                  Update
                </button>
              </form>
            </div>{" "}
          </center>
        </div>
      </div>
    </div>
  );
};

export default EditBlogCategory;
