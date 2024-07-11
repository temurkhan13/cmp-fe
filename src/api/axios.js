// import axios from 'axios';

// const baseURL = 'http://139.59.4.99:3000/api';

// const apiClient = axios.create({
//   baseURL: baseURL,
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//     'Access-Control-Allow-Origin': '*', // Add this header
//     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', // Allow specific methods
//     'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token', // Allow specific headers
//   },
// });

// apiClient.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers['Authorization'] = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// export const setToken = (token) => {
//   localStorage.setItem('token', token);
// };

// export default apiClient;

import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://139.59.4.99:3000/api',
  //baseURL: 'http://localhost:5173/api',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export default apiClient;
