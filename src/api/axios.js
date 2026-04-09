import axios from 'axios';
import config from '../config/config';

const apiClient = axios.create({
  baseURL: config.apiURL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (reqConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      reqConfig.headers['Authorization'] = `Bearer ${token}`;
    }
    return reqConfig;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export default apiClient;
