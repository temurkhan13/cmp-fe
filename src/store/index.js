// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import businessInfoReducer from './businessInfoSlice';

const store = configureStore({
  reducer: {
    businessInfo: businessInfoReducer,
  },
});

export default store;

