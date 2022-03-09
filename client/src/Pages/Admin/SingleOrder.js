import React from "react";
import styles from "../../AdminStyles/AdminList.module.css";
import style from "../../AdminStyles/AdminProduct.module.css";
import AdminList from "../../Components/Admin/AdminList.js";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { Table, Badge, Button } from "antd";
import { useNavigate, Link, useParams } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getOrder, updateBlog } from "../../Axios/Admin.js";
import { toast } from "react-toastify";
import DoneOutlineTwoToneIcon from "@mui/icons-material/DoneOutlineTwoTone";
import CancelTwoToneIcon from "@mui/icons-material/CancelTwoTone";
import moment from "moment";

const SingleOrder = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = React.useState({});
  const [content, setContent] = React.useState("");
  let token = "randomString";
  if (window !== "undefined" && window.localStorage.getItem("jwtAdmin")) {
    token = JSON.parse(window.localStorage.getItem("jwtAdmin"));
  }
  const getData = () => {
    getOrder(token, params.id)
      .then((res) => {
        setData(res.data);
        setContent(res.data.description);
      })
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getData();
  }, []);
  const columns = [
    {
      title: "Product Id",
      dataIndex: "productId",
      width: 150,
      align: "center",
      render: (text) => <Link to={`/admin/product/${text._id}`}>{text}</Link>,
    },
    {
      title: "User",
      dataIndex: "user",
      width: 150,
      align: "center",
      render: (text) => text,
    },
    {
      title: "Method",
      dataIndex: "orderType",
      width: 60,
      align: "center",
    },
    {
      title: "Shiprocket Id",
      dataIndex: "SRID",
      width: 150,
      align: "center",
      render: (text) => (text ? text : "Not Available"),
    },
    {
      title: "Order Date",
      dataIndex: "createdAt",
      width: 150,
      align: "center",
      render: (text) =>
        text ? moment(text).format("DD MMMM YYYY") : "Not Available",
    },
  ];
  const x = data?.cart?.items || data?.items;
  const initialValue = 0;
  const sumWithInitial = x?.reduce(
    (previousValue, currentValue) =>
      previousValue + currentValue.productId.price * currentValue.quantity,
    initialValue
  );
  return (
    <div className={styles.overall}>
      <div className={styles.left}>
        <AdminList />
      </div>
      <div className={styles.right}>
        <div className={styles.rightInner}>
          <div className={styles.couponHeading}>
            <div className={styles.couponLeft}>Order</div>
          </div>
          <div className={style.p1}>
            <div className={style.q}>
              <div className={style.ask}>Order Id</div>
              <div className={style.answer}>{data?._id}</div>
            </div>
            <div className={style.q}>
              <div className={style.ask}>User</div>
              <div className={style.answer}>{data?.user?.username}</div>
            </div>
            <div className={style.q}>
              <div className={style.ask}>User's Registered Email</div>
              <div className={style.answer}>{data?.user?.email}</div>
            </div>
            <div className={style.q}>
              <div className={style.ask}>User's Registered Phone</div>
              <div className={style.answer}>
                {data?.user?.contact ? data?.user?.contact : "Not Available"}
              </div>
            </div>
            <div className={style.q}>
              <div className={style.ask}>Payment Method</div>
              <div className={style.answer}>{data?.orderType}</div>
            </div>
            <div className={style.q}>
              <div className={style.ask}>Payment Id</div>
              <div className={style.answer}>
                {data?.user?.paymentId
                  ? data?.user?.paymentId
                  : "COD (No PaymentId)"}
              </div>
            </div>
            <div className={style.q}>
              <div className={style.ask}>Final Amount</div>
              <div className={style.answer}>
                ₹{data?.netAmount ? data?.netAmount : data?.cart?.totalCost}
              </div>
            </div>
            <div className={style.q}>
              <div className={style.ask}>Discount Availed</div>
              <div className={style.answer}>
                {(
                  ((sumWithInitial -
                    (data?.netAmount
                      ? data?.netAmount
                      : data?.cart?.totalCost)) /
                    sumWithInitial) *
                  100
                ).toFixed(0)}
                %
              </div>
            </div>
            <div className={style.q}>
              <div className={style.ask}>Coupon Applied</div>
              <div className={style.answer}>
                {data?.couponName ? data?.couponName : "NOT APPLIED"}
              </div>
            </div>
            <center>
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">ProductId</th>
                    <th scope="col">Product</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {x &&
                    x.map((curr, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>
                            <Link to={`/admin/product/${curr.productId?._id}`}>
                              {curr.productId?._id}
                            </Link>
                          </td>
                          <td>{curr.productId?.title}</td>
                          <td>{curr.qty || curr.quantity}</td>
                          <td>{curr.productId?.price}</td>
                        </tr>
                      );
                    })}
                  {/* <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>Larry</td>
                    <td>the Bird</td>
                    <td>@twitter</td>
                  </tr> */}
                </tbody>
              </table>
            </center>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
