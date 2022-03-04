import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { completeWishlist } from "../../Axios/Cart.js";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import styles from "./Wishlist.module.css";
import RiseLoader from "react-spinners/RiseLoader";
import { Link } from "react-router-dom";
import { Card } from "antd";

const { Meta } = Card;
const Wishlist = () => {
  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch();
  const [wish, setWish] = React.useState(null);
  let WL = [];
  let cartLS = [];
  if (window !== "undefined" && window.localStorage.getItem("wishlist")) {
    WL = JSON.parse(window.localStorage.getItem("wishlist"));
  }
  if (window !== "undefined" && window.localStorage.getItem("cartLS")) {
    cartLS = JSON.parse(window.localStorage.getItem("cartLS"));
  }
  React.useEffect(() => {
    dispatch({
      type: "WISHLIST",
      payload: WL,
    });
    dispatch({
      type: "CART",
      payload: cartLS,
    });
  }, []);
  const { wishlist } = useSelector((state) => ({ ...state }));
  const getData = () => {
    setLoading(true);
    completeWishlist(wishlist)
      .then((res) => {
        setWish(res.data);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  };
  React.useEffect(() => {
    getData();
  }, [wishlist]);

  const deleteFromWL = (id) => {
    console.log("DLEETE FROM WL: ", id);
    const arr = wishlist;
    const index = arr.indexOf(id);
    //it has to be >=0
    arr.splice(index, 1);
    window.localStorage.setItem("wishlist", JSON.stringify(arr));
    dispatch({
      type: "WISHLIST",
      payload: arr,
    });
    getData();
  };
  return (
    <>
      <h1 className={styles.head}>Wishlist</h1>
      <center>
        {loading && (
          <div style={{ marginBottom: "30px", height: "50vh" }}>
            <RiseLoader loading={loading} size={35} />
          </div>
        )}
      </center>
      <div className={styles.items}>
        {wish &&
          wish.length > 0 &&
          wish.map((curr, index) => {
            return (
              <div key={index} style={{ margin: "20px" }}>
                <Card
                  actions={[
                    <Link to={`/products/${curr._id}`}>
                      <EyeOutlined />
                    </Link>,
                    <DeleteOutlined onClick={(e) => deleteFromWL(curr._id)} />,
                  ]}
                  hoverable
                  style={{ width: 240, height: 300 }}
                  cover={
                    <center>
                      <img
                        alt="example"
                        src={curr.imagePath[0]}
                        style={{ height: "200px", width: "auto" }}
                      />
                    </center>
                  }
                >
                  <center>
                    {" "}
                    <Meta title={curr.title} />
                  </center>
                </Card>
              </div>
            );
          })}
      </div>
      {wish && wish.length === 0 && (
        <h1 style={{ height: "60vh", padding: "20px" }}>
          <center> No Items in The Wishlist</center>
        </h1>
      )}
    </>
  );
};

export default Wishlist;
