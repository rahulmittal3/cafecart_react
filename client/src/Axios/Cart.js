import axios from "axios";
const cartDetails = async (items) => {
  console.log(items);
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/cart/items`,
    data: items,
  });
  return result;
};
const addToCartDB = async (data) => {
  // console.log(data);
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/checkout-now`,
    data: data,
  });
  return result;
};
const getFromCart = async (data, token) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/get-from-my-cart`,
    params: { id: data },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  return result;
};

const completeWishlist = async (data) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/complete-wishlist`,
    data: data,
  });
  return result;
};
export { cartDetails, addToCartDB, getFromCart, completeWishlist };
