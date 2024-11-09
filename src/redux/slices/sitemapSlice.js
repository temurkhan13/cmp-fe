// src/store/businessInfoSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  siteMapName:''
};

const sitemapSlice = createSlice({
  name: 'sitemap',
  initialState,
  reducers: {
    setSiteMapName: (state, action) => {
    state.siteMapName = action.payload
    },
  },
});

export const { setSiteMapName } = sitemapSlice.actions;

export default sitemapSlice.reducer;
