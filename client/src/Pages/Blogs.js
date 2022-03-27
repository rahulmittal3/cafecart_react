import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { allBlogs, getTagsAndCategories } from "../Axios/Blog.js";
import BlogsIndividual from "../Components/Blogs/BlogsIndividual.js";
import Slider from "react-slick";
import styles from "./Blogs.module.css";
import SearchIcon from "@mui/icons-material/Search";
import ReactRoundedImage from "react-rounded-image";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { Pagination } from "antd";
import { Helmet } from "react-helmet";
//for single one
import moment from "moment";
import { style } from "@mui/system";
const Blogs = () => {
  React.useEffect(() => {
    document.body.scrollTop = 0;
  }, []);
  const navigate = useNavigate();
  const [blogs, setBlogs] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [catsAndTags, setCatsAndTags] = React.useState({});
  const getBlogs = (page) => {
    allBlogs(page)
      .then((res) => {
        setBlogs(res.data.blogs);
        setTotal(res.data.total);
        getTagsAndCategories()
          .then((res) => setCatsAndTags(res.data))
          .else((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getBlogs(page);
  }, [page]);

  const handlePageChange = (pg) => {
    setPage(pg);
  };
  var settings = {
    infinite: true,
    // speed: 100,
    // slidesToShow: 1,
    slidesToScroll: 1,
    accessibility: true,
    arrows: true,
    dots: true,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
  };
  return (
    <>
      <Helmet>
        <title>Cafecart | Blogs</title>
      </Helmet>
      <div className={styles.blogOuter}>
        <div className={styles.slick}>
          <Slider {...settings}>
            {blogs &&
              blogs.length > 0 &&
              blogs.map((curr, index) => {
                return (
                  <div className={styles.container} key={index}>
                    <img
                      src={
                        "https://res.cloudinary.com/techbuy/image/upload/v1645478597/hey_iv29vv.jpg"
                      }
                      alt="slick"
                      //
                      className={styles.banner}
                    />
                    <div className={styles.txtImg}>
                      {curr?.title} <br />
                      <div className={styles.txtImg2}>
                        {curr?.preview.substring(0, 40)}...
                      </div>
                      <button
                        className={styles.magic}
                        onClick={(e) => navigate(`/blog/${curr._id}`)}
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                );
              })}
          </Slider>
        </div>
        <div className={styles.heading1}>Coffee Talk</div>
        <div className={styles.divider}>
          <div className={styles.leftSection}>
            <div className={styles.leftSectionList}>
              {blogs &&
                blogs.length > 0 &&
                blogs.map((Curr, index) => {
                  return (
                    Curr.title.includes(search) && (
                      <div
                        className={styles.bItem}
                        key={index}
                        onClick={(e) => navigate(`/blog/${Curr._id}`)}
                        style={{ cursor: "pointer" }}
                      >
                        <div>
                          <center>
                            <img
                              src={Curr?.imagePath}
                              alt="Blog Images Here"
                              className={styles.mediaImage}
                            />
                          </center>
                        </div>
                        <div className={styles.singleDate}>
                          <img
                            src="https://res.cloudinary.com/techbuy/image/upload/v1647436972/jam_write_kwufso.svg"
                            alt="dateBlog"
                          />
                          {moment(Curr?.createdAt).format("MMM Do YYYY")}
                        </div>
                        <div className={styles.singleTitle}>{Curr?.title}</div>
                        <div className={styles.singleDescription}>
                          {Curr?.preview}
                        </div>
                        <div
                          className={styles.singleButton}
                          onClick={(e) => navigate(`/blog/${Curr._id}`)}
                        >
                          <button className={styles.singleBtn}>
                            Read More
                          </button>
                        </div>
                      </div>
                    )
                  );
                })}
            </div>
            <div style={{ width: "100%", marginTop: "20px" }}>
              {" "}
              <div>
                <center>
                  <Pagination
                    defaultCurrent={1}
                    // defaultPageSize={2}
                    current={page}
                    total={total * 3}
                    onChange={handlePageChange}
                  />
                </center>
              </div>
            </div>
          </div>
          {/* <div className={styles.blogs}>
            {blogs &&
              blogs.length > 0 &&
              blogs.map((curr, index) => {
                return (
                  curr.title.includes(search) && (
                    <div className={styles.blogsList} key={index}>
                      <div className={styles.imgBlog}>
                        <img
                          src={curr.imagePath}
                          className={styles.singleImg}
                          alt="blog"
                        />
                      </div>
                      <div className={styles.singleDate}>
                        <img
                          src="https://res.cloudinary.com/techbuy/image/upload/v1647436972/jam_write_kwufso.svg"
                          alt="dateBlog"
                        />
                        {moment(curr.createdAt).format("MMM Do YYYY")}
                      </div>
                      <div className={styles.singleTitle}>{curr.title}</div>
                      <div className={styles.singleDescription}>
                        {curr.preview}
                      </div>
                      <div
                        className={styles.singleButton}
                        onClick={(e) => navigate(`/blog/${curr._id}`)}
                      >
                        <button className={styles.singleBtn}>Read More</button>
                      </div>
                    </div>
                  )
                );
              })}

            <div style={{ width: "100%" }}>
              {" "}
              <div>
                <center>
                  <Pagination
                    defaultCurrent={1}
                    // defaultPageSize={2}
                    current={page}
                    total={total * 3}
                    onChange={handlePageChange}
                  />
                </center>
              </div>
            </div>
          </div> */}

          <div className={styles.search}>
            <div className={styles.searchBar}>
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
            </div>
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
              <div className={styles.categories_heading}>Categories</div>
              <div className={styles.categories__points}>
                {catsAndTags &&
                  catsAndTags.categories &&
                  catsAndTags.categories.length > 0 &&
                  catsAndTags.categories.map((curr, index) => {
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
            <div className={styles.otherBlogs}>
              <div className={styles.categories_heading}>
                Popular Coffee Talk
              </div>
              <div className={styles.other_list}>
                <div className={styles.other}>
                  <div className={styles.other_img}>
                    {" "}
                    <img
                      src="https://www.wallpaperup.com/uploads/wallpapers/2013/11/09/171722/63511993de344e27beb1880b7a9810fd-1000.jpg"
                      className={styles.singleImgOther}
                      alt="blog"
                    />
                  </div>
                  <div className={styles.other_text}>
                    <div className={styles.otherTitle}>
                      Pretium tempus odio tristique pellentesque sociis.
                    </div>
                    <div className={styles.link}>Read More</div>
                  </div>
                </div>
              </div>
            </div>
            {/*OTHER TAGS*/}
            <div className={styles.tags}>
              <div className={styles.categories_heading}>Tags</div>
              <div className={styles.tagList}>
                {catsAndTags &&
                  catsAndTags.tags &&
                  catsAndTags.tags.map((curr, index) => {
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

export default Blogs;
