//importing custom components
import DisplayPic from "../Components/Header/DisplayPic.js";
import NewArrival from "../Components/Products/NewArrival.js";
import Brands from "../Components/Products/Brands.js";
import SearchBar from "../Components/Utilities/SearchBar.js";
import YouMayLike from "../Components/Products/YouMayLike.js";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const Root = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      //user exists, redirect to /home
      navigate("/home");
    }
  }, []);
  return (
    <>
      <SearchBar />
      {/* <div className="wrap">
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
          </div>
          <div className="card__slide">
            <div className="back-image" />
          </div>
          <div className="content">
            <div className="content__slide activee">
              
            </div>
            <div className="content__slide">
             
            </div>
            <div className="content__ping content__ping--noanimation" />
          </div>
        </div>
      </div> */}
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

export default Root;
