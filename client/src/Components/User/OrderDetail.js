import React from "react";
import styles from "./OrderDetail.module.css";

const OrderDetail = ({ product }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.image}>
        <img
          src={product?.productId?.imagePath[0]}
          alt="prodImage"
          className={styles.prodImage}
        />
      </div>
      <div className={styles.right}>
        <div className={styles.name}>{product?.productId?.title}</div>

        <div className={styles.items}>
          Qty : {product?.quantity ? product.quantity : product.qty}
        </div>
        <div className={styles.price}>₹&nbsp;{product?.productId?.price}</div>
      </div>
    </div>
  );
};

export default OrderDetail;
