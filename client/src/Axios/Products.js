import axios from "axios";

const newArrival = async () => {
  const result = await axios({
    method: "GET",
    url: `${process.env.REACT_APP_BACKEND_URL}/new-arrivals`,
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

export { newArrival, categories };
