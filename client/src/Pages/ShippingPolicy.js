import React from "react";

const ShippingPolicy = () => {
  return (
    <>
      <div className="container">
        <div className="row" style={{ height: "60vh" }}>
          <div className="col-lg-8 col-md-12 m-auto">
            <h1 className="mt-4 mb-5 text-center">Shipping Policy</h1>
            <p>
              <style
                type="text/css"
                dangerouslySetInnerHTML={{
                  __html:
                    "\n          p.p1 {\n              margin: 0.0px 0.0px 0.0px 0.0px;\n              text-align: center;\n              font: 22.0px Futura;\n              color: #000000\n          }\n      \n          p.p2 {\n              margin: 0.0px 0.0px 0.0px 0.0px;\n              font: 12.0px Futura;\n              color: #000000;\n              min-height: 15.0px\n          }\n      \n          p.p3 {\n              margin: 0.0px 0.0px 0.0px 0.0px;\n              font: 12.0px Futura;\n              color: #000000\n          }\n      ",
                }}
              />
              <style
                type="text/css"
                dangerouslySetInnerHTML={{
                  __html:
                    "\n          p.p1 {\n              margin: 0.0px 0.0px 5.0px 0.0px;\n              font: 24.0px Futura;\n              color: #000000;\n              background-color: #ffffff\n          }\n      \n          p.p2 {\n              margin: 0.0px 0.0px 5.0px 0.0px;\n              font: 10.5px Futura;\n              color: #000000;\n              background-color: #ffffff\n          }\n      \n          p.p3 {\n              margin: 0.0px 0.0px 5.0px 0.0px;\n              font: 13.5px Futura;\n              color: #000000;\n              background-color: #ffffff\n          }\n      \n          p.p5 {\n              margin: 0.0px 0.0px 0.0px 0.0px;\n              font: 10.5px Futura;\n              color: #000000;\n              background-color: #ffffff\n          }\n      \n          p.p6 {\n              margin: 0.0px 0.0px 0.0px 0.0px;\n              font: 10.5px Futura;\n              color: #000000;\n              min-height: 17.0px\n          }\n      \n          p.p7 {\n              margin: 0.0px 0.0px 0.0px 0.0px;\n              font: 10.5px Futura;\n              color: #000000\n          }\n      \n          li.li4 {\n              margin: 0.0px 0.0px 5.0px 0.0px;\n              font: 10.5px Futura;\n              color: #000000\n          }\n      \n          span.s1 {\n              font: 10.0px Symbol\n          }\n      \n          span.s2 {\n              font: 10.5px 'PingFang SC';\n              background-color: #ffffff\n          }\n      \n          span.s3 {\n              background-color: #ffffff\n          }\n      \n          span.s4 {\n              text-decoration: underline\n          }\n      \n          ul.ul1 {\n              list-style-type: disc\n          }\n      ",
                }}
              />
            </p>
            <p className="p1">
              <strong>SHIPPING &amp; DELIVERY</strong>
            </p>
            <p className="p2">
              We take great care in shipping your products to you, hence we
              partner only with reputed courier companies to deliver your
              orders. Some of our courier partners are
              <span className="Apple-converted-space">&nbsp;&nbsp;</span>FedEx,
              Delhivery, Xpressbees and Ecom
            </p>
            <p className="p3">
              <strong>Processing timeline:&nbsp;</strong>
            </p>
            <p className="p2">
              We usually ship your order the same day or the next business
              day.&nbsp;However, due to covid restrictions, delivery times may
              be longer than usual. After successfully placing your order, you
              will receive a tracking link on&nbsp;the e-mail address provided
              by you.
            </p>
            <p className="p3">
              <strong>Shipping charges:</strong>
            </p>
            <ul className="ul1">
              <li className="li4">
                <span className="s2">₹</span>
                <span className="s3">
                  99 will be charged for orders less than&nbsp;
                </span>
                <span className="s2">₹</span>
                <span className="s3">
                  799.<span className="Apple-converted-space">&nbsp;</span>
                </span>
              </li>
              <li className="li4">
                <span className="s3">
                  Cash on Delivery service is also available for orders up
                  to&nbsp;
                </span>
                <span className="s2">₹</span>
                <span className="s3">5000.</span>
              </li>
            </ul>
            <p className="p5">
              Please note that packages usually get delivered within 3-5
              business days. And you can track your order using the below link:
            </p>
            <p className="p5">
              <span className="s4">
                <strong>Track your order</strong>
              </span>
            </p>
            <p className="p6">
              <br />
            </p>
            <p className="p7">
              <strong>https://www.shiprocket.in/shipment-tracking/</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingPolicy;
