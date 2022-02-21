import React from "react";
import styles from "./EditProfile.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
const EditProfile = () => {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <div className={styles.outer}>
      <div className={styles.heading}>Welcome Back, {user?.name}</div>
      <div className={styles.formOuter}>
        <div className={styles.formOuterHeading}>
          Edit Profile <EditIcon sx={{ fontSize: 30 }} />
        </div>
        <div>
          <div className={styles.userId}>
            <span className={styles.info}>User Id :</span>{" "}
            <span className={styles.detail}>{user?.id}</span>
          </div>
          <hr />
          <div className={styles.name}>
            <span className={styles.info}>Name : </span>{" "}
            <span className={styles.detail}>{user?.name}</span>
          </div>
          <div className={styles.mail}>
            <span className={styles.info}>Email : </span>{" "}
            <span className={styles.detail}>{user?.email}</span>
          </div>
          <div className={styles.phone}>
            <span className={styles.info}> Phone : </span>{" "}
            <span className={styles.detail}>
              {user?.contactVerified ? (
                <>
                  <DoneAllIcon sx={{ fontSize: 22, color: "#00af00" }} />{" "}
                  <span style={{ fontSize: "22px", color: "#00af00" }}>
                    Contact Verified
                  </span>
                </>
              ) : (
                <span className={styles.detail}>
                  Not Added Yet{" "}
                  <button className={styles.addPhone}>
                    Add a Phone Number
                  </button>
                </span>
              )}
            </span>
          </div>
          <br />
          <hr />
          <div className={styles.changePassword}>
            <button className={styles.changePasswordBtn}>
              Change Password
            </button>
          </div>
          <div className={styles.redirect}>
            <Link to="/user/profile">
              {" "}
              <KeyboardBackspaceIcon /> &emsp; Go back to Profile
            </Link>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
