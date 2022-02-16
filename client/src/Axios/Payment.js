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
export { createPayment, createPaymentPrepaid };
