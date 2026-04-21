import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../../config/config';
import { forceLogout } from '../../utils/forceLogout';

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

let isRefreshing = false;
let refreshPromise = null;

const baseQuery = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      forceLogout();
      return result;
    }

    // If already refreshing, wait for that to complete
    if (isRefreshing && refreshPromise) {
      try {
        await refreshPromise;
        // Retry with new token
        return rawBaseQuery(args, api, extraOptions);
      } catch {
        return result;
      }
    }

    isRefreshing = true;
    refreshPromise = fetch(`${config.apiURL}/auth/refresh-tokens`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    }).then(async (res) => {
      if (!res.ok) throw new Error('Refresh failed');
      const data = await res.json();
      localStorage.setItem('token', data.access.token);
      localStorage.setItem('refreshToken', data.refresh.token);
      return data.access.token;
    });

    try {
      await refreshPromise;
      // Retry original request with new token
      result = await rawBaseQuery(args, api, extraOptions);
    } catch {
      forceLogout();
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  }

  return result;
};

export default baseQuery;
