// import axios from "axios";
// const base_url = "http://139.59.4.99:3000/api";

// const apiClient = axios.create({
//   baseURL: base_url,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
// });

// export default apiClient;

// auth.js
let token = "";

export const setToken = (newToken) => {
  token = newToken;
};

export const getToken = () => {
  return token;
};
