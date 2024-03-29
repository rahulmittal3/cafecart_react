import axios from "axios";

const register = async (data) => {
  console.log(data);
  try {
    const result = await axios({
      method: "POST",
      url: `${process.env.REACT_APP_BACKEND_URL}/register`,
      data: data,
    });
    return result;
  } catch (error) {
    return error;
  }
};
const login = async (email, password) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/login`,
    data: { email, password },
  });
  return result;
};

const currentUser = async (jwt, id) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/current-user`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  });
  return result;
};
const passwordless = async (profile) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/passwordless`,
    data: profile,
  });
  return result;
};

const updatePassword = async (jwt, data) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/update-password`,
    data: data,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  });
  return result;
};
const addPhone = async (jwt, userId, phone) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/add-phone`,
    data: {
      _id: userId,
      phone: phone,
    },
    headers: {
      authorization: `Bearer ${jwt}`,
    },
  });
  return result;
};
const generateOTP = async (email) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/forgot-password/generate-otp`,
    data: { email: email },
  });
  return result;
};
const verifyOTP = async (email, otp) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/forgot-password/verify-otp`,
    data: { otp: otp, email: email },
  });
  return result;
};
const setPassForgot = async (email, pass) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/forgot-password/set-pass`,
    data: { email: email, pass: pass },
  });
  return result;
};
export {
  register,
  login,
  currentUser,
  passwordless,
  updatePassword,
  addPhone,
  generateOTP,
  verifyOTP,
  setPassForgot,
};
