import _axios, { AxiosRequestConfig } from "axios";
import { store } from "./index";
const instance = _axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    const state = store.getState();
    if (request.headers) {
      request.headers.Authorization = `Bearer ${state.auth.data?.token}`;
    }
    return request;
  },
  (error) => Promise.reject(error)
);

export const api = {
  get: (endpoint: string) => instance.get(endpoint),
  post: (endpoint: string, data = {}) => instance.post(endpoint, data),
  put: (endpoint: string, data = {}) => instance.put(endpoint, data),
  delete: (endpoint: string) => instance.delete(endpoint),
};
