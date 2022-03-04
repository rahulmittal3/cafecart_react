import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import styles from "./Footer.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const Footer = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const navigate = useNavigate();
  return (
    <div className={styles.wrapper}>
      <div className={styles.footerItem}>
        <center>
          <div className={styles.footerItemHead}>Categories</div>
          <div className={styles.footerItemContents}>
            <div
              className={styles.footerItemContent}
              style={{ cursor: "pointer" }}
              onClick={(e) => navigate("/products/category/coffee")}
            >
              Coffee
            </div>
            <div
              className={styles.footerItemContent}
              style={{ cursor: "pointer" }}
              onClick={(e) => navigate("/products/category/pods")}
            >
              Pods
            </div>
            <div
              className={styles.footerItemContent}
              style={{ cursor: "pointer" }}
              onClick={(e) => navigate("/products/category/machine")}
            >
              Coffee Machines
            </div>
          </div>
        </center>
      </div>
      <div className={styles.footerItem}>
        <center>
          <div className={styles.footerItemHead}>Help</div>
          <div className={styles.footerItemContents}>
            <div
              className={styles.footerItemContent}
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                navigate("#");
              }}
            >
              Track Order
            </div>
            <div
              className={styles.footerItemContent}
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                navigate("#");
              }}
            >
              Returns
            </div>
            <div
              className={styles.footerItemContent}
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                navigate("#");
              }}
            >
              Shipping
            </div>
          </div>
        </center>
      </div>
      <div className={styles.footerItem}>
        <center>
          <div className={styles.footerItemHead}>Get in Touch</div>
          <div className={styles.footerItemContents}>
            <div className={styles.footerItemContent}>
              Reach out to us at Bulleshwar,<br></br> Mumbai or call us on{" "}
              <br />
              +91 7015060623
            </div>
            <div className={styles.footerItemContact}>
              <span className={styles.footerItemMenu}>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.facebook.com/cafecart.in"
                >
                  <FacebookIcon
                    sx={{ fontSize: 30 }}
                    style={{ cursor: "pointer", color: "white" }}
                  />
                </a>
              </span>
              <span className={styles.footerItemMenu}>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.instagram.com/cafecart.in/"
                >
                  <InstagramIcon
                    sx={{ fontSize: 30 }}
                    style={{ cursor: "pointer", color: "white" }}
                  />
                </a>
              </span>
              <span className={styles.footerItemMenu}>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://in.pinterest.com/cafecart/"
                >
                  <PinterestIcon
                    sx={{ fontSize: 30 }}
                    style={{ cursor: "pointer", color: "white" }}
                  />
                </a>
              </span>
              <span className={styles.footerItemMenu}>
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://www.linkedin.com/company/cafecart-in"
                >
                  <LinkedInIcon
                    sx={{ fontSize: 30 }}
                    style={{ cursor: "pointer", color: "white" }}
                  />
                </a>
              </span>
            </div>
          </div>
        </center>
      </div>
      <div className={styles.footerItem}>
        <center>
          <div className={styles.footerItemHead}>Other</div>
          <div className={styles.footerItemContents}>
            <div
              className={styles.footerItemContent}
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                navigate("/pages/about-us");
              }}
            >
              About Us
            </div>
            <div
              className={styles.footerItemContent}
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                navigate("/pages/terms-of-use");
              }}
            >
              Terms and Conditions
            </div>
            <div
              className={styles.footerItemContent}
              style={{ cursor: "pointer" }}
              onClick={(e) => {
                navigate("/pages/privacy-policy");
              }}
            >
              Privacy Policy
            </div>
          </div>
        </center>
      </div>
    </div>
  );
};

export default Footer;
