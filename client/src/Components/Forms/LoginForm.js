import { Form, Input, Button, Checkbox } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import { useNavigate } from "react-router-dom";
import { FacebookOutlined, GoogleOutlined } from "@ant-design/icons";

import styles from "./LoginForm.module.css";
import { toast } from "react-toastify";
import { login, google, passwordless } from "../../Axios/Authentication.js";
import { GoogleLogin } from "react-google-login";
import { googleAuthProvider } from "../../Firebase/firebase.js";

import { useDispatch } from "react-redux";
const LoginForm = () => {
  const responseGoogle = (res) => {
    console.log(res);
    console.log(res.profileObj);
    if (!res.profileObj) {
      toast.success("Unexpected Error! Please try again");
      return;
    }
    if (res.profileObj) {
      passwordless(res.profileObj)
        .then((res) => {
          toast.success("Login Successfully");
          if (window !== "undefined") {
            localStorage.setItem("user", JSON.stringify(res.data));
          }
          dispatch({
            type: "USER_CHANGED",
            payload: res.data,
          });
          window.location.reload("/home");
        })
        .catch((err) => {
          toast.error(err.response.data);
        });
    }
    //thisProfileObj gives us the google user and its login credentials....
  };
  const navigate = useNavigate();
  //NORMAL LOGIN THROUGH EMAIL AND PASSWORD.....
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const facebookLogin = () => {};
  const googleLogin = async (e) => {
    e.preventDefault();
  };
  const dispatch = useDispatch();
  const normalLogin = async (e) => {
    e.preventDefault();
    //here we have the normal login and everything.
    login(email, password)
      .then((res) => {
        toast.success("Login Successful");
        if (window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(res.data));
        }
        dispatch({
          type: "USER_CHANGED",
          payload: res.data,
        });
        window.location.reload("/home");
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  };
  return (
    <div>
      <div className={styles.modal_outer}>
        <h3>Sign In With</h3>
        <div className={styles.buttons}>
          <div>
            {/* <button id={styles.btnFacebook} className={styles.btnStyle}>
              <FacebookOutlined style={{ fontSize: "32px" }} /> &nbsp; Facebook
            </button> */}
          </div>
          <div style={{ marginBottom: "2px" }}>
            {/* <button id={styles.btnGoogle} className={styles.btnStyle}>
              <GoogleOutlined style={{ fontSize: "32px" }} /> &nbsp; Google
            </button> */}
            <GoogleLogin
              clientId="664020622197-h8henpf256g1e1llh4hkcfr56uiuvtfo.apps.googleusercontent.com"
              buttonText="Login/Signup With Google"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
        <form onSubmit={normalLogin}>
          <div className={styles.fields}>
            <div>
              <label>Phone/Email</label>
              <input
                type="text"
                className={styles.inputs}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email-address or phone-number"
              />
            </div>
            <div>
              <label>Password</label>
              <input
                type="password"
                className={styles.inputs}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div>
              <button id={styles.loginBtn} disabled={!email || !password}>
                Sign In
              </button>
            </div>
          </div>
        </form>
        <h5>
          Forgot Password? <Link to="/">Click Here</Link>
        </h5>
      </div>
    </div>
  );
};

export default LoginForm;
