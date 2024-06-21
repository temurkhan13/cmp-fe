// import axios from "axios";

// const base_url = "http://139.59.4.99:3000/api";
// // const token =
// //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjU1ZjMyNDkyNTdlOGM4YjJhZTlmMTYiLCJpYXQiOjE3MTY5MDkzNzgsImV4cCI6MjY2MzYxNTc3OCwidHlwZSI6ImFjY2VzcyJ9.ynYDuVxg8glUhVg-n7JDcG56pUasOKSs2EDijHtTVuI";

// const apiClient = axios.create({
//   baseURL: base_url,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
// });

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token")
//     if (token) {
//       config.headers["Authorization"] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default apiClient;

// // const token =
// //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjU1ZjMyNDkyNTdlOGM4YjJhZTlmMTYiLCJpYXQiOjE3MTY5MDkzNzgsImV4cCI6MjY2MzYxNTc3OCwidHlwZSI6ImFjY2VzcyJ9.ynYDuVxg8glUhVg-n7JDcG56pUasOKSs2EDijHtTVuI";

// // import axios from "axios";
// // import {isTokenExpired } from "../api/refreshAccessToken"

// // const base_url = "http://139.59.4.99:3000/api";

// // const apiClient = axios.create({
// //   baseURL: base_url,
// //   headers: {
// //     Accept: "application/json",
// //     "Content-Type": "application/json",
// //   },
// // });

// // apiClient.interceptors.request.use(
// //   (config) => {

// //     // Access Token
// //     const newAccessToken = axios.defaults.accessTokenExpiry;
// //     const accessTokenExpiry = axios.defaults.accessTokenExpiry;

// //     //
// //     if (accessTokenExpiry && isTokenExpired(accessTokenExpiry)) {
// //       try {

// //         config.headers['Authorization'] = `Bearer ${newAccessToken}`;
// //       } catch (error) {
// //         console.error('Failed to refresh token:', error);
// //         // Optionally handle the error by redirecting to login or showing a message
// //       }
// //     } else {
// //       config.headers['Authorization'] = axios.defaults.headers.common['Authorization'];
// //     }
// //     //
// //     return config;
// //   },
// //   (error) => {
// //     return Promise.reject(error);
// //   }
// // );

// // export default apiClient;


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
    // const token = localStorage.getItem("token")
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

// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NjU1ZjMyNDkyNTdlOGM4YjJhZTlmMTYiLCJpYXQiOjE3MTY5MDkzNzgsImV4cCI6MjY2MzYxNTc3OCwidHlwZSI6ImFjY2VzcyJ9.ynYDuVxg8glUhVg-n7JDcG56pUasOKSs2EDijHtTVuI";

// import axios from "axios";
// import {isTokenExpired } from "../api/refreshAccessToken"

// const base_url = "http://139.59.4.99:3000/api";

// const apiClient = axios.create({
//   baseURL: base_url,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//   },
// });

// apiClient.interceptors.request.use(
//   (config) => {

//     // Access Token
//     const newAccessToken = axios.defaults.accessTokenExpiry;
//     const accessTokenExpiry = axios.defaults.accessTokenExpiry;

//     //
//     if (accessTokenExpiry && isTokenExpired(accessTokenExpiry)) {
//       try {

//         config.headers['Authorization'] = `Bearer ${newAccessToken}`;
//       } catch (error) {
//         console.error('Failed to refresh token:', error);
//         // Optionally handle the error by redirecting to login or showing a message
//       }
//     } else {
//       config.headers['Authorization'] = axios.defaults.headers.common['Authorization'];
//     }
//     //
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export default apiClient;
