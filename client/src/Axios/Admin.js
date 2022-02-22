import axios from "axios";

const loginAdmin = async (data) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/login`,
    method: "POST",
    data: data,
  });
  return result;
};

const verifyAdmin = async (data) => {
  const result = await axios({
    url: `${process.env.REACT_APP_BACKEND_URL}/admin/verify`,
    method: "GET",
    headers: {
      authorization: `Bearer ${data}`,
    },
  });
  return result;
};

export { loginAdmin, verifyAdmin };
