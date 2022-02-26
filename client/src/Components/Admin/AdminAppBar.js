import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

export default function AdminAppBar() {
  const navigate = useNavigate();
  const logoutHandler = (e) => {
    if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
      window.localStorage.removeItem("jwtAdmin");
      navigate("/admin/login");
    }
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, fontSize: 30 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            component="div"
            sx={{ flexGrow: 1, fontSize: 20 }}
            onClick={(e) => navigate("/admin")}
          >
            Admin Panel
          </Typography>
          <Button color="inherit" sx={{ fontSize: 20 }} onClick={logoutHandler}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
