import React from "react";
import { Link } from "react-router-dom";
import { allBlogs } from "../Axios/Blog.js";
import BlogsIndividual from "../Components/Blogs/BlogsIndividual.js";
const Blogs = () => {
  const [blogs, setBlogs] = React.useState(null);
  const getBlogs = () => {
    allBlogs()
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getBlogs();
  }, []);
  return (
    <>
      <div className="page-header">
        <div
          className="row"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <div className="col-12">
            <h2 style={{ color: "white", fontSize: 50 }}>Cafecart Blogs</h2>
          </div>
          <div className="blog-blogs-menu">
            <Link
              className="dropdown-item"
              to="/blog"
              style={{ color: "white" }}
            >
              All Blogs
            </Link>
            <Link
              className="dropdown-item"
              to="/blog/skin"
              style={{ color: "white" }}
            >
              Coffee's
            </Link>
            <Link
              className="dropdown-item"
              to="/blog/hair"
              style={{ color: "white" }}
            >
              Life
            </Link>
            <Link
              className="dropdown-item"
              to="/blog/body"
              style={{ color: "white" }}
            >
              Machine
            </Link>
          </div>
        </div>
      </div>
      <div className="blog">
        <div className="container">
          <div
            className="section-header text-center wow zoomIn"
            data-wow-delay="0.1s"
          >
            <p>From Blogs</p>
            <h2>Latest Cafecart Articles</h2>
          </div>
          <div className="row blog-page">
            {blogs &&
              blogs.map((curr, index) => {
                return <BlogsIndividual key={index} curr={curr} />;
              })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Blogs;
