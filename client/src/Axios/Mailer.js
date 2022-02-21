import axios from "axios";

const sendAboutUsMail = async (data) => {
  console.log(data);
  const result = await axios({
    method: "POST",
    url: `${process.env.REACT_APP_BACKEND_URL}/mail/about-us`,
    data: data,
  });
  return result;
};

export { sendAboutUsMail };
