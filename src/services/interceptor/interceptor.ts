// interceptor/interceptor.ts
import axios, { AxiosResponse, AxiosError } from "axios";
import { getItem, removeItem } from "../common/storage";

const baseURL = import.meta.env.VITE_BASE_URL;

const instance = axios.create({
  baseURL,
});

interface ResponseData {
  data: any;
}

const onSuccess = (response: AxiosResponse<ResponseData>) => {
  return response;
};

const onError = (error: AxiosError) => {
  if (error.response && error.response.status !== undefined) {
    if (error.response.status === 401) {
      removeItem("token");
    }
    if (error.response.status >= 404 && error.response.status < 500) {
      alert(`Client Error: ${error.response.status}`);
    }
  }
  return Promise.reject(error);
};

instance.interceptors.response.use(onSuccess, onError);

instance.interceptors.request.use((opt) => {
  const token = getItem("token");
  if (token) opt.headers.Authorization = "Bearer " + token;
  return opt;
});

export default instance;
