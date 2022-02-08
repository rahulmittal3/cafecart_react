import React, { useState, useEffect } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { Tabs } from "antd";
import styles from "./SignUpModal.module.css";
import LoginForm from "../Components/Forms/LoginForm.js";
import RegisterForm from "../Components/Forms/RegisterForm.js";
const { TabPane } = Tabs;
const SignUpModal = () => {
  useEffect(() => {
    document
      .getElementById(styles.registerActive)
      .classList.remove(styles.active);
    document.getElementById(styles.loginActive).classList.add(styles.active);
  }, []);
  const [showSignIn, setShowSignIn] = useState(true);
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    // <Tabs size="large" defaultActiveKey="1">
    //   <TabPane tab="Login" key="1">
    //     <LoginForm />
    //   </TabPane>
    //   <TabPane tab="Register" key="2">
    //     <RegisterForm />
    //   </TabPane>
    // </Tabs>
    <div>
      <div className={styles.splitBtns}>
        <div
          id={styles.loginActive}
          className={styles.btns}
          onClick={(e) => {
            setShowSignIn(true);
            document
              .getElementById(styles.registerActive)
              .classList.remove(styles.active);
            document
              .getElementById(styles.loginActive)
              .classList.add(styles.active);
          }}
        >
          Login
        </div>
        <div
          id={styles.registerActive}
          className={styles.btns}
          onClick={(e) => {
            setShowSignIn(false);
            document
              .getElementById(styles.loginActive)
              .classList.remove(styles.active);
            document
              .getElementById(styles.registerActive)
              .classList.add(styles.active);
          }}
        >
          Signup
        </div>
      </div>
      {showSignIn && <LoginForm />}
      {!showSignIn && <RegisterForm />}
    </div>
  );
};

export default SignUpModal;
