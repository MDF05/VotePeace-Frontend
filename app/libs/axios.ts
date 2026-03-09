import axios from "axios";
import Cookies from "js-cookie";

export const apiAxios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
});

apiAxios.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});