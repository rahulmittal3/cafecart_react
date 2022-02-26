import React from "react";
import styles from "../../AdminStyles/AdminList.module.css";
import AdminList from "../../Components/Admin/AdminList.js";
const AdminHome = () => {
  return (
    <div className={styles.overall}>
      <div className={styles.left}>
        <AdminList />
      </div>
      <div className={styles.right}>
        <h1>Welcome to Admin Panel</h1>
        <h3>
          Here you can manage your products and categories as well as view users
          and their orders.
        </h3>
      </div>
    </div>
  );
};

export default AdminHome;
