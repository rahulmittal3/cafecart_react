//importing custom components
import DisplayPic from "../Components/Header/DisplayPic.js";
import NewArrival from "../Components/Products/NewArrival.js";
import Brands from "../Components/Products/Brands.js";
import SearchBar from "../Components/Utilities/SearchBar.js";
import YouMayLike from "../Components/Products/YouMayLike.js";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (window.localStorage.getItem("user") === null) {
      //user exists, redirect to /home
      navigate("/");
    }
  }, []);
  return (
    <>
      <SearchBar />
      <div className="wrap">
        <div className="back">
          <div className="back__slide activee">
            <div className="progress" />
          </div>
          <div className="back__slide">
            <div className="progress" />
          </div>
        </div>
        <div className="card">
          <div className="card__slide activee">
            {/* <span class="number">01</span> */}
          </div>
          <div className="card__slide">
            <div className="back-image" />
            {/* <span class="number">02</span> */}
          </div>
          <div className="content">
            <div className="content__slide activee">
              {/* <h2 class="title"> <span class="title__line"> <span class="title__inner">Mesmerizing</span></span><span class="title__line"> <span class="title__inner">Depths</span></span></h2>
         <p class="desc">Nunc orci metus, ornare non molestie ac, ultrices eget <br/> dolor. Mauris ac mattis lectus. Praesent facilisis <br/> malesuada sapien nec pharetra. Fusce eleifend, nisl.</p> */}
              {/* <div class="button-wrap"><a class="button">Learn More<span class="button__hover"></span></a></div> */}
            </div>
            <div className="content__slide">
              {/* <h2 class="title"> <span class="title__line"> <span class="title__inner">Breathtaking</span></span><span class="title__line"> <span class="title__inner">Heights</span></span></h2>
         <p class="desc">Nunc orci metus, ornare non molestie ac, ultrices eget  <br/> dolor. Mauris ac mattis lectus. Praesent facilisis  <br/> malesuada sapien nec pharetra. Fusce eleifend, nisl.</p> */}
              {/* <div class="button-wrap"><a class="button">Learn More<span class="button__hover"></span></a></div> */}
            </div>
            <div className="content__ping content__ping--noanimation" />
          </div>
        </div>
      </div>
      <section className="bg0 " style={{ backgroundColor: "#fff" }}>
        <div className="container">
          <NewArrival />
          <Brands />
          <YouMayLike />
        </div>
      </section>
    </>
  );
};

export default Home;
