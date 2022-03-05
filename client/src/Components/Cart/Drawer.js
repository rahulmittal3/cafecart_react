import React from "react";
import styles from "./Drawer.module.css";
import { Drawer, Button } from "antd";
import { cartDetails } from "../../Axios/Cart.js";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Drawerrr = ({ show, setShow }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const { cart } = useSelector((state) => ({ ...state }));
  let cartLS = [];
  if (window !== "undefined" && window.localStorage.getItem("cartLS"))
    cartLS = JSON.parse(window.localStorage.getItem("cartLS"));
  const showDrawer = () => {
    setShow(true);
  };

  const onClose = () => {
    setShow(false);
  };

  const getItems = () => {
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
    getItems();
    setShow(true);
  }, [cart]);

  //GET THE REQUIRED ITEMS...
  let cartDisplay = [];
  let total = 0;
  for (let j = 0; j < data.length; j++) {
    let p = data[j];
    console.log(p);
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
    console.log(cartLS);
    for (let i = 0; i < cartLS.length; i++) {
      if (cartLS[i]._id === _id) {
        console.log(cartLS[i]);
        //match found, increment the quantity.
        let qty = cartLS[i].quantity;
        if (qty === 5) {
          toast.warning("5 items allowed per item");
          return;
        }
        qty = qty + 1;
        cartLS[i] = { ...cartLS[i], quantity: qty };
        console.log(cartLS);
        window.localStorage.setItem("cartLS", JSON.stringify(cartLS));
        dispatch({
          type: "CART",
          payload: cartLS,
        });
        // getItems();
        return;
      }
    }
  };

  const handleDecrement = (_id) => {
    //cart is the original item
    //bring change in the cart itself
    console.log(cartLS);
    for (let i = 0; i < cartLS.length; i++) {
      if (cartLS[i]._id === _id) {
        console.log(cartLS[i]);
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
        console.log(cartLS);
        window.localStorage.setItem("cartLS", JSON.stringify(cartLS));
        dispatch({
          type: "CART",
          payload: cartLS,
        });
        // getItems();
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
        //  getItems();
        return;
      }
    }
  };
  return (
    <Drawer
      placement="right"
      onClose={onClose}
      visible={show}
      closable={true}
      width={410}
      className={styles.drawerWidth}
    >
      {/* <h3 className={styles.heading}>YOUR CART</h3>
      {loading && <div className={styles.noItem}>Loading...</div>}
      {!loading && data && data.length === 0 && (
        <div className={styles.noItem}>
          No Items Found. Add Some Items to your Cart! 🛍️
        </div>
      )} */}
      <div className={styles.bringFront}>
        <div className={styles.crossFlex}>
          <div
            className={styles.cross}
            style={{ cursor: "pointer" }}
            onClick={(e) => setShow(false)}
          >
            +
          </div>
        </div>
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
                <button className={styles.cart}>View Cart</button>
                <button className={styles.buyNow}>Check Out</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Drawer>
  );
};

export default Drawerrr;
