import styles from "../Cart/Drawer.module.css";
import React from "react";
import { Drawer } from "antd";
import { useSelector, useDispatch } from "react-redux";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { cartDetails } from "../../Axios/Cart.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCartDB } from "../../Axios/Cart.js";
const CartDrawer = () => {
  const navigate = useNavigate();
  const { drawer, user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const { cart } = useSelector((state) => ({ ...state }));
  const [data, setData] = React.useState([]);
  const cartLS = cart;
  const lavda = () => {
    setLoading(true);
    cartDetails(cartLS)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  React.useEffect(() => {
    lavda();
  }, [drawer]);
  const onClose = () => {
    //directly dispatch to redux
    dispatch({
      type: "DRAWER_VISIBLE",
      payload: false,
    });
  };
  let cartDisplay = [];
  let total = 0;
  for (let j = 0; j < data?.length; j++) {
    let p = data[j];

    let obj = {
      title: p._doc.title,
      price: p._doc.price,
      quantity: p.quantity,
      img: p._doc.imagePath[0],
      _id: p._doc._id,
    };
    total += p._doc.price * p.quantity;
    cartDisplay.push(obj);
  }
  const handleIncrement = (_id) => {
    //cart is the original item
    //bring change in the cart itself

    for (let i = 0; i < cartLS.length; i++) {
      if (cartLS[i]._id === _id) {
        // console.log(cartLS[i]);
        //match found, increment the quantity.
        let qty = cartLS[i].quantity;
        if (qty === 5) {
          toast.warning("5 items allowed per item");
          return;
        }
        qty = qty + 1;
        cartLS[i] = { ...cartLS[i], quantity: qty };
        // console.log(cartLS);
        window.localStorage.setItem("cartLS", JSON.stringify(cartLS));
        dispatch({
          type: "CART",
          payload: cartLS,
        });
        lavda();
        return;
      }
    }
  };

  const handleDecrement = (_id) => {
    //cart is the original item
    //bring change in the cart itself
    // console.log(cartLS);
    for (let i = 0; i < cartLS.length; i++) {
      if (cartLS[i]._id === _id) {
        // console.log(cartLS[i]);
        //match found, increment the quantity.
        let qty = cartLS[i].quantity;
        if (qty === 1) {
          toast.warning(
            "Quantity 1 Found! Delete the Item to remove from Cart!"
          );
          return;
        }
        qty = qty - 1;
        cartLS[i] = { ...cartLS[i], quantity: qty };
        // console.log(cartLS);
        window.localStorage.setItem("cartLS", JSON.stringify(cartLS));
        dispatch({
          type: "CART",
          payload: cartLS,
        });
        lavda();
        return;
      }
    }
  };
  const deleteItem = (id) => {
    for (let i = 0; i < cartLS.length; i++) {
      if (cartLS[i]._id === id) {
        cartLS.splice(i, 1);
        window.localStorage.setItem("cartLS", JSON.stringify(cartLS));
        dispatch({
          type: "CART",
          payload: cartLS,
        });
        lavda();
        return;
      }
    }
  };

  const checkoutHandler = () => {
    dispatch({ type: "DIRECT_CHECKOUT", payload: true });
    window.localStorage.setItem("directCheckout", true);
    //check whwther, anyout of stock item is there and
    let result = 1;
    for (let i = 0; i < data.length; i++) {
      const curr = data[i];
      if (curr?._doc?.available === false) {
        result = result & 0;
      }
    }
    if (result === 0) {
      //means out of stock item is there and
      toast.error(
        "Please remove Out of Stock items from the Cart to Checkout!"
      );
      return;
    }
    if (!user) {
      toast.success("Please Login to Continue to Checkout");

      return;
    }
    if (!user.contactVerified) {
      toast.success(
        "Please Verify your Contact Number, before placing your Order"
      );
      //   setOpenVerif(true);
      return;
    }
    //CREATE A CHECKOUT OBJECT :

    //create the products array from
    let arr = [];
    for (let i = 0; i < cart.length; i++) {
      const obj = {
        productId: cart[i]?._id,
        quantity: cart[i]?.quantity,
      };
      arr.push(obj);
    }
    console.log(arr);
    const createObject = {
      user: user?.id,
      priceBeforeDiscount: total,
      discount: 0,
      shipping: total < 500 ? 50 : 0,
      couponApplied: "",
      items: arr,
    };
    console.log(createObject);
    addToCartDB(createObject)
      .then((res) => {
        navigate("/checkout");
      })
      .catch((err) => toast.error("Please Try Again!"));
  };

  return (
    <Drawer placement="right" onClose={onClose} visible={drawer}>
      <div className={styles.bringFront}>
        <div className={styles.title}>Your Cart</div>
        {cart && cart.length <= 0 && (
          <div>
            <h3 className={styles.title} style={{ padding: "40px" }}>
              No Items in the Cart, Please Shop More
            </h3>
            <div>
              <center>
                <ShoppingBagIcon sx={{ fontSize: 200 }} />
              </center>
            </div>
          </div>
        )}
        {cart && cart.length > 0 && (
          <div className={styles.present}>
            <div>
              {!loading &&
                data &&
                data.length > 0 &&
                cartDisplay.map((curr, index) => {
                  return (
                    <div className={styles.drawerItem} key={index}>
                      <div className={styles.drawerItemImg}>
                        <img
                          src={curr?.img}
                          alt="Cart Item Img"
                          className={styles.pImage}
                        />
                      </div>
                      <div className={styles.drawerItemMeta}>
                        <div className={styles.drawerItemTitle}>
                          {curr?.title}
                        </div>
                        <div className={styles.drawerItemPrice}>
                          ₹{curr?.price.toLocaleString("en-IN")}
                        </div>
                        <div className={styles.drawerItemMenu}>
                          <div className={styles.drawerItemMenuLeft}>
                            <button onClick={(e) => handleIncrement(curr?._id)}>
                              +
                            </button>
                            <input
                              type="number"
                              value={curr?.quantity}
                              disabled={true}
                            />
                            <button onClick={(e) => handleDecrement(curr?._id)}>
                              -
                            </button>
                          </div>
                          <div
                            className={styles.drawerItemMenuRight}
                            style={{ cursor: "pointer" }}
                          >
                            <img
                              src="https://res.cloudinary.com/techbuy/image/upload/v1646414244/Vector_hmvxic.png"
                              alt="delete"
                              onClick={(e) => deleteItem(curr._id)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div>
              <div className={styles.total}>
                Total : ₹{total.toLocaleString("en-IN")}
              </div>
              <div className={styles.btns}>
                <button
                  className={styles.cart}
                  onClick={(e) => {
                    dispatch({ type: "DIRECT_CHECKOUT", payload: false });
                    window.localStorage.setItem("directCheckout", false);
                    navigate("/cart");
                  }}
                >
                  View Cart
                </button>
                <button className={styles.buyNow} onClick={checkoutHandler}>
                  Check Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default CartDrawer;
