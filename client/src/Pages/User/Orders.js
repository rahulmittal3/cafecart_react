import React from "react";
import styles from "./Orders.module.css";
import OrderIndividual from "../../Components/User/OrderIndividual.js";
import { useSelector } from "react-redux";
import { getMyOrders } from "../../Axios/Order.js";
const Orders = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = React.useState(null);
  const getData = () => {
    getMyOrders(user?.id)
      .then((res) => {
        setOrders(res?.data);
      })
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div className={styles.wrapper}>
      <div style={{ textAlign: "center" }}>
        <div className={styles.heading}>My Orders</div>
        <div className={styles.email}>{user?.email}</div>
        <center>
          {orders &&
            orders.length > 0 &&
            orders.map((curr, index) => {
              return <OrderIndividual key={index} order={curr} />;
            })}
        </center>
      </div>
    </div>
  );
};

export default Orders;
