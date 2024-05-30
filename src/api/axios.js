import axios from "axios";

const base_url = "http://139.59.4.99:3000/api";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjU1ZjMyNDkyNTdlOGM4YjJhZTlmMTYiLCJpYXQiOjE3MTY5MDkzNzgsImV4cCI6MjY2MzYxNTc3OCwidHlwZSI6ImFjY2VzcyJ9.ynYDuVxg8glUhVg-n7JDcG56pUasOKSs2EDijHtTVuI";

const apiClient = axios.create({
  baseURL: base_url,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
