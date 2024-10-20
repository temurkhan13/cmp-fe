import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import config from '../../config/config';
//import { RootState } from '../store'; // Adjust the import path as needed

const baseURL = `${config.apiURL}/`;
//const baseURL = 'http://localhost:3000/api/';
const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: (headers, { getState }) => {
    // Get the access token from the state
    const state = getState();
    //const token = state.auth.accessToken;
    const token = localStorage.getItem('token');

    // If we have a token, set it in the headers
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export default baseQuery;
