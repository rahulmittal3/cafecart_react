import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingToRedirect from "./LoadingToRedirect.js";
import { currentUser } from "../../Axios/Authentication.js";
const ProtectRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //------------------------------------------------
  const verifyUser = async (token, email) => {
    try {
      const result = await currentUser(token, email);
    } catch (error) {
      dispatch({
        type: "USER_CHANGED",
        payload: null,
      });
      navigate("/");
    }
  };
  const [user1, setUser1] = useState(null);
  useEffect(() => {
    let x = undefined;
    if (window !== "undefined" && window.localStorage.getItem("user")) {
      setUser1(JSON.parse(window.localStorage.getItem("user")));
      x = JSON.parse(window.localStorage.getItem("user"));
      verifyUser(x.jwt, x.id);
    }
    if (x) {
      dispatch({
        type: "USER_CHANGED",
        payload: x,
      });
    }
  }, []);
  const { user } = useSelector((state) => ({ ...state }));
  return <>{user ? children : <LoadingToRedirect />}</>;
};

export default ProtectRoute;
