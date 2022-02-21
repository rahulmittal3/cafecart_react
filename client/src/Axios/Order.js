import axios from "axios";

const getMyOrders = async (id) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/get-order`,
    params: { id },
  });
  return result;
};

const getSingleOrder = async (orderId) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/get-single-order`,
    params: { orderId },
  });
  return result;
};

const trackOrder = async (object) => {
  console.log(object);
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/track-order`,
    data: object,
  });
  return result;
};
export { getMyOrders, getSingleOrder, trackOrder };
