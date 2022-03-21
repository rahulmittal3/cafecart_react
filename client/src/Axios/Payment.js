import axios from "axios";

const createPayment = async (data) => {
  console.log(data);
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/create-payment`,
    data: data,
  });
  return result;
};

const createPaymentPrepaid = async (data) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/create-payment-prepaid`,
    data: data,
  });
  return result;
};
const finaliseOrderByPayment = async (id, pay) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/finalise-prepaid`,
    data: { id: id, pay: pay },
  });
  return result;
};
export { createPayment, createPaymentPrepaid, finaliseOrderByPayment };
