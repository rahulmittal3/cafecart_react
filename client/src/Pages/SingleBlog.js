import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  allBlogs,
  getParticularBlog,
  getTagsAndCategories,
} from "../Axios/Blog.js";
import BlogsIndividual from "../Components/Blogs/BlogsIndividual.js";
import Slider from "react-slick";
import styles from "./Blogs.module.css";
import SearchIcon from "@mui/icons-material/Search";
import ReactRoundedImage from "react-rounded-image";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Pagination } from "antd";

//for single one
import moment from "moment";

const SingleBlog = () => {
  React.useEffect(() => {
    document.body.scrollTop = 0;
  }, []);
  const params = useParams();
  const navigate = useNavigate();
  const [catsAndTags, setCatsAndTags] = React.useState({});
  const [blogs, setBlogs] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [pblog, setPblog] = React.useState(null);
  const [other, setOther] = React.useState(null);
  const getBlogs = () => {
    getParticularBlog(params.blogId)
      .then((res) => {
        setPblog(res.data.blog);
        setOther(res.data.other);
        getTagsAndCategories()
          .then((res) => setCatsAndTags(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getBlogs();
  }, []);

  var settings = {
    infinite: true,
    // speed: 100,
    // slidesToShow: 1,
    slidesToScroll: 1,
    // accessibility: true,
    // arrows: true,
    // dots: true,
    autoplay: true,
    autoplaySpeed: 2000,
    fade: true,
  };
  const createMarkup = () => {
    return { __html: pblog?.description };
  };
  return (
    <>
      <div className={styles.blogOuter}>
        <div className={`${styles.divider} ${styles.singleDivider}`}>
          <div className={styles.leftSection}>
            <div className={styles.left_head}>{pblog?.title}</div>
            <div>
              <img
                src={pblog?.imagePath}
                alt="je"
                className={styles.left_img}
              />
            </div>
            {/* <LocalOfferIcon fontSize={"large"} />{" "} */}
            {/* <div className={styles.tagss}>
              {pblog &&
                pblog.tags &&
                pblog.tags.length > 0 &&
                pblog.tags.map((curr, index) => (
                  <div className={styles.tagNames} key={index}>
                    {curr?.tagName}
                  </div>
                ))}
            </div> */}
            <br />
            <br />
            <div
              className={styles.left_desc}
              dangerouslySetInnerHTML={createMarkup()}
            ></div>
          </div>

          <div className={styles.search}>
            {/* <div className={styles.searchBar}>
              <div className={styles.searchField}>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Search by Keyword"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <button className={styles.searchBtn}>
                <SearchIcon sx={{ color: "#ffffff", fontSize: 30 }} />
              </button>
            </div> */}
            <div className={styles.info}>
              <center>
                <div
                  style={{
                    marginTop: "-120px",
                  }}
                >
                  <ReactRoundedImage
                    image={
                      "https://res.cloudinary.com/techbuy/image/upload/v1644658063/helllo_po0gga.jpg"
                    }
                    roundedColor="#fff"
                    imageWidth="150"
                    imageHeight="150"
                    roundedSize="13"
                    borderRadius="70"
                    style={{ boxShadow: " 0px 4px 12px rgba(0, 0, 0, 0.25)" }}
                  />
                </div>
                <div className={styles.infoHeading}>Our Mission</div>
                <div className={styles.infoDesc}>
                  Lorem tortor arcu accumsan nunc. Non pellentesque adipiscing
                  erat platea aliquam mattis urna, consectetur purus. Vestibulum
                  aliquet ipsum, pellentesque vitae quam placerat velit nunc
                  diam. Faucibus dui cursus habitasse molestie nisl.
                </div>
                <div>
                  <button
                    className={styles.aboutUsBtn}
                    onClick={(e) => navigate("/pages/about-us")}
                  >
                    About Us <ArrowForwardIosIcon />
                  </button>
                </div>
                <div className={styles.icons}>
                  <FacebookIcon sx={{ fontSize: 40 }} className={styles.icon} />
                  <a
                    href="https://www.instagram.com/cafecart.in/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <InstagramIcon
                      sx={{ fontSize: 40 }}
                      className={styles.icon}
                    />
                  </a>

                  <PinterestIcon
                    sx={{ fontSize: 40 }}
                    className={styles.icon}
                  />
                </div>
              </center>
            </div>
            {/*CATEGORIES */}
            <div className={styles.categories}>
              <div className={styles.categories_heading}>Blog Category</div>
              <div className={styles.categories__points}>
                {pblog?.category &&
                  pblog?.category &&
                  pblog?.category.length > 0 &&
                  pblog?.category.map((curr, index) => {
                    return (
                      <div className={styles.category} key={index}>
                        <img
                          src={curr?.iconLink}
                          alt="hello"
                          className={styles.category_img}
                        />
                        {curr?.categoryName}
                      </div>
                    );
                  })}
              </div>
            </div>
            {/*OTHER BLOGS*/}
            {/*OTHER BLOGS*/}
            {other && (
              <div className={styles.otherBlogs}>
                <div className={styles.categories_heading}>
                  Popular Coffee Talk
                </div>
                <div className={styles.other_list}>
                  <div
                    className={styles.other}
                    onClick={(e) => navigate(`/blog/${other?._id}`)}
                  >
                    <div className={styles.other_img}>
                      {" "}
                      <img
                        src={other?.imagePath}
                        className={styles.singleImgOther}
                        alt="blog"
                      />
                    </div>
                    <div className={styles.other_text}>
                      <div className={styles.otherTitle}>{other?.title}</div>
                      <div
                        className={styles.otherTitle}
                        style={{ fontWeight: "normal" }}
                      >
                        {other?.preview}
                      </div>
                      <div className={styles.link}>
                        <Link to={`/blog/${other?._id}`}>Read More</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/*OTHER TAGS*/}
            <div className={styles.tags}>
              <div className={styles.categories_heading}>Blog Tags</div>
              <div className={styles.tagList}>
                {pblog &&
                  pblog.tags &&
                  pblog.tags.map((curr, index) => {
                    return (
                      <p className={styles.tag} key={index}>
                        {curr?.tagName}
                      </p>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
