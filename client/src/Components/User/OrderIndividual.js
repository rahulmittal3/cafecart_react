import React from "react";
import styles from "./OrderIndividual.module.css";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { Badge } from "antd";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useNavigate } from "react-router-dom";
import { trackOrder } from "../../Axios/Order.js";
const moment = require("moment");

const OrderIndividual = ({ order }) => {
  console.log(order);

  const navigate = useNavigate();
  const generateRandomColor = () => {
    const [a, b, c] = [
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
      Math.floor(Math.random() * 255),
    ];
    return `rgb(${a},${b},${c})`;
  };

  const calculateQty = () => {
    const qty = order?.items?.length - 1;
    if (qty > 0) return `+ ${order?.items?.length - 1}`;
    else return "+ 0";
  };
  return (
    <div
      className={styles.wrapper}
      onClick={(e) => navigate(`/user/order/${order._id}`)}
    >
      <Badge.Ribbon text={calculateQty()} color={generateRandomColor()}>
        <div className={styles.header}>
          <div className={styles.logo}>
            <LocalMallIcon sx={{ fontSize: 40 }} />
          </div>
          <div className={styles.header_preview}>
            <div className={styles.status}>Ordered</div>
            <div className={styles.date}>
              {moment(order.createdAt).format("MMMM Do YYYY, h:mm a")}
            </div>
          </div>
        </div>
      </Badge.Ribbon>
      <hr />
      <br />
      <div className={styles.orderItem}>
        <div className={styles.imageOrder}>
          <img
            src={order?.items[0]?.productId?.imagePath[0]}
            className={styles.productImage}
            alt="OrderImage"
          />
        </div>
        <div className={styles.info}>
          <div className={styles.brand}>
            {order?.items[0]?.productId?.manufacturer
              ? order?.items[0]?.productId?.manufacturer
              : "Cafecart"}
          </div>
          <div className={styles.productName}>
            {order?.items[0]?.productId?.title}
          </div>
          <div className={styles.brand}>
            {order?.items[0]?.productId?.specific_ingredients !== "NA"
              ? order?.items[0]?.productId?.specific_ingredients
              : "Coffee Love"}{" "}
            &emsp; | &emsp;{order?.items[0]?.productId?.specific_quantity}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderIndividual;
