import React from "react";
import styles from "./Checkout.module.css";
import { RadioGroup, RadioButton } from "react-radio-buttons";
import { Radio } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { getFromCart } from "../../Axios/Cart.js";
import { createPayment } from "../../Axios/Payment.js";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, wishlist, cart, directCheckout } = useSelector((state) => ({
    ...state,
  }));
  const [fname, setFname] = React.useState("");
  const [lname, setLname] = React.useState("");
  const [email, setEmail] = React.useState(user?.email);
  const [city, setCity] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [address2, setAddress2] = React.useState("");
  const [pin, setPin] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [state, setState] = React.useState("Bihar");
  const [method, setMethod] = React.useState("cod");
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const getData = () => {
    getFromCart(user?.id, user?.token)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getData();
  }, []);
  const orderHandler = () => {
    setLoading(true);
    const object = {
      email: email,
      fname: fname,
      lname: lname,
      city: city,
      address: address,
      address2: address2,
      pin: pin,
      phone: phone,
      state: state,
      method: method,
      user: user?.id,
    };
    createPayment(object)
      .then((res) => {
        toast.success("Order has been placed successfuly");
        //clear all the cluttering
        window.localStorage.setItem("cartLS", JSON.stringify([]));
        dispatch({
          type: "CART",
          payload: [],
        });
        navigate("/user/orders");
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        toast.error(err);
      });
  };
  return (
    <div className={styles.checkoutWrapper}>
      <div className={styles.checkoutAddress}>
        <div className={styles.checkoutAddress_title}>Delivery Address</div>
        <div className={styles.checkout_email}>
          <input
            type="email"
            className={styles.checkout_email_input}
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="x-field-1"
            autocomplete="new-field-1"
          />
        </div>
        <div className={styles.checkout_names}>
          <input
            type="text"
            className={styles.checkout_name_input}
            placeholder="First Name"
            value={fname}
            onChange={(e) => setFname(e.target.value)}
            name="x-field-1"
            autocomplete="new-field-1"
          />
          <input
            type="text"
            className={styles.checkout_name_input}
            placeholder="Last Name"
            value={lname}
            onChange={(e) => setLname(e.target.value)}
            name="x-field-1"
            autocomplete="new-field-1"
          />
        </div>
        <div className={styles.checkout_email}>
          <input
            type="text"
            className={styles.checkout_email_input}
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            name="x-field-1"
            autocomplete="new-field-1"
          />
        </div>
        <div className={styles.checkout_names} style={{ margin: "20px 0px" }}>
          <input
            type="text"
            className={styles.checkout_name_input}
            placeholder="Apartment/ Suite (Optional)"
            value={address2}
            onChange={(e) => setAddress2(e.target.value)}
            name="x-field-1"
            autocomplete="new-field-1"
          />
          <input
            type="text"
            className={styles.checkout_name_input}
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            name="x-field-1"
            autocomplete="new-field-1"
          />
        </div>
        <div className={styles.checkout_names}>
          <select
            value={state}
            className={styles.checkout_names}
            onChange={(e) => setState(e.target.value)}
          >
            <option value="Andhra Pradesh">Andhra Pradesh</option>
            <option value="Andaman and Nicobar Islands">
              Andaman and Nicobar Islands
            </option>
            <option value="Arunachal Pradesh">Arunachal Pradesh</option>
            <option value="Assam">Assam</option>
            <option value="Bihar">Bihar</option>
            <option value="Chandigarh">Chandigarh</option>
            <option value="Chhattisgarh">Chhattisgarh</option>
            <option value="Dadar and Nagar Haveli">
              Dadar and Nagar Haveli
            </option>
            <option value="Daman and Diu">Daman and Diu</option>
            <option value="Delhi">Delhi</option>
            <option value="Lakshadweep">Lakshadweep</option>
            <option value="Puducherry">Puducherry</option>
            <option value="Goa">Goa</option>
            <option value="Gujarat">Gujarat</option>
            <option value="Haryana">Haryana</option>
            <option value="Himachal Pradesh">Himachal Pradesh</option>
            <option value="Jammu and Kashmir">Jammu and Kashmir</option>
            <option value="Jharkhand">Jharkhand</option>
            <option value="Karnataka">Karnataka</option>
            <option value="Kerala">Kerala</option>
            <option value="Madhya Pradesh">Madhya Pradesh</option>
            <option value="Maharashtra">Maharashtra</option>
            <option value="Manipur">Manipur</option>
            <option value="Meghalaya">Meghalaya</option>
            <option value="Mizoram">Mizoram</option>
            <option value="Nagaland">Nagaland</option>
            <option value="Odisha">Odisha</option>
            <option value="Punjab">Punjab</option>
            <option value="Rajasthan">Rajasthan</option>
            <option value="Sikkim">Sikkim</option>
            <option value="Tamil Nadu">Tamil Nadu</option>
            <option value="Telangana">Telangana</option>
            <option value="Tripura">Tripura</option>
            <option value="Uttar Pradesh">Uttar Pradesh</option>
            <option value="Uttarakhand">Uttarakhand</option>
            <option value="West Bengal">West Bengal</option>
          </select>

          <input
            type="number"
            className={styles.checkout_name_input}
            placeholder="PIN Code"
            style={{ margin: "0" }}
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            name="x-field-1"
            autocomplete="new-field-1"
          />
        </div>
        <div className={styles.checkout_names} style={{ margin: "20px 0px" }}>
          <input
            type="text"
            className={styles.checkout_name_input}
            placeholder="Country"
            value="India"
            disabled={true}
          />
          <input
            type="number"
            className={styles.checkout_name_input}
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="x-field-1"
            autocomplete="new-field-1"
          />
        </div>
        <div className={styles.options}>
          <Radio.Group
            value={method}
            defaultValue={method}
            buttonStyle="solid"
            onChange={(e) => setMethod(e.target.value)}
          >
            <Radio.Button value="cod">Pay On Delivery</Radio.Button>
            <Radio.Button value="pay" disabled={true}>
              UPI / Debit card / Credit card
            </Radio.Button>
          </Radio.Group>
        </div>
      </div>

      <div className={styles.items}>
        {data &&
          data?.items?.length > 0 &&
          data?.items.map((curr, index) => {
            return (
              <div className={styles.item} key={index}>
                <div className={styles.imgLogo}>
                  <img src={curr?.productId?.imagePath[0]} alt="imae" />
                </div>
                <div className={styles.meta}>
                  <div className={styles.title}>{curr?.productId?.title}</div>
                  <div className={styles.price}>₹{curr?.productId?.price}</div>
                </div>
              </div>
            );
          })}

        {directCheckout === true && (
          <>
            <div className={styles.coupon}>Check Coupon</div>
            <div className={styles.couponInput}>
              <input type="text" className={styles.couponInpt} />
              <button>Check</button>
            </div>
          </>
        )}
        <div className={styles.qa}>
          <div className={styles.ask}>Sub Total</div>
          <div className={styles.answer}>₹{data?.total}</div>
        </div>
        <div className={styles.qa}>
          <div className={styles.ask}>Shipping Charges</div>
          <div className={styles.answer}>+₹{data?.shipping}</div>
        </div>
        <div className={styles.qa}>
          <div className={styles.ask}>Discount</div>
          <div className={styles.answer}>-₹{data?.discountApplied}</div>
        </div>
        <hr />
        <br />
        <div className={styles.qa}>
          <div className={styles.ask}>Total</div>
          <div className={styles.answer}>
            ₹{data?.finalAmount + data?.shipping}
          </div>
        </div>
        <div className={styles.btn}>
          <button
            className={styles.answerFinal}
            onClick={orderHandler}
            disabled={
              !address ||
              !address2 ||
              !city ||
              !email ||
              !fname ||
              !method ||
              !phone ||
              phone.length !== 10 ||
              !pin ||
              !state ||
              !user ||
              loading
            }
          >
            {loading ? "Please Wait...." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
