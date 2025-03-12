import axios from "axios";
import { getToken } from "../../utils/authUtilHandler";
// import { THROTTLE_MESSAGE, GENERAL_ERROR_MESSAGE } from "@/constants/constants";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${getToken()}`,
  },
});

instance.interceptors.request.use(
  async (config) => {
    const token = getToken();

    if (token) {
      // add token to header
      // sample code: config.headers['header name'] = `expected token header format e.g Bearer ${token}`;
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // config.headers["app-access"] = `${process.env.REACT_APP_PLATFORM_ACCESS}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// this prevents react query from catching the errors that's why its commented out
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (
      error?.response?.data?.statusCode === 401 &&
      (error?.response?.config?.url === "auth/login" ||
        error?.response?.config?.url === "auth/reset-password")
    ) {
      return Promise.reject(error);
    }
    if (
      error?.response?.data?.statusCode === 401 &&
      error?.response?.config?.url !== "auth/login"
    ) {
      return Promise.reject(error);
    }

    if (
      error?.response?.data?.statusCode === 429 &&
      error?.response?.data?.message === "THROTTLE_MESSAGE"
    ) {
      return Promise.reject({
        response: {
          data: {
            message: "GENERAL_ERROR_MESSAGE",
            statusCode: 429,
          },
        },
      });
    }
    return Promise.reject(error);

    // if (error.response.status === 400) {
    //   return error.response
    // }
    // if (error.response.status === 500 || error.response.status === 503) {
    // }
  }
);

export default instance;
