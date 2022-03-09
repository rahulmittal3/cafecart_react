import React from "react";
import styles from "./MobileHeader.module.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SearchIcon from "@mui/icons-material/Search";
const MobileHeader = ({ cart, user, wishlist }) => {
  const handleClick = () => {
    document.querySelector(".MHSearch").classList.remove("display");
  };
  return (
    <div className={styles.mobileWrapper}>
      <div className={styles.hamburger}>
        <div className={styles.line1}></div>
        <div className={styles.line2}></div>
        <div className={styles.line3}></div>
      </div>
      <div className={styles.MHImage}>
        <img
          src="https://res.cloudinary.com/techbuy/image/upload/v1644658063/helllo_po0gga.jpg"
          className={styles.logoImg}
          alt="Desktop Logo"
        />
      </div>
      <div className={styles.MHButtons}>
        {/* <div className={styles.MHSearch}>
          <input type="text" className={styles.searchInput} />
          <button className={styles.searchBtn}>
            {" "}
            <SearchIcon sx={{ fontSize: 25 }} />
          </button>
        </div> */}
        <div>
          {" "}
          <SearchIcon
            sx={{ fontSize: 25, marginRight: "20px", cursor: "pointer" }}
            onClick={handleClick}
          />
        </div>

        {user && <AccountCircleOutlinedIcon sx={{ fontSize: 30 }} />}
        {!user && <button className={styles.loginButton}>Login</button>}
      </div>
    </div>
  );
};

export default MobileHeader;
