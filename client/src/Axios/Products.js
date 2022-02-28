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
export {
  newArrival,
  categories,
  categorySlug,
  variety,
  parentVariety,
  singleProduct,
  trending,
  best,
};
