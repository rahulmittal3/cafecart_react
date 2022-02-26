import React from "react";
import styles from "../../AdminStyles/AdminList.module.css";
import AdminList from "../../Components/Admin/AdminList.js";
import { Form, Input, Button, Checkbox, InputNumber } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createBlog } from "../../Axios/Admin.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const CreateBlog = () => {
  const [data, setData] = React.useState({});
  const [content, setContent] = React.useState("");
  const navigate = useNavigate();
  let token = "randomString";
  if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
    token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const object = { ...data, content: content };
    console.log(object);
    createBlog(token, object)
      .then((res) => {
        toast.success("Blog Created Successfully");
        navigate("/admin/blogs");
      })
      .catch((err) => {
        toast.error("Unexpected Error");
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
            <div className={styles.couponLeft}>Create Blog</div>
          </div>
          <form className={styles.blogForm} onSubmit={handleSubmit}>
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
              onChange={(e) => setData({ ...data, code: e.target.value })}
              value={data.code}
            />
            <label>Image Path</label>
            <input
              type="text"
              style={{ width: "100%" }}
              onChange={(e) => setData({ ...data, image: e.target.value })}
              value={data.image}
            />
            <label>Category</label>
            <input
              type="text"
              style={{ width: "100%" }}
              onChange={(e) => setData({ ...data, category: e.target.value })}
              value={data.category}
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
                value="Create"
                className={styles.cbBtn}
                disabled={
                  !data.title ||
                  !data.code ||
                  !data.image ||
                  !data.category ||
                  !data.preview ||
                  !content
                }
              />
            </center>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;
