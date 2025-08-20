import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // comes from .env
  withCredentials: true // keep if using cookies/auth
});

export default api;
