import React, { useEffect } from "react";
import { verifyAdmin } from "../../Axios/Admin.js";
import AdminRedirect from "../../Components/Utilities/AdminRedirect.js";
import { useNavigate, Navigate } from "react-router-dom";
const ProtectRouteAdmin = ({ children }) => {
  const navigate = useNavigate();
  const [jwt, setJwt] = React.useState(null);
  const [ok, setOk] = React.useState(true);
  const getData = () => {
    if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
      setJwt(JSON.parse(window.localStorage.getItem("jwtAdmin")));
      verifyAdmin(JSON.parse(window.localStorage.getItem("jwtAdmin")))
        .then((res) => setOk(true))
        .catch((err) => setOk(false));
    } else {
      setOk(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return <>{!ok ? <Navigate to="/admin/login" /> : children}</>;
};

export default ProtectRouteAdmin;
