import React from "react";
import styles from "../../AdminStyles/AdminList.module.css";
import AdminList from "../../Components/Admin/AdminList.js";
import { Form, Input, Button, Checkbox, InputNumber } from "antd";
import { getBlogsTag, updateBlogTag } from "../../Axios/Admin.js";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
const EditBlogTag = () => {
  const [data, setData] = React.useState({});
  const params = useParams();
  const navigate = useNavigate();
  let token = "randomString";
  if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
    token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
  }
  const getData = () => {
    getBlogsTag(token, params.tagId)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getData();
  }, [params]);
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(data);
    updateBlogTag(token, data)
      .then((res) => {
        toast.success("Blogs Tag Has Been Edited Successfully!");
        navigate("/admin/blogs/tags");
      })
      .catch((err) => {
        toast.error("Blog Tag Could not Be Edited!");
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
            <div className={styles.couponLeft}>Edit Blog Tag</div>
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
                      placeholder="Blog Category Name"
                      required={true}
                      onChange={(e) =>
                        setData({ ...data, tagName: e.target.value })
                      }
                      value={data?.tagName}
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

export default EditBlogTag;
