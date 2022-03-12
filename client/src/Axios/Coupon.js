import axios from "axios";

const checkCoupon = async (name) => {
  console.log(name);
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/check-coupon`,
    params: { name: name },
  });
  return result;
};
const checkoutCoupon = async (jwt, name, _id) => {
  console.log(name);

  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/checkout-coupon`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    params: { name: name, _id: _id },
  });
  return result;
};
export { checkCoupon, checkoutCoupon };
