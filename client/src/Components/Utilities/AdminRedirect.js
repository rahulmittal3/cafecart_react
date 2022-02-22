import React from "react";
import { useNavigate } from "react-router-dom";
const AdminRedirect = () => {
  const navigate = useNavigate();
  const navigateNow = () => {
    navigate("/admin/login");
  };
  React.useEffect(() => {
    navigateNow();
  }, []);
  return <div>AdminRedirect</div>;
};

export default AdminRedirect;
