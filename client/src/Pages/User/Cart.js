import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Cart.module.css";
import { cartDetails, addToCartDB } from "../../Axios/Cart.js";
import { checkCoupon } from "../../Axios/Coupon.js";
import { toast } from "react-toastify";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let userLS = null;
  if (window !== "undefined" && window.localStorage.getItem("user"))
    userLS = JSON.parse(window.localStorage.getItem("user"));
  let cartLS = [];
  if (window !== "undefined" && window.localStorage.getItem("cart"))
    cartLS = JSON.parse(window.localStorage.getItem("cart"));
  const fixCart = () => {
    console.log(cartLS);
    dispatch({
      type: "CART",
      payload: cartLS,
    });
  };
  const fixUser = () => {
    dispatch({
      type: "USER_CHANGED",
      payload: userLS,
    });
  };
  React.useEffect(() => {
    fixUser();
    fixCart();
  }, []);
  const { user, cart } = useSelector((state) => ({ ...state }));
  const [data, setData] = React.useState([]);

  //GET THE DATA FROM THE API AGAIN..
  const getData = () => {
    cartDetails(cartLS)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getData();
  }, []);
  let cartDisplay = [];
  let total = 0;
  for (let j = 0; j < data.length; j++) {
    let p = data[j];
    let obj = {
      ...p._doc,
      quantity: p?.quantity,
    };
    total += p.quantity * p._doc.price;
    cartDisplay.push(obj);
  }

  const [coupon, setCoupon] = React.useState("");
  const [loading, setloading] = React.useState(false);
  const [discount, setDiscount] = React.useState(0);
  const handleCoupon = () => {
    console.log("Coupon is Applied", coupon);
    setloading(true);
    checkCoupon(coupon)
      .then((res) => {
        if (total < res?.data?.minimumCartAmount) {
          toast.error(
            `You need items worth ₹${res?.data?.minimumCartAmount} for this Coupon! Shop More 🛍️`
          );
          setloading(false);
          return;
        }
        toast.success("Coupon has been applied Succesfully! 🎉");
        setloading(false);
        const discountPercentageNumber = (res.data.pricedrop / 100.0) * total;
        setDiscount(
          discountPercentageNumber < res.data.maxAmount
            ? discountPercentageNumber.toFixed(0)
            : res.data.maxAmount
        );
      })
      .catch((err) => {
        toast.error(err?.response?.data);
        setloading(false);
        setDiscount(0);
      });
  };
  let allowCheckout = true;
  const handleBtn = (bool) => {
    allowCheckout = allowCheckout & bool;
  };
  const finalPrice = total - discount;
  const checkoutObject = {
    user: user,
    items: cartLS,
    total: total,
    discountApplied: discount,
    finalAmount: finalPrice,
  };
  console.log(checkoutObject);
  const goToCheckout = (e) => {
    //if loggedin, then fine...
    if (!user) {
      toast.error("Please Login to Complete your Shopping !");
    } else {
      console.log(checkoutObject);
      addToCartDB(checkoutObject)
        .then((res) => {
          navigate("/checkout");
        })
        .catch((err) => console.log(err));
    }
  };
  const handleIncrement = (id) => {
    console.log(cartLS);
    for (let i = 0; i < cartLS.length; i++) {
      if (cartLS[i].productId === id) {
        //match found, increment the quantity.
        let qty = cartLS[i].quantity;
        qty = qty + 1;
        cartLS[i] = { ...cartLS[i], quantity: qty };
        window.localStorage.setItem("cart", JSON.stringify(cartLS));
        dispatch({
          type: "CART",
          payload: cartLS,
        });
        getData();
        return;
      }
    }
  };
  const handleDecrement = (id) => {
    for (let i = 0; i < cartLS.length; i++) {
      if (cartLS[i].productId === id) {
        //match found, increment the quantity.
        let qty = cartLS[i].quantity;
        if (qty === 1) {
          //then just remove it frim array
          cartLS.splice(i, 1);
          window.localStorage.setItem("cart", JSON.stringify(cartLS));
          dispatch({
            type: "CART",
            payload: cartLS,
          });
          getData();
          return;
        } else {
          qty = qty - 1;
          cartLS[i] = { ...cartLS[i], quantity: qty };
          window.localStorage.setItem("cart", JSON.stringify(cartLS));
          dispatch({
            type: "CART",
            payload: cartLS,
          });
          getData();
          return;
        }
      }
    }
  };

  const deleteItemAll = (id) => {
    for (let i = 0; i < cartLS.length; i++) {
      if (cartLS[i].productId === id) {
        cartLS.splice(i, 1);
        window.localStorage.setItem("cart", JSON.stringify(cartLS));
        dispatch({
          type: "CART",
          payload: cartLS,
        });
        getData();
        return;
      }
    }
  };
  return (
    <>
      <div className="wrapcart" id>
        <header className="cart-header cf">
          <strong>Items in Your Cart</strong>
        </header>

        <div className="cart-table">
          <ul id="cart-items-shoppingcart">
            {cartDisplay &&
              cartDisplay.length > 0 &&
              cartDisplay.map((curr, index) => {
                return (
                  <li className="cartitem" key={index}>
                    <div className="cartitem-main cf">
                      <div className="cartitem-block ib-info cf">
                        {/* <a href="/products/<%=product.category.slug%>/<%=product._id%>"> */}
                        <img
                          className="product-img"
                          src={curr.imagePath}
                          alt="pimage"
                        />
                        {/* </a> */}
                        <div className="ib-info-meta">
                          <span className="title"> {curr.title} </span>
                          <span className="styles">
                            <span>
                              <strong>Name</strong>
                              &nbsp;:&nbsp;
                              {curr.title}
                            </span>
                            <span>
                              <strong>Product No</strong>
                              &nbsp;:&nbsp;
                              {curr.productCode}
                            </span>
                            <span>
                              <strong>Manufacturer</strong>&nbsp;:&nbsp;
                              {curr.manufacturer}
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="cartitem-block ib-qty">
                        <i
                          className="fa fa-plus"
                          onClick={(e) => handleIncrement(curr._id)}
                        />
                        <input
                          type="text"
                          value={curr.quantity}
                          className="qty"
                          id="numitem"
                          readonly
                        />
                        <i
                          className="fa fa-minus"
                          onClick={(e) => handleDecrement(curr._id)}
                        ></i>
                        <span
                          className="price"
                          style={{
                            paddingTop: "0px",
                            paddingRight: "10px",
                            paddingLeft: "-10px",
                          }}
                        >
                          <span>x</span> ₹{curr.price}
                        </span>
                      </div>
                      <div className="cartitem-block ib-total-price">
                        <span className="tp-price">
                          = ₹{curr.price * curr.quantity}
                        </span>
                        <span className="tp-remove">
                          <i className="i-cancel-circle" />
                        </span>
                      </div>
                    </div>
                    <div className="cartitem-foot cf">
                      <div className="if-message">
                        <p>
                          *minimum cash on delivery amount for this product : ₹
                          {curr.codprepaid}
                        </p>
                      </div>
                      <div className="if-left">
                        {curr.available && (
                          <span
                            className="if-status"
                            style={{ color: "green" }}
                          >
                            In stock
                            {handleBtn(true)}
                          </span>
                        )}
                        {!curr.available && (
                          <span className="if-status" style={{ color: "red" }}>
                            Out of stock
                            {handleBtn(false)}
                          </span>
                        )}
                      </div>
                      <div className="if-right">
                        <div
                          className="blue-link js-addwish-detail tooltip100"
                          //onclick="addwishlist(`<%=product._id%>`)"
                          data-tooltip="Add to Wishlist"
                          id={`love${curr._id}`}
                        >
                          Add to Wishlist
                        </div>
                      </div>
                      <div className="if-right">
                        <div
                          className="blue-link js-addwish-detail tooltip100"
                          //onclick="addwishlist(`<%=product._id%>`)"
                          data-tooltip="Remove this Item from Cart"
                          style={{ marginRight: "10px", color: "red" }}
                          onClick={(e) => deleteItemAll(curr._id)}
                        >
                          DELETE
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            {cartDisplay && cartDisplay.length === 0 && (
              <div>
                <li style={{ textAlign: "center" }}>
                  <h1 style={{ lineHeight: "50vh" }}>Your Cart is empty</h1>
                </li>
                <a href="/">
                  <span className="blue-link" style={{ fontSize: 14 }}>
                    <i className="fa fa-angle-left" /> Continue Shopping
                  </span>
                </a>
              </div>
            )}
          </ul>
        </div>
        <center>
          <ClipLoader loading={loading} size={150} />
        </center>
        {cartDisplay && cartDisplay.length > 0 && (
          <>
            <div className="sub-table cf">
              <div className="summary-block">
                <div className="sb-promo">
                  <input
                    type="text"
                    id="couponcode"
                    name="couponcode"
                    placeholder="Enter Promo Code"
                    className={styles.couponInput}
                    onChange={(e) => setCoupon(e.target.value)}
                    value={coupon}
                  />
                  <button
                    className={styles.couponBtn}
                    id="btn_check"
                    disabled={coupon === "" || loading === true}
                    onClick={handleCoupon}
                  >
                    Apply
                  </button>
                </div>
                <ul>
                  {discount > 0 && (
                    <li>
                      <span className={`sb-label ${styles.alert}`}>
                        Coupon Applied Succesfully 🎉
                      </span>
                    </li>
                  )}
                  <li className="subtotal">
                    <span className="sb-label">Subtotal</span>
                    <span className="sb-value">₹ {total}</span>
                  </li>
                  <li className="shipping">
                    <span className="sb-label">Shipping</span>
                    <span className="sb-value"> + (₹ 0)</span>
                  </li>
                  <li className="shipping" id="discount">
                    <span className="sb-label">Discount</span>
                    <span className="sb-value" id="pricedrop">
                      - (₹ {discount})
                    </span>
                  </li>
                  <li className="tax-calculate">
                    <input type="text" defaultValue={"06484"} className="tax" />
                    <span className="btn">Calculate</span>
                  </li>
                  <li className="grand-total">
                    <span className="sb-label">Total</span>
                    <span className="sb-value" id="bill">
                      ₹ {total - discount}
                    </span>
                  </li>
                </ul>
              </div>
              <div className="copy-block">
                <p>
                  cartitems will be saved in your cart for 30 days. To save
                  cartitems longer, add them to your Wishlist
                </p>
                <p className="customer-care">
                  Call us M-S 8:00 am to 10:00 pm IST
                  <br />
                  +917015060623
                  <br />
                </p>
              </div>
            </div>
            <div className={`cart-footer cf ${styles.finalBtn}`}>
              <button
                className={styles.couponBtn}
                id="btn_check"
                disabled={allowCheckout === 0}
                onClick={goToCheckout}
              >
                Checkout
              </button>
            </div>
            {allowCheckout === 0 && (
              <h4>
                <br />
                <center>
                  Please remove the Out of Stock Items to Checkout
                </center>
              </h4>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
