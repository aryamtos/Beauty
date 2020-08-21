import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.15.41:4444",
});

export default api;
