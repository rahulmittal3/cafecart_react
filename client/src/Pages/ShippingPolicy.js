import React from "react";
import styles from "./StaticPage.module.css";
import { Steps } from "antd";

const { Step } = Steps;
const ShippingPolicy = () => {
  React.useEffect(() => {
    document.body.scrollTop = 0;
  }, []);
  return (
    <center>
      <div className={styles.wrapper}>
        <div className={styles.title}>SHIPPING & DELIVERY</div>
        <br />
        <br />
        <div className={styles.text1}>
          We take great care in shipping your products to you, hence we partner
          only with reputed courier companies to deliver your orders. Some our
          our courier partners are FedEx, Delhivery, Xpressbees and Ecom
        </div>
        <br />
        <br />
        <Steps
          progressDot
          current={3}
          direction="vertical"
          className={styles.steps}
          responsive={true}
        >
          <Step
            title={<span className={styles.text2}>Processing Timeline</span>}
            description={
              <span className={styles.text3}>
                We usually ship your order the same day or the next busine day.
                day. However, due to covid restrictions, delivery timeb longer
                longer than usual. After successfully placing your o you will
                will receive a tracking link on the e-mail address prov i ded by
                you.
              </span>
            }
          />
          <Step
            title={<span className={styles.text2}>Shipping Charges</span>}
            description={
              <span className={styles.text3}>
                ₹50 will be charged for orders less than ₹500. Cash on Deli that
                service is also available for orders up to ₹5000. Please note
                that packages usually get delivered within 3-5 business days
              </span>
            }
          />
          <Step
            title={<span className={styles.text2}>Track Your Order</span>}
            description={
              <span className={styles.text3}>
                <a
                  href="https://www.shiprocket.in/shipment-tracking/"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://www.shiprocket.in/shipment-tracking/
                </a>
              </span>
            }
          />
        </Steps>
      </div>
    </center>
  );
};

export default ShippingPolicy;
