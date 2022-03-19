import React from "react";
import { Link, useParams } from "react-router-dom";
import { getParticularBlog } from "../../Axios/Blog.js";
import ReactRoundedImage from "react-rounded-image";
import styles from "./newBlogs.module.css";
import Slider from "react-slick";
import moment from "moment";

import { Card } from "antd";
import { allBlogs } from "../../Axios/Blog.js";
import CategoryIcon from "@mui/icons-material/Category";
import { Input, Space } from "antd";
import SearchIcon from "@mui/icons-material/Search";
import { AudioOutlined } from "@ant-design/icons";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import { style } from "@mui/system";
const { Search } = Input;
const { Meta } = Card;

const IndividualBlog = () => {
  React.useEffect(() => {
    document.body.scrollTop = 0;
  }, []);
  const [blogs, setBlogs] = React.useState(null);
  const params = useParams();
  const getBlog = () => {
    getParticularBlog(params.blogId)
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getBlog();
  }, []);
  const getHTML = () => {
    return { __html: blogs?.description };
  };
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
  return (
    <div className={styles.outer}>
      <center>
        <Slider {...settings}>
          {/* <div>
            <img
              src="https://wallpaperaccess.com/full/1076692.jpg"
              alt="slick"
              //style={{ width: "80vw", height: "100%" }}
              //
              className={styles.banner}
            />
          </div>
          <div>
            <img
              src="https://files.wallpaperpass.com/2019/10/coffee%20wallpaper%20052%20-%202880x1800-768x480.jpeg"
              alt="slick"
              //style={{ width: "80vw", height: "100%" }}
              className={styles.banner}
            />
          </div> */}
          <div>
            <img
              src={blogs?.imagePath}
              alt="slick"
              //style={{ width: "80vw", height: "100%" }}
              className={styles.banner123}
            />
          </div>
        </Slider>
      </center>

      <div style={{ marginTop: "20px" }}>
        <div className={styles.timeStamp}>
          Cafecart | {moment(blogs?.createdAt).format("MMMM Do YYYY, h:mm a")}
        </div>
        <p className={styles.BlogTitle}>{blogs?.title}</p>
      </div>

      <div className={styles.heading}>
        <div className={styles.wrapper}>
          <div className={styles.left}>
            <div
              dangerouslySetInnerHTML={getHTML()}
              className={styles.textData}
            ></div>
          </div>
          <div className={styles.right}>
            <center>
              <div className={styles.right__search}>
                <input
                  type="text"
                  className={styles.right__search__input}
                  placeholder={"Type a keyword and hit Enter 🔍"}
                ></input>
                {/* <button className={styles.right__search__inputBtn}>
                    Search
                  </button> */}
              </div>
              <div>
                <div className={styles.right__info__outer}>
                  <div style={{ marginTop: "-85px" }}>
                    <ReactRoundedImage
                      image={
                        "https://res.cloudinary.com/techbuy/image/upload/v1644658063/helllo_po0gga.jpg"
                      }
                      roundedColor="#fff"
                      imageWidth="120"
                      imageHeight="120"
                      roundedSize="13"
                      borderRadius="70"
                    />
                  </div>
                  <div className={styles.right__info__outer__title}>
                    Cafecart
                  </div>
                  <div className={styles.right__info__outer__desc}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Exercitationem facilis sunt repellendus excepturi beatae
                    porro debitis voluptate nulla quo veniam fuga sit molestias
                    minus.
                  </div>
                  <button className={styles.right__aboutUsBtn}>About Us</button>
                  <div className={styles.right__outerBtns}>
                    <div
                      style={{ margin: "5px" }}
                      className={styles.right__icons}
                    >
                      <FacebookIcon style={{ fontSize: "24px" }} />
                    </div>
                    <div
                      style={{ margin: "5px" }}
                      className={styles.right__icons}
                    >
                      <PinterestIcon style={{ fontSize: "24px" }} />
                    </div>
                    <div
                      style={{ margin: "5px" }}
                      className={styles.right__icons}
                    >
                      <InstagramIcon style={{ fontSize: "24px" }} />
                    </div>
                  </div>
                </div>
              </div>
            </center>
            <div className={styles.categ}>
              <div className={styles.categ__heading}>Categories</div>
              <ul className={styles.categories}>
                <li>
                  <a href="#">
                    Food <span>(12)</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    Travel <span>(22)</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    Lifestyle <span>(37)</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    Business <span>(42)</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    Adventure <span>(14)</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className={styles.sidebarBox}>
              <h3 className={styles.headingg}>Tags</h3>
              <ul className={styles.tags}>
                <li>
                  <a href="#">Travel</a>
                </li>
                <li>
                  <a href="#">Adventure</a>
                </li>
                <li>
                  <a href="#">Food</a>
                </li>
                <li>
                  <a href="#">Lifestyle</a>
                </li>
                <li>
                  <a href="#">Business</a>
                </li>
                <li>
                  <a href="#">Freelancing</a>
                </li>
                <li>
                  <a href="#">Travel</a>
                </li>
                <li>
                  <a href="#">Adventure</a>
                </li>
                <li>
                  <a href="#">Food</a>
                </li>
                <li>
                  <a href="#">Lifestyle</a>
                </li>
                <li>
                  <a href="#">Business</a>
                </li>
                <li>
                  <a href="#">Freelancing</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualBlog;
