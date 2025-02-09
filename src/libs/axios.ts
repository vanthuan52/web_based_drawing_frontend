import axiosClient from "axios";
import { Config } from "~/config";
import { ACCESS_TOKEN } from "~/constant/string";

const instance = axiosClient.create({
  baseURL: Config.DOMAIN + "api/v1" || "http://localhost:5002/api/v1",
  withCredentials: false,
});

// Add a request interceptor
instance.interceptors.request.use(
  async function (config) {
    // Do something before request is sent
    if (
      typeof window !== "undefined" &&
      window &&
      window.localStorage &&
      window.localStorage.getItem(ACCESS_TOKEN)
    ) {
      const token = window.localStorage.getItem(ACCESS_TOKEN);
      config.headers.Authorization = `Bearer ${token}`;
    }

    if (!config.headers.Accept && config.headers["Content-Type"]) {
      config.headers.Accept = "application/json";
      config.headers["Content-Type"] = "application/json; charset=utf-8";
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error?.response?.data) {
      return Promise.reject(error.response.data);
    }

    return Promise.reject(error);
  }
);

export default instance;
