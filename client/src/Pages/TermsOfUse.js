import React from "react";
import styles from "./StaticPage.module.css";
import { Helmet } from "react-helmet";
const TermsOfUse = () => {
  React.useEffect(() => {
    document.body.scrollTop = 0;
  }, []);
  return (
    <>
      <>
        <Helmet>
          <title>Cafecart | Terms </title>
        </Helmet>
        <center>
          <div className={styles.wrapper}>
            <div className={styles.title}>
              <u>Terms of Use</u>
            </div>
            <br />
            <br />

            <div style={{ textAlign: "left" }}>
              <span className={styles.text2}>1. USE OF PLATFORM</span>
              <br />
              <br />
              <div className={styles.font} style={{ textAlign: "left" }}>
                The said platform being the website is owned by the company and
                these terms of use govern your use of our site and use of the
                products and services. Do make sure to refer to these terms and
                conditions periodically as they might be amended or updated
                periodically. By use/access of the website you understand that
                you have agreed to contract with the company and to comply
                including the related company obligations. You understand that
                the access/use is available only to persons who can form legally
                binding contracts under the Indian Contracts Act, 1872. Persons
                who are defined as ‘incompetent to contract’ are not eligible to
                access/use of the website. ACCESSING, BROWSING OR USING THE
                WEBSITE IN ANY WAY DIRECTLY INDICATES YOUR AGREEMENT TO THESE
                TERMS AND CONDITIONS.
              </div>
              <br />
              <br />
              {/*  */}
              <span className={styles.text2}>2. PRIVACY</span>
              <br />
              <br />
              <div className={styles.font} style={{ textAlign: "left" }}>
                We understand the importance of safeguarding your information
                and have a specific privacy policy. Do refer to the privacy
                policy as your continued use of the site will directly imply
                your acceptance.
              </div>
              <br />
              <br />
              {/*  */}
              <span className={styles.text2}>3. PRODUCT INFORMATION</span>
              <br />
              <br />
              <div className={styles.font} style={{ textAlign: "left" }}>
                The company tries to be as accurate as possible about the
                product information and descriptions mentioned on the platform.
                The product pictures are indicative and may not match the actual
                product. The results may or may not be exactly identical as
                represented on the website. The company reserves the right to
                correct, change or update information, error or inaccuracies at
                any time without providing prior notice.
              </div>
              <br />
              <br />
              {/*  */}
              <span className={styles.text2}>4. PRICING INFORMATION</span>
              <br />
              <br />
              <div className={styles.font} style={{ textAlign: "left" }}>
                The company strives to provide accurate product and pricing
                information yet, errors may occur. In the event that an item is
                wrongly priced, the company may, at its discretion, contact you.
                PRICES AND AVAILABILITY OF THE PRODUCTS AS DISPLAYED ON THE
                WEBSITE ARE SUBJECT TO CHANGE AT THE COMPANY’S DISCRETION AND
                CAN BE DONE WITHOUT PRIOR NOTICE.
              </div>
              <br />
              <br />
              {/*  */}
              <span className={styles.text2}>5. MODE OF PAYMENT</span>
              <br />
              <br />
              <div className={styles.font} style={{ textAlign: "left" }}>
                For the products available on the site, either of the following
                modes of payment can be opted: <br />
                &emsp;1. Credit cards, Debit cards, Net banking and Wallets{" "}
                <br />
                &emsp;2. Cash on Delivery
              </div>
              <br />
              <br />
              {/*  */}
              <span className={styles.text2}>
                6. CANCELLATIONS, RETURNS AND REFUNDS
              </span>
              <br />
              <br />
              <div className={styles.font} style={{ textAlign: "left" }}>
                Only products that are received in a damaged/defective state or
                are past their expiration date or a wrong product has been
                delivered. Such products will only be accepted when returned in
                original packaging, in an unused and sealed condition. When the
                return is accepted, the customer shall be refunded of the money
                value of the said products. In cases of replacement, it will be
                subject to availability of the products.
              </div>
              <br />
              <br />
              {/*  */}
              <span className={styles.text2}>
                7. GOVERNING LAW AND JURISDICTION
              </span>
              <br />
              <br />
              <div className={styles.font} style={{ textAlign: "left" }}>
                The terms of use as mentioned are in accordance with the
                applicable laws of India. Any dispute arising in interpretation
                or otherwise between the parties shall be referred to an
                independent arbitrator, appointed mutually and his decision
                shall be final. For any disputes that arise related to orders
                outside India, international arbitration rules of Indian
                arbitration and conciliation act 1996 shall apply.
              </div>
              <br />
              <br />
              {/*  */}
              <span className={styles.text2}>8. INDEMNIFICATION</span>
              <br />
              <br />
              <div className={styles.font} style={{ textAlign: "left" }}>
                You agree to indemnify, defend and hold harmless the company and
                its affiliates from and against any losses, damages and
                liabilities including legal fees arising out of violation of
                these terms, use or misuse of access of the website. The company
                reserves the right to employ separate counsel and assume that
                the exclusive defense and control of any matter otherwise is
                subject to indemnification by you.
              </div>
              <br />
              <br />
              {/*  */}
              <span className={styles.text2}>
                9. GRIEVANCE REDRESSAL MECHANISM
              </span>
              <br />
              <br />
              <div className={styles.font} style={{ textAlign: "left" }}>
                Any complaints or concerns with respect to content and/or
                comment of breach of these terms and/or to report any abuse of
                law with regard to the website, can be taken up with our
                Grievance Redressal officer.
              </div>
            </div>
          </div>
        </center>
      </>
    </>
  );
};

export default TermsOfUse;
