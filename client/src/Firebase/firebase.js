// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
};
console.log(firebaseConfig);
// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// module.exports = app;

firebase.initializeApp(firebaseConfig);

// export
// export default firebase;
const auth = firebase.auth();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const signInWithPhoneNumber = new firebase.auth.PhoneAuthProvider();
const RecaptchaVerifier = firebase.auth.RecaptchaVerifier;
export { auth, googleAuthProvider, signInWithPhoneNumber, RecaptchaVerifier };
