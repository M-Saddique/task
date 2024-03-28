import axios from "axios";

const api = axios.create({
  baseURL: "http://3.232.244.22/",
  headers: {
    "Content-Type": "application/json;charset=UTF-8,multipart",
  },
});

api.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
