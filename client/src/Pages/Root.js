//importing custom components
import Canvas from "../Components/Products/Canvas.js";
import YouMayLike from "../Components/Products/YouMayLike.js";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
const Root = ({ show, setShow }) => {
  useEffect(() => {
    document.body.scrollTop = 0;
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (window.localStorage.getItem("user")) {
      //user exists, redirect to /home
      navigate("/home");
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Cafecart</title>
      </Helmet>
      <Canvas show={show} setShow={setShow} />
    </>
  );
};

export default Root;
