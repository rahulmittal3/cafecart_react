import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Footer = () => {
  const { user } = useSelector((state) => ({ ...state }));
  return (
    <footer className="bg3">
      <div className="container">
        <div className="row">
          <div className="col-sm-6 col-lg-3 p-t-20">
            <h4 className="stext-301 cl0 p-b-10 m-l-40">Categories</h4>
            <ul>
              {/* <li class="p-b-10">
      <a href="#" class="stext-107 cl7 hov-cl1 trans-04">  </a>
    </li> */}
              <center>
                <li className="p-b-10">
                  <Link
                    to="/products/category/coffee"
                    className="stext-107 cl7 hov-cl1 trans-04"
                  >
                    Coffees
                  </Link>
                </li>
                <li className="p-b-10">
                  <Link
                    to="/products/category/pods"
                    className="stext-107 cl7 hov-cl1 trans-04"
                  >
                    Pods
                  </Link>
                </li>
                <li className="p-b-10">
                  <Link
                    to="/products/category/machine"
                    className="stext-107 cl7 hov-cl1 trans-04"
                  >
                    Coffee Machines
                  </Link>
                </li>
              </center>
            </ul>
          </div>
          <div className="col-sm-6 col-lg-3 p-t-20">
            <h4 className="stext-301 cl0 p-b-10  m-l-40">Help</h4>
            <ul>
              <li className="p-b-10">
                <Link
                  to={user ? "/home" : "/"}
                  className="stext-107 cl7 hov-cl1 trans-04"
                >
                  {" "}
                  Track Order{" "}
                </Link>
              </li>
              <li className="p-b-10">
                <Link
                  to={user ? "/home" : "/"}
                  className="stext-107 cl7 hov-cl1 trans-04"
                >
                  {" "}
                  Returns{" "}
                </Link>
              </li>
              <li className="p-b-10">
                <Link
                  to="../pages/shipping-policy"
                  className="stext-107 cl7 hov-cl1 trans-04"
                >
                  Shipping
                </Link>
              </li>
              {/* <li class="p-b-10">
      <a href="#" class="stext-107 cl7 hov-cl1 trans-04"> FAQs </a>
    </li> */}
            </ul>
          </div>
          <div className="col-sm-6 col-lg-3 p-t-20">
            <h4 className="stext-301 cl0 p-b-10">GET IN TOUCH</h4>
            <p className="stext-107 cl7 size-201">
              Reach out to us at Bulleshwar, Mumbai or call us on +91 7015060623
            </p>
            <div className="p-t-27">
              <Link
                to={user ? "/home" : "/"}
                className="fs-18 cl7 hov-cl1 trans-04 m-r-16"
              >
                <i className="fa fa-facebook" />
              </Link>
              <Link
                to="https://instagram.com/cafecart.in"
                className="fs-18 cl7 hov-cl1 trans-04 m-r-16"
              >
                <i className="fa fa-instagram" />
              </Link>
              <Link
                to={user ? "/home" : "/"}
                className="fs-18 cl7 hov-cl1 trans-04 m-r-16"
              >
                <i className="fa fa-pinterest-p" />
              </Link>
            </div>
          </div>
          <div className="col-sm-6 col-lg-3 p-t-20">
            <h4 className="stext-301 cl0 p-b-10  m-l-40">Help</h4>
            <ul>
              <li className="p-b-10">
                <Link
                  to="/pages/about-us"
                  className="stext-107 cl7 hov-cl1 trans-04"
                >
                  About Us
                </Link>
              </li>
              {/* <li class="p-b-10">
      <a href="../pages/privacy-policy" class="stext-107 cl7 hov-cl1 trans-04"> Disclaimer </a>
    </li> */}
              <li className="p-b-10">
                <Link
                  to="/pages/terms-of-use"
                  className="stext-107 cl7 hov-cl1 trans-04"
                >
                  Terms And Conditions
                </Link>
              </li>
              <li className="p-b-10">
                <Link
                  to="/pages/privacy-policy"
                  className="stext-107 cl7 hov-cl1 trans-04"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          {/* <div class="col-sm-6 col-lg-3 p-t-20">
  <h4 class="stext-301 cl0 p-b-10">Newsletter</h4>

  <form>
    <div class="wrap-input1 w-full p-b-4">
      <input
        class="input1 bg-none plh1 stext-107 cl7"
        type="text"
        name="email"
        placeholder="email@example.com"
      />
      <div class="focus-input1 trans-04"></div>
    </div>

    <div class="p-t-18">
      <button
        class="
          flex-c-m
          stext-101
          cl0
          size-103
          bg1
          bor1
          hov-btn2
          p-lr-15
          trans-04
        "
      >
        Subscribe
      </button>
    </div>
  </form>
</div> */}
        </div>
        <div>
          <div className="flex-c-m flex-w p-b-18">
            <Link to="#" className="m-all-1">
              <img src="/images/icons/icon-pay-01.png" alt="ICON-PAY" />
            </Link>
            <Link to="#" className="m-all-1">
              <img src="/images/icons/icon-pay-02.png" alt="ICON-PAY" />
            </Link>
            <Link to="#" className="m-all-1">
              <img src="/images/icons/icon-pay-03.png" alt="ICON-PAY" />
            </Link>
            <Link to="#" className="m-all-1">
              <img src="/images/icons/icon-pay-04.png" alt="ICON-PAY" />
            </Link>
            <Link to="#" className="m-all-1">
              <img src="/images/icons/icon-pay-05.png" alt="ICON-PAY" />
            </Link>
          </div>
          <p className="stext-107 cl6 txt-center">
            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
            Copyright ©
            {/* All rights reserved | This Website is made with
  <i class="fa fa-heart-o" aria-hidden="true"></i> by
  <a href="https://Cafecart.in" target="_blank" style="color: #888888;">Cafecart</a> */}
            {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
