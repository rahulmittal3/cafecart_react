import React from "react";
import styles from "./Drawer.module.css";
import { Drawer, Button } from "antd";
import { cartDetails } from "../../Axios/Cart.js";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveIcon from "@mui/icons-material/Remove";
import { useSelector, useDispatch } from "react-redux";

const Drawerrr = ({ show, setShow }) => {
  const navigate = useNavigate();
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
    let obj = {
      title: p._doc.title,
      price: p._doc.price,
      quantity: p.quantity,
      img: p._doc.imagePath[0],
    };
    total += p._doc.price;
    cartDisplay.push(obj);
  }
  return (
    <Drawer
      title="Basic Drawer"
      placement="right"
      onClose={onClose}
      visible={show}
      closable={true}
    >
      <h3 className={styles.heading}>YOUR CART</h3>
      {loading && <div className={styles.noItem}>Loading...</div>}
      {!loading && data && data.length === 0 && (
        <div className={styles.noItem}>
          No Items Found. Add Some Items to your Cart! 🛍️
        </div>
      )}
      {!loading &&
        data &&
        data.length > 0 &&
        cartDisplay.map((curr, index) => {
          return (
            <>
              <div className={styles.outer} key={index}>
                <div className={styles.imgCart}>
                  <center>
                    <img src={curr.img} alt="cartItem" />
                  </center>
                </div>
                <div className={styles.details}>
                  <div className={styles.title}>{curr.title}</div>
                  <div className={styles.priceBreakout}>
                    ₹{curr.price} X {curr.quantity}
                  </div>
                </div>
                <div className={styles.manipulations}>
                  <div className={styles.add}>
                    <center>
                      <AddIcon />
                    </center>
                  </div>
                  <div className={styles.add}>
                    <center>
                      <DeleteIcon />
                    </center>
                  </div>
                  <div className={styles.add}>
                    <center>
                      <RemoveIcon />
                    </center>
                  </div>
                </div>
              </div>
              <hr />
            </>
          );
        })}
      {loading === false && (
        <>
          <div className={styles.total}>
            Total Amount : ₹{total.toLocaleString()}
          </div>
          <div className={styles.btnGroup}>
            <p
              className={styles.btns}
              onClick={(e) => {
                navigate("/cart");
                setShow(false);
              }}
            >
              VIEW CART
            </p>
            <p className={styles.btns}>CHECKOUT</p>
          </div>
        </>
      )}
    </Drawer>
  );
};

export default Drawerrr;
