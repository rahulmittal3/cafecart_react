import React from "react";
import styles from "../../AdminStyles/AdminList.module.css";
import AdminList from "../../Components/Admin/AdminList.js";
import { Table, Badge, Button } from "antd";
import { useNavigate, Link, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getBlog, updateBlog } from "../../Axios/Admin.js";
import { toast } from "react-toastify";
const SingleBlog = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = React.useState({});
  const [content, setContent] = React.useState("");
  let token = "randomString";
  if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
    token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
  }
  const getData = () => {
    getBlog(token, params.id)
      .then((res) => {
        setData(res.data);
        setContent(res.data.description);
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getData();
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    const obj = { ...data, description: content };
    console.log(obj);
    updateBlog(token, obj)
      .then((res) => {
        toast.success("Blog has been Modified Successfully");
        navigate("/admin/blogs");
      })
      .catch((err) => {
        toast.error("Unexpected Error occured!");
        navigate("/admin/blogs");
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
            <div className={styles.couponLeft}>Edit Blog</div>
          </div>
          <form className={styles.blogForm} onSubmit={handleForm}>
            <label>Blog Id</label>
            <input
              type="text"
              style={{ width: "100%" }}
              value={data._id}
              disabled={true}
            />
            <label>Title</label>
            <input
              type="text"
              style={{ width: "100%" }}
              onChange={(e) => setData({ ...data, title: e.target.value })}
              value={data.title}
            />
            <label>Blog Code</label>
            <input
              type="text"
              style={{ width: "100%" }}
              onChange={(e) => setData({ ...data, blogCode: e.target.value })}
              value={data.blogCode}
            />
            <label>Image Path</label>
            <input
              type="text"
              style={{ width: "100%" }}
              onChange={(e) => setData({ ...data, imagePath: e.target.value })}
              value={data.imagePath}
            />
            <label>Category</label>
            <input
              type="text"
              style={{ width: "100%" }}
              onChange={(e) =>
                setData({ ...data, blog_category: e.target.value })
              }
              value={data.blog_category}
            />

            <label>Preview</label>
            <input
              type="text"
              style={{ width: "100%" }}
              onChange={(e) => setData({ ...data, preview: e.target.value })}
              value={data.preview}
            />
            <label>Content</label>
            <ReactQuill
              style={{ marginBottom: "20px" }}
              value={content}
              onChange={setContent}
            />
            <center>
              <input
                type="submit"
                value="Update Blog"
                className={styles.cbBtn}
              />
            </center>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
