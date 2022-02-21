import React from "react";
import styles from "./Profile.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const Profile = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  return (
    <div>
      <div className={styles.outer}>
        {/* <center> */}
        <div className={styles.over1}>
          <AccountBoxIcon sx={{ fontSize: 100 }} />
          <div style={{ paddingLeft: "20px", flex: "1 1 1" }}>
            <div className={styles.over1_2_1}>{user?.name}</div>
            <div className={styles.over1_2_1}>{user.email}</div>
          </div>
        </div>
        {/* </center> */}
      </div>
      <div className={styles.boxOuter}>
        <div className={styles.box} onClick={(e) => navigate("/user/orders")}>
          <div>
            <center>
              <img
                src="https://constant.myntassets.com/mymyntra/assets/img/profile-orders.png"
                alt="imageHere"
              />
            </center>
          </div>
          <div className={styles.title}>Orders</div>
          <div className={styles.description}>Check All Your Orders Here</div>
        </div>

        <div className={styles.box}>
          <div>
            <center>
              <img
                src="https://constant.myntassets.com/mymyntra/assets/img/profile-collections.png"
                alt="imageHere"
              />
            </center>
          </div>
          <div className={styles.title}>Wishlists</div>
          <div className={styles.description}>All your Wishlisted Products</div>
        </div>

        <div
          className={styles.box}
          onClick={(e) => navigate("/user/edit-profile")}
        >
          <div>
            <center>
              <img
                src="https://constant.myntassets.com/mymyntra/assets/img/profile-edit.png"
                alt="imageHere"
              />
            </center>
          </div>
          <div className={styles.title}>Profile Details</div>
          <div className={styles.description}>
            Change Your Profile Details Here
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
