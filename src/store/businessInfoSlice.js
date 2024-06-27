// src/store/businessInfoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  lastName: '',
  role: '',
  industry: '',
  companySize: '',
  companyName: '',
  websiteURL: '',
  jobTitle: '',
};

const businessInfoSlice = createSlice({
  name: 'businessInfo',
  initialState,
  reducers: {
    setBusinessInfo: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setBusinessInfo } = businessInfoSlice.actions;

export default businessInfoSlice.reducer;
