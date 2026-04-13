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

let isRedirecting = false;

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && !isRedirecting) {
      const path = window.location.pathname;
      // Only redirect if user is on a protected page (not auth pages)
      if (path !== '/log-in' && path !== '/sign-up' && path !== '/' && !path.startsWith('/privacy') && !path.startsWith('/terms')) {
        isRedirecting = true;
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        localStorage.removeItem('accessToken');
        // Use setTimeout to avoid interrupting React render cycle
        setTimeout(() => {
          window.location.href = '/log-in';
        }, 0);
      }
    }
    return Promise.reject(error);
  }
);

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export default apiClient;
