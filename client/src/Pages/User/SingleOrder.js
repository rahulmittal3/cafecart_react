import React from "react";
import styles from "./SingleOrder.module.css";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getSingleOrder } from "../../Axios/Order.js";
import CallIcon from "@mui/icons-material/Call";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import MapsHomeWorkIcon from "@mui/icons-material/MapsHomeWork";
import OrderDetail from "../../Components/User/OrderDetail.js";
import { trackOrder } from "../../Axios/Order.js";

const moment = require("moment");

const SingleOrder = () => {
  React.useEffect(() => {
    document.body.scrollTop = 0;
  }, []);
  const [order, setOrder] = React.useState(null);
  const [track, setTrack] = React.useState(null);
  const getTrack = () => {
    trackOrder({ orderId: params.orderId })
      .then((res) => setTrack(res.data))
      .catch((err) => console.log(err));
  };

  const { user } = useSelector((state) => ({ ...state }));
  const params = useParams();

  const getData = () => {
    getSingleOrder(params.orderId)
      .then((res) => setOrder(res.data))
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    getData();
  }, []);
  React.useEffect(() => {
    order?.SRShipmentId && getTrack();
  }, [order]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.heading}>My Order</div>
        <div className={styles.email}>{user.email}</div>
      </div>

      <div className={styles.info}>
        <div className={styles.zone1}>
          <div className={styles.zoneHead}>Order Details</div>
          <div className={styles.orderDate}>
            <span className={styles.q}>Ordered On : </span>
            <span className={styles.a}>
              {moment(order?.createdAt).format("MMMM Do YYYY, h:mm a")}
            </span>
          </div>
          {/*  */}
          <div className={styles.orderNumber}>
            <span className={styles.q}>Order No. : </span>
            <span className={styles.a}>{order?._id}</span>
          </div>
          {/*  */}
          <div className={styles.amount}>
            <span className={styles.q}>Total Amount : </span>
            <span className={styles.a}>
              ₹
              {order?.netAmount
                ? order?.netAmount.toLocaleString("en-IN")
                : order?.cart?.totalCost.toLocaleString("en-IN")}
            </span>
          </div>
          <div className={styles.amount}>
            <span className={styles.q}>Order Status : </span>
            <span className={styles.a}>
              {JSON.stringify(track?.tracking_data?.error)
                ? JSON.stringify(track?.tracking_data?.error)
                : "Please Check Your Mail for Order Status"}
            </span>
          </div>
          <hr />
          <br />
        </div>
        {/*  */}
        <div className={styles.zone2}>
          <div className={styles.zoneHead}>Communication Details</div>
          <div className={styles.orderDate}>
            <span className={styles.q}>
              <CallIcon /> &emsp; &emsp;
            </span>
            <span className={styles.a}>
              {order?.customerContact
                ? order?.customerContact
                : user?.contact
                ? user.contact
                : "Not Available"}
            </span>
          </div>
          {/*  */}
          <div className={styles.orderNumber}>
            <span className={styles.q}>
              <MarkEmailReadIcon />
              &emsp; &emsp;
            </span>
            <span className={styles.a}>
              {order?.customerEmail ? order?.customerEmail : user?.email}
            </span>
          </div>
          {/*  */}
          <div className={styles.amount}>
            <span className={styles.q}>Payment Mode : </span>
            <span className={styles.a}>{order?.orderType}</span>
          </div>
          <hr />
          <br />
        </div>
        <div className={styles.zone3}>
          <div className={styles.zoneHead}>Order Address</div>
          <div className={styles.orderDate}>
            <span className={styles.q}>
              <MapsHomeWorkIcon />
              &emsp; &emsp;
            </span>
            <span className={styles.a}>
              {order?.customerName ? order?.customerName : order?.address}
            </span>
          </div>
          {/*  */}
          <div className={styles.orderNumber}>
            <span className={styles.q}>{""}</span>
            <span className={styles.a}>{order?.customerAddress}</span>
          </div>
          {/*  */}
          <div className={styles.amount}>
            <span className={styles.q}>{""}</span>
            <span className={styles.a}>
              {order?.customerCity} {order?.customerState}
            </span>
          </div>
          {order?.customerPin && (
            <div className={styles.pin}>
              <span className={styles.q}>PIN : </span>
              <span className={styles.a}> {order?.customerPin}</span>
            </div>
          )}
          <hr />
          <br />
        </div>
        {/*  */}
        <div className={styles.zone4}>
          <div className={styles.zoneHead}>Items in the Order</div>
          {order &&
            order.items &&
            order.items.length > 0 &&
            order.items.map((curr, index) => {
              return <OrderDetail key={index} product={curr} />;
            })}
          {order &&
            order.cart &&
            order.cart.items.length > 0 &&
            order.cart.items.map((curr, index) => {
              return <OrderDetail key={index} product={curr} />;
            })}
          <hr />
          <br />
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
