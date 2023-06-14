import axios from "axios";

const api = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: process.env.REACT_APP_APIURL,
    headers: {
      Authorization: token,
    },
  });
};

export default api;
