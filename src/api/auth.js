// import axios from "axios";

// const apiClient = axios.create({
//   baseURL: base_url,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
// });

// export default apiClient;

// auth.js
let token = '';

export const setToken = (newToken) => {
  token = newToken;
};

export const getToken = () => {
  return token;
};
