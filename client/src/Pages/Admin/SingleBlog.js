import React from "react";
import styles from "../../AdminStyles/AdminList.module.css";
import AdminList from "../../Components/Admin/AdminList.js";
import { Table, Badge, Button } from "antd";
import { useNavigate, Link, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getBlog,
  updateBlog,
  getAllBlogsCategories,
  getAllBlogsTags,
} from "../../Axios/Admin.js";
import { toast } from "react-toastify";
const SingleBlog = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = React.useState({});
  const [content, setContent] = React.useState("");
  const [categs, setCategs] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [oldCateg, setOldCateg] = React.useState([]);
  const [oldTags, setOldTags] = React.useState([]);
  let token = "randomString";
  if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
    token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
  }
  const getData = () => {
    getBlog(token, params.id)
      .then((res) => {
        setData(res.data);
        setContent(res.data.description);
        setOldCateg(res.data.category);
        setOldTags(res.data.tags);
        getAllBlogsCategories(token)
          .then((res) => {
            setCategs(res.data);
          })
          .catch((err) => console.log(err));
        getAllBlogsTags(token)
          .then((res) => setTags(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getData();
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    const obj = { ...data, description: content };
    //fetch categories from this objects
    let categArray = [];
    for (let i = 0; i < obj.category.length; i++) {
      categArray.push(obj.category[i].value);
    }
    let tagArray = [];
    for (let i = 0; i < obj.tags.length; i++) {
      tagArray.push(obj.tags[i].value);
    }
    obj.category = categArray;
    obj.tags = tagArray;
    console.log(obj);

    updateBlog(token, obj)
      .then((res) => {
        toast.success("Blog has been Modified Successfully");
        getData();
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

            <label>Current Categories </label>

            {oldCateg &&
              oldCateg.map((curr, index) => (
                <li key={index}>
                  {index + 1}. {curr?.categoryName}
                </li>
              ))}
            <label>
              Select Categories of Blog (Drag or Ctrl/Cmd to Choose Multiple)
            </label>
            <select
              multiple
              onChange={(e) =>
                setData({ ...data, category: e.target.selectedOptions })
              }
              style={{
                width: "100%",
                border: "1px solid #000",
                padding: "15px",
              }}
            >
              {categs.length > 0 &&
                categs.map((curr, index) => {
                  return (
                    <option
                      key={index}
                      style={{ padding: "5px" }}
                      value={curr?._id}
                    >
                      {curr?.categoryName}
                    </option>
                  );
                })}
            </select>
            <hr />
            {/*For Tags*/}

            <label>Current Tags </label>
            {oldTags &&
              oldTags.map((curr, index) => (
                <li key={index}>
                  {index + 1}. {curr?.tagName}
                </li>
              ))}
            <label>
              Select Tags of Blog (Drag or Ctrl/Cmd to Choose Multiple)
            </label>
            <select
              multiple
              onChange={(e) =>
                setData({ ...data, tags: e.target.selectedOptions })
              }
              style={{
                width: "100%",
                border: "1px solid #000",
                padding: "15px",
              }}
            >
              {tags.length > 0 &&
                tags.map((curr, index) => {
                  return (
                    <option
                      key={index}
                      style={{ padding: "5px" }}
                      value={curr?._id}
                    >
                      {curr?.tagName}
                    </option>
                  );
                })}
            </select>

            <center>
              <input
                type="submit"
                value="Update Blog"
                className={styles.cbBtn}
                style={{ padding: "8px 16px" }}
              />
            </center>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
