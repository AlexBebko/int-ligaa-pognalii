import axios from "axios";
import { StatusCodes } from "http-status-codes";
import { toast } from "react-toastify";
import { getToken } from "./token";

const BACKEND_URL = 'https://pognali-api-g4bd.onrender.com/api/';
const REQUEST_TIMEOUT = 5000;

const StatusCodeMaping = {
  [StatusCodes.BAD_REQUEST]: true,
  [StatusCodes.UNAUTHORIZED]: true,
  [StatusCodes.NOT_FOUND]: true,
};

const shouldDisplayError = (response) => StatusCodeMaping[response.status];

export const createAPI = () => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token && config.headers) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if(error.response && shouldDisplayError(error.response)){
        const detailMessage = error.response.data;
        toast.warn(detailMessage.message);
      }
      throw error;
    }
  );

  return api;
};
