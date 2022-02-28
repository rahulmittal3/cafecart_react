import React from "react";
import styles from "./EditProfile.module.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import * as All from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { updatePassword } from "../../Axios/Authentication.js";
import { toast } from "react-toastify";
import fancy from "../../Components/Header/Header.module.css";
const EditProfile = () => {
  const [on, setOn] = React.useState(false);
  const [fp, setfp] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const { user } = useSelector((state) => ({ ...state }));
  const handleFp = (e) => {
    console.log(user);
    e.preventDefault();
    if (!fp.previous || !fp.current || !fp.currentVerified) {
      toast.error("Please Fill in All the Details Carefully!");
      return;
    }
    setLoading(true);
    //otherwise, proceed to submit the form...
    const randomString = user?.jwt ? user.jwt : "randomString";
    updatePassword(randomString, fp)
      .then((res) => {
        toast.success("Password Changed Successfully");
        setfp({});
        setLoading(false);
        setOn(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err.response.data);
      });
  };
  return (
    <>
      <All.Modal open={on} onClose={(e) => setOn(false)} center>
        <div className={fancy.FPBackground}>
          <h2 className={fancy.FPHead}>Change Password</h2>
          <form onSubmit={handleFp}>
            <input
              type="password"
              className={fancy.FPInput}
              placeholder="Current Password"
              onChange={(e) => setfp({ ...fp, previous: e.target.value })}
              value={fp?.previous}
            />
            <input
              type="password"
              className={fancy.FPInput}
              placeholder="New Password"
              onChange={(e) => setfp({ ...fp, current: e.target.value })}
              value={fp?.current}
            />
            <input
              type="text"
              className={fancy.FPInput}
              placeholder="Confirm Password"
              onChange={(e) =>
                setfp({ ...fp, currentVerified: e.target.value })
              }
              value={fp?.currentVerified}
            />

            <label className={fancy.FPLabel}>
              * Passwords are Case-Sensitive
            </label>
            <center>
              <input
                type="submit"
                className={fancy.FPSubmit}
                value={loading ? "Please Wait..." : "Change Password"}
              />
            </center>
          </form>
        </div>
      </All.Modal>
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
              <button
                className={styles.changePasswordBtn}
                onClick={(e) => setOn(true)}
              >
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
    </>
  );
};

export default EditProfile;
