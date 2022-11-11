import React from "react";
import styles from "./Pages/StaticPage.module.css";
const FallBack = () => {
  return (
    <div className={styles.fallback}>
      <div>
        <img
          className={styles?.fallback_div}
          src="https://res.cloudinary.com/techbuy/image/upload/v1644658063/helllo_po0gga.jpg"
          alt="Cafecart Logo"
        />
      </div>
    </div>
  );
};

export default FallBack;
