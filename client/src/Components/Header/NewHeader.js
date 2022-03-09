import React from "react";
import styles from "./NewHeader.module.css";
import DesktopHeader from "./DesktopHeader.js";
import MobileHeader from "./MobileHeader.js";
import { categories } from "../../Axios/Products.js";
import { useSelector, useDispatch } from "react-redux";
const NewHeader = () => {
  const dispatch = useDispatch();
  let x = [];
  if (window !== undefined && window.localStorage.getItem("cartLS"))
    x = JSON.parse(window.localStorage.getItem("cartLS"));
  console.log(x);

  const { cart, user, wishlist } = useSelector((state) => ({ ...state }));
  const [headers, setHeaders] = React.useState([]);
  const getHeaders = () => {
    categories()
      .then((res) => setHeaders(res.data))
      .catch((err) => console.log(err));
  };
  React.useEffect(() => {
    getHeaders();
  }, []);

  return (
    <div className={styles.outer}>
      <div className={styles.desktopHeader}>
        <DesktopHeader
          cart={cart}
          wishlist={wishlist}
          user={user}
          headers={headers}
        />
      </div>
      <div className={styles.mobileHeader}>
        <MobileHeader cart={x} wishlist={wishlist} user={user} />
      </div>
    </div>
  );
};

export default NewHeader;
