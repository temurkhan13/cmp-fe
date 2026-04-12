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

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      localStorage.removeItem('accessToken');
      if (window.location.pathname !== '/log-in' && window.location.pathname !== '/sign-up') {
        window.location.href = '/log-in';
      }
    }
    return Promise.reject(error);
  }
);

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export default apiClient;
