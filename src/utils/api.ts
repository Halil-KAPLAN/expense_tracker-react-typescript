import axios from "axios";

const token = localStorage.getItem("token");

export default axios.create({
  baseURL: process.env.REACT_APP_APIURL,
  headers: {
    Authorization: token,
  },
});
