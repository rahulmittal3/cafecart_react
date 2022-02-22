import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { allBlogs, getParticularBlog } from "../Axios/Blog.js";
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

//for single one
import moment from "moment";

const SingleBlog = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [blogs, setBlogs] = React.useState(null);
  const [page, setPage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [search, setSearch] = React.useState("");
  const [pblog, setPblog] = React.useState(null);
  const getBlogs = () => {
    getParticularBlog(params.blogId)
      .then((res) => {
        setPblog(res.data);
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
          <div className={styles.left}>
            <div className={styles.left_head}>{pblog?.title}</div>
            <div>
              <img
                src={pblog?.imagePath}
                alt="je"
                className={styles.left_img}
              />
            </div>
            <div
              className={styles.left_desc}
              dangerouslySetInnerHTML={createMarkup()}
            ></div>
          </div>

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
                <div className={styles.category}>
                  <img
                    src="https://s3-alpha-sig.figma.com/img/a4c8/2eba/549803903bae51cc7b09094b73b92774?Expires=1646611200&Signature=ghvO0paHHMltSs8dPAQxIV0KmiL9oTBOs6LHvy8Y6S~0Tw0bGksl8ZJgXEOZQFW7LMfdSRqghaVHB0jWPUXsbnhIIyo~AoF2I7hqfHSmoBmam-ynXmRSR5EvaAR1gHc19rbs-cCNvS1HgUFpkOgCMFx1uUz2fvj7-eddeF1IA3cunp7CPUcrfHToZ9~phUDlT1WIYCq-5Rzj61GkdblXSWMxNMRfn1lPwknsds3yhwPMkiI4D7E1Yjvn7fnrltmtc1-hw0cheQ4lwNCQq6qDRTsbmfu57WAqsHTuaOL0Tj2lvgb8YD7YsL87ATQkmFiIBNhorFfsC8iIRBtnACDjxw__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                    alt="hello"
                    className={styles.category_img}
                  />
                  Learn
                </div>
                <div className={styles.category}>
                  <img
                    src="https://s3-alpha-sig.figma.com/img/01df/8096/b1eed8fdf43c410fbbe31512fa08357e?Expires=1646611200&Signature=XzwyZD2UFV~K0kqdFyr7-5eKwgJkmph5o5ciYD00HEWJ2bIbWKsWXkmRl0tVo0HdNCa5Ay0pAHFP3wc7MnEw77AfcR8e2XiZ9LHUCHFhrUVztktc4-HImlwawvSMLr8q-Nf38qErPJcTsD9HxXrUgxDeTPdy78WaGHK~P1Y79qYTTRnBOaquPApdR8SHx4GsF8UNGUQVsPPh0tu2L0aDxri4mrVv1~vuHvhhTQHra~3P82v37UU8nwPawZZKKw2YsyCj2LkbR-1Sq82w6dEaZHvn-vscha~FZGylGtQ7FzXHtxGxdyDBuOFE7BMcyMkxEVzeMJ9kHQMaYatn2smqIg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                    alt="hello"
                    className={styles.category_img}
                  />
                  Coffee Machine
                </div>
                <div className={styles.category}>
                  <img
                    src="https://s3-alpha-sig.figma.com/img/925e/4969/1322c953fa0e0d954f1b08a11aa7fc45?Expires=1646611200&Signature=PKWIE0JOF7vDsA3-NaNweIWhKNyp2Z7WSdsiWw91g07WWq1CkGdIRAslfce4ARwSU38nF8kK6ivVv~uFtCXBddch-gcWWGT5lSNvnbA3ad1SJjOkhVIcrBpiuZlEAgpIzYw3Q7xyazDOr0O9ExOUNOVFSuSH06SQYj0~J3eB5RGPzTa5nv3Fhz-8EvmJTcMRx5nwS4TDyavFpBspvKbZPcnkoMZQj9~4YMfN-73RnuzORvz5~lVI-ee5pjMThPpzp2sj6DqOovRcfya0ShBdQ8wIlKZPz9NbC16cd8GaNoxibZE17EFEv8hxRHBpR1~kTejos22C0ii2kJ3bvnUuag__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                    alt="hello"
                    className={styles.category_img}
                  />
                  Recipes
                </div>
                <div className={styles.category}>
                  <img
                    src="https://s3-alpha-sig.figma.com/img/efb4/de67/e542b3b358343738ee095c5dc1c5ce0a?Expires=1646611200&Signature=T1oDn6DSOLpYnCegyBdgiBEE2xsitt2-61RWPqVHGGu4CNaMl2aRtnrdrFg3t54xtmnFtj3CrMQnVI1YB88ChuTlKhPm3kUaVofNbI1TctMkLFD4fTR8dqJai61Rw2kqZiSrTFssnnl1IHnlQ~0VmhVBbbjREfvYOIBMj5UqMhqwPI9XKMeY-8-Of5zj2kICQCfMaj3mUnhIwM1x1imeWAnvpS614Fl84fQtbmx-aC4NtUsCt20m3p6LiQ4WrTBbO6UeEsZohnqDujo8ESfeSY8RK9HFzHV8mpPUxKtQ-GwTD5HGVU8SntwUOXPRGBDj8z1jhFfXxqSPTioofprCPA__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                    alt="hello"
                    className={styles.category_img}
                  />
                  Brewing
                </div>
                <div className={styles.category}>
                  <img
                    src="https://s3-alpha-sig.figma.com/img/7a23/a3a0/9d4d6d4d5d370c94ec6cb4069a461219?Expires=1646611200&Signature=e1uqutFIUtCOwtr2PJRTDvAHUaW-W5XhYQbvuDnv-iCt5GuiDi0WW2ssTFT-lViGE7XngpcsrIjOQ-Di~~cGuAJzTJjvQbNklsHD1twvsS49scWkkWva38GGSRbhTrWwzHPPzVSgfxngUlo2F9MM-Qwp320pXxMaSbJBoqJAe2uNiTRPY2-n6OTHAH86pp39zgr3iYhwwsf4veEaF1IFdE8~fHAM4QGVWsmFvdNSbIch7QdCiQFFufc~bh-~~aw4OdDX-axyZf2v8i8eZ~SgrZzlb9C5vrzPhuVaED67d9pkRZCTqRoUPTzOf4hRQ~lbYpHwdyqAoLLMd3HrS9AZhg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                    alt="hello"
                    className={styles.category_img}
                  />
                  Blending & Roasting
                </div>
                <div className={styles.category}>
                  <img
                    src="https://s3-alpha-sig.figma.com/img/dd20/6658/623d3e763844eba4f7d61249694807d3?Expires=1646611200&Signature=SOOQO0Pnzm49vco0kB4zytJDBhvhXBSCJHKrloF1gCuAU9el9aLvjFYyvXhtj-QINwHbCwHBO3Jn3SSs-IMZxgKteWlAou-y6HCHBIYhv5G4CkaN66Jd-Vr292E-ziiKGSKlF-enQqnmNdhmOaJQAZU3fa7UF1jUSCOPH0UGUOU0iErxdbOJo96tg9D5CHljaRyIujNrUbuyixXr8e6bVptUax9ZTfJoJZjIEuD-GCwRkCx3Db78HRckQ4eHjjU4C2g749lDQoxGIYdiBAnYa7Eirp6aCVsO9-~6dosv4~-LREXNo18p2s3b6vsS4DD2iiYV5v~f7aXkflyLjAggVg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                    alt="hello"
                    className={styles.category_img}
                  />
                  Sourcing
                </div>
                <div className={styles.category}>
                  <img
                    src="https://s3-alpha-sig.figma.com/img/0441/3219/e996ec5be4ee9490e49807156f491cae?Expires=1646611200&Signature=VsIAa42DXIV3s6ZZWR3JYEUzCQqYcCCANtRDNfDeQwFHlh6WzniA86-bDW1-vr7tgBUINZtkyWCq8HAIDs~05yrVJ1JB4OrqqcVWDTJep0RuFOVptK893uxi8X3tnxI5HjD0zuJivd7p66XLhXbSB4pKvZwKCA4dbRm93MaufxuHE6nFtXTQYK-mp7x9BE2LFGD199t7vqE77f3FPXexNvLtQChTNCzTPHOaiJDAZmu1rNFfFKnw2vTE6fBEgJ8kRdOKrIcOm7Rk9L4DxMuApgAXDun~KMY947dsKJtdc2e4OpyNKDNsNGW1uB6g0i8PS6n4mcJt9pZlQsOWvxjzrQ__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA"
                    alt="hello"
                    className={styles.category_img}
                  />
                  Coffee Pod
                </div>
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
                <p className={styles.tag}>coffeeshop</p>
                <p className={styles.tag}>coffeetime</p>
                <p className={styles.tag}>coffee</p>
                <p className={styles.tag}>pod</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleBlog;
