import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../../config/config';

const baseURL = `${config.apiURL}/`;

const rawBaseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

let isRedirecting = false;

const baseQuery = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401 && !isRedirecting) {
    const path = window.location.pathname;
    if (path !== '/log-in' && path !== '/sign-up' && path !== '/' && !path.startsWith('/privacy') && !path.startsWith('/terms')) {
      isRedirecting = true;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('userId');
      localStorage.removeItem('accessToken');
      setTimeout(() => {
        window.location.href = '/log-in';
      }, 0);
    }
  }

  return result;
};

export default baseQuery;
