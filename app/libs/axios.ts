import axios from "axios";

export const apiAxios = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_API,
});

apiAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});