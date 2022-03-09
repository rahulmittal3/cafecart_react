import React, { useState } from "react";
import styles from "./RegisterForm.module.css";
import "react-phone-number-input/style.css";
import { register } from "../../Axios/Authentication.js";
import { useNavigate } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { toast } from "react-toastify";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

const RegisterForm = () => {
  const navigate = useNavigate();
  const firebaseConfig = {
    apiKey: "AIzaSyBzguredb4wBzgIaHHBIezG2Dbfl2uqSJw",
    authDomain: "cafecart-bace8.firebaseapp.com",
    projectId: "cafecart-bace8",
    storageBucket: "cafecart-bace8.appspot.com",
    messagingSenderId: "745716393557",
    appId: "1:745716393557:web:5260928b87fb388987d6dc",
  };

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  } else {
    firebase.app(); // if already initialized, use that one
  }
  const auth = firebase.auth();
  const submitHandler = (e) => {
    e.preventDefault();
    configureCaptcha();
    const contact = "+91" + formData.phone;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, contact, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        toast.success("📲 OTP has been Sent to your Phone Number!");
        setShowForm(false);
        // ...
      })
      .catch((error) => {
        console.log(error);
        // Error; SMS not sent
        // ...
      });
  };
  const configureCaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "registerBtn",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          submitHandler();
          console.log(response);
        },
      },
      auth
    );
  };
  const [formData, setFormData] = useState({});
  const [showForm, setShowForm] = useState(true);
  const [otp, setOtp] = useState(null);
  const validateOTP = (e) => {
    e.preventDefault();
    window.confirmationResult
      .confirm(otp)
      .then((res) =>
        register(formData)
          .then((res) => {
            //first dispatch to the local storage and redux...
            toast.success(
              "OTP Validated! Account Created Successfully! Please Login to Continue"
            );

            window.location.reload();
          })
          .catch((err) => toast.error(err.response.data))
      )
      .catch((err) => toast.error("OTP Invalid"));
  };
  return (
    <div>
      {showForm && (
        <div className={styles.modal_outer}>
          <h3>Register</h3>
          <form onSubmit={submitHandler}>
            <div className={styles.fields}>
              <div>
                <label>Full Name</label>
                <input
                  type="text"
                  className={styles.inputs}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                  }}
                />
              </div>
              <div>
                <label>Email Address</label>
                <input
                  type="email"
                  className={styles.inputs}
                  onChange={(e) => {
                    setFormData({ ...formData, email: e.target.value });
                  }}
                />
              </div>
              <div>
                <label>Contact Number</label>

                <input
                  type="tel"
                  className={styles.inputs}
                  minLength={10}
                  maxLength={10}
                  onChange={(e) => {
                    setFormData({ ...formData, phone: e.target.value });
                  }}
                />
              </div>
              <div>
                <label>Password</label>
                <input
                  type="password"
                  className={styles.inputs}
                  onChange={(e) => {
                    setFormData({ ...formData, password: e.target.value });
                  }}
                />
              </div>
              <div>
                <label>Confirm Password</label>
                <input
                  type="password"
                  className={styles.inputs}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    });
                  }}
                />
              </div>
              <div></div>
              <div>
                <button className={styles.registerBtn} id="registerBtn">
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
      {!showForm && (
        <div className={styles.modal_outer}>
          <form onSubmit={validateOTP}>
            <div className={styles.fields}>
              {" "}
              <div>
                <label>Validate OTP</label>
                <input
                  type="number"
                  className={styles.inputs}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div>
                <button className={styles.registerBtn1}>Submit OTP</button>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
