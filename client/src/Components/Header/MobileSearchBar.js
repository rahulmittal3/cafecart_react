import React from "react";
import styles from "./MobileSearchBar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const MobileSearchBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchHandler = () => {
    if (!key) {
      toast.warning("Please Enter the eyind Items");
      return;
    }
    navigate(`/products/search/${key}`);
    setKey("");
    dispatch({
      type: "MOBILE_SEARCH_VISIBLE",
      payload: false,
    });
  };
  const [key, setKey] = React.useState("");
  return (
    <center>
      <div className={styles.MHSearch}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search for items & brands"
          onChange={(e) => setKey(e.target.value)}
          value={key}
        />
        <button className={styles.searchBtn} onClick={searchHandler}>
          {" "}
          <SearchIcon sx={{ fontSize: 25 }} />
        </button>
      </div>
      <br />
    </center>
  );
};

export default MobileSearchBar;
