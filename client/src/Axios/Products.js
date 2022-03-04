import axios from "axios";

const newArrival = async () => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/new-arrivals`,
  });
  return result;
};
const trending = async () => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/trending`,
  });
  return result;
};

const best = async () => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/best`,
  });
  return result;
};

const categories = async () => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/categories`,
  });
  return result;
};

const categorySlug = async (slug) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/category-slug/${slug}`,
    data: { slug },
  });
  return result;
};

const parentVariety = async (id1, id2) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/category/${id1}/${id2}`,
  });
  return result;
};

const variety = async (id1, id2, id3) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/category/${id1}/${id2}/${id3}`,
  });
  return result;
};

const singleProduct = async (id) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/product/${id}`,
  });
  return result;
};
const otherProducts = async (name) => {
  console.log("AXIOS : ", name);
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/product/other-products`,
    data: {
      name,
    },
  });
  return result;
};
const createReview = async (jwt, id, star, text) => {
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/product/create-review`,
    headers: {
      authorization: `Bearer ${jwt}`,
    },
    data: {
      id: id,
      star: star,
      text: text,
    },
  });
  return result;
};
const getReviews = async (id) => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/product/get-reviews/${id}`,
  });
  return result;
};
export {
  newArrival,
  categories,
  categorySlug,
  variety,
  parentVariety,
  singleProduct,
  trending,
  best,
  otherProducts,
  createReview,
  getReviews,
};
