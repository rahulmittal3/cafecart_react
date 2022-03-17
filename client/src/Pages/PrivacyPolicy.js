import React from "react";
import styles from "./StaticPage.module.css";
import { Steps } from "antd";
const { Step } = Steps;
const PrivacyPolicy = () => {
  React.useEffect(() => {
    document.body.scrollTop = 0;
  }, []);
  return (
    <>
      <center>
        <div className={styles.wrapper}>
          <div className={styles.title}>
            <u>Privacy Policy</u>
          </div>
          <br />
          <br />
          <div className={styles.font}>
            We, at www.cafecart.in, treat our customer's privacy with absolute
            importance and care and are pledged to protect all our customers'
            privacy. Therefore, we gather and use information throughout our
            website only as published in this Privacy Policy and do not sell or
            rent personal information to any outside institution. This policy
            applies solely to the information collected on our website and not
            to any other website that might be linked to us.
          </div>
          <br />
          <div className={styles.font}>
            It should be noted that our privacy policy is subject to change
            without notice. You should check this page from time to time to
            update yourself of any change in our privacy policy.
          </div>
          <br />
          <br />
          <div style={{ textAlign: "left" }}>
            <span className={styles.text2}>INFORMATION WE COLLECT: </span>
            <br />
            <br />
            <div className={styles.font} style={{ textAlign: "left" }}>
              We may collect and process the following information :
            </div>
            <br />
            <div className={styles.font} style={{ textAlign: "left" }}>
              Personal information that you provide by filling out forms on our
              website, which may include:
            </div>
            <div className={styles.text1} style={{ textAlign: "left" }}>
              <ul>
                <li className={styles.smaller}>⚫&nbsp;Your Name</li>
                <li className={styles.smaller}>⚫&nbsp;Your Billing Address</li>
                <li className={styles.smaller}>⚫&nbsp;Shipping Address</li>
                <li className={styles.smaller}>⚫&nbsp;Phone Number</li>
                <li className={styles.smaller}>⚫&nbsp;E-mail Address</li>
              </ul>
            </div>
            /
            <div className={styles.font}>
              Details of transactions that you carry out on our website. We may
              gather data about your computer, including your IP address,
              operating system and browser type, for our services and
              advertisers. This is statistical and aggregate data about your
              browsing actions and patterns and does not identify any individual
              personally.
            </div>
            <br />
            <span className={styles.text2}>USE OF INFORMATION PROVIDED </span>
            <br />
            <br />
            <div className={styles.font} style={{ textAlign: "left" }}>
              We use your information only for the following purposes:
            </div>
            <br />
            <div className={styles.text1} style={{ textAlign: "left" }}>
              <ul>
                <li className={styles.smaller}>
                  ⚫&nbsp;For Shipping and Billing Purpose
                </li>
                <li className={styles.smaller}>
                  ⚫&nbsp;Processing your orders
                </li>
                <li className={styles.smaller}>
                  ⚫&nbsp;Informing you of product updates
                </li>
              </ul>
            </div>
            <br />
            <br />
            <span className={styles.text2}>
              SHARING OF INFORMATION COLLECTED
            </span>
            <br />
            <br />
            <div className={styles.font} style={{ textAlign: "left" }}>
              We use your information only for the following purposes:
            </div>
            <br />
            <div className={styles.text1} style={{ textAlign: "left" }}>
              <ul>
                <li className={styles.smaller}>
                  ⚫&nbsp;When it is required by law or when needed for the
                  protection of our rights or property.
                </li>
                <li className={styles.smaller}>
                  ⚫&nbsp;When necessary to complete a transaction as requested
                  by you.
                </li>
                <li className={styles.smaller}>
                  ⚫&nbsp;With companies that provide services to us for
                  transacting your orders. While we make efforts to accommodate
                  requests to restrict our use of your information, we reserve
                  the right to delete all or any portion of customer information
                  if we cannot reasonably accommodate a requested restriction.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </center>
    </>
  );
};

export default PrivacyPolicy;
