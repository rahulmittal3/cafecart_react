import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OrderSuccessPayment.module.css";
import { finaliseOrderByPayment } from "../../Axios/Payment.js";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
const OrderSuccessPayment = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const [load, setLoad] = React.useState(true);
  const [txn, setTxn] = React.useState(null);
  const checkPermission = () => {
    console.log("Hello");
    const x = window?.localStorage?.getItem("p");
    if (!x) {
      navigate("/cart");
    }
    setTxn(JSON.parse(window.localStorage.getItem("p")));
  };
  useEffect(() => {
    //not to come here, if no payment details in LS
    checkPermission();
  }, []);

  //useEffect to place an order hereby
  const finaliseOrder = () => {
    finaliseOrderByPayment(user?.id, txn)
      .then((res) => {
        toast.success("Order has been Plced Successfuly");
        //clear all the cluttering
        window.localStorage.setItem("cartLS", JSON.stringify([]));
        window.localStorage.removeItem("p");
        dispatch({
          type: "CART",
          payload: [],
        });
        setLoad(false);
        navigate("/user/profile");

        //cleat rhe local storage once against
      })

      .catch((err) => setLoad(false));
  };
  useEffect(() => {
    user && user.id && txn && finaliseOrder();
  }, [user]);
  return (
    <>
      <h1>Your Payment is Successful!</h1>
      {load && (
        <div>
          <center>
            <CircularProgress sx={{ color: "#a0522d" }} />
          </center>
        </div>
      )}
      <h5>
        Please Wait while We are Confirming Your Order.
        <br /> This would take a maximum of 40 seconds. You will be
        Automatically Redirected.
        <br />
        Thank You for your patience.
      </h5>
      <div className={styles.wrapper}>
        <div className={styles.tableWrapper}>
          <div className={styles.heroImage}>
            <center>
              <img
                src="https://res.cloudinary.com/techbuy/image/upload/v1647802857/image_p4tig3.svg"
                alt="Hero Images"
                className={styles.image}
              />
            </center>
          </div>
          <div className={styles.details}>
            <div className={styles.detail}>
              <div className={styles.q}>Transaction Id</div>
              <div className={styles.ask}>{txn?.txnid}</div>
            </div>
            <div className={styles.detail}>
              <div className={styles.q}>Name</div>
              <div className={styles.ask}>
                {txn?.firstname + "" + txn?.lastname}
              </div>
            </div>
            <div className={styles.detail}>
              <div className={styles.q}>Email</div>
              <div className={styles.ask}>{txn?.email}</div>
            </div>
            <div className={styles.detail}>
              <div className={styles.q}>Contact No.</div>
              <div className={styles.ask}>{txn?.phone}</div>
            </div>
            <div className={styles.detail}>
              <div className={styles.q}>Amount</div>
              <div className={styles.ask}>₹{txn?.amount}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSuccessPayment;
