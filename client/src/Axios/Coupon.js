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
export { checkCoupon };
