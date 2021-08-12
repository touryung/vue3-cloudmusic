import axios from "axios";
const COOKIE = "";

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

http.interceptors.response.use(
  (response) => (response.status === 200 ? response : null),
  (err) => Promise.reject(err)
);

export const getRequest = (url: string, params: any = {}) => {
  return http.get(url, { params: { ...params, cookie: COOKIE } });
};
