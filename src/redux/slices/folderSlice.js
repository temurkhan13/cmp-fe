// src/redux/slices/folderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  folders: [],
  selectedFolderId: 'folderId1',
};

const folderSlice = createSlice({
  name: 'folder',
  initialState,
  reducers: {
    addFolder: (state, action) => {
      state.folders.push(action.payload);
    },
    removeFolder: (state, action) => {
      state.folders = state.folders.filter(
        (folder) => folder.folderId !== action.payload
      );
    },
    setSelectedFolderId: (state, action) => {
      state.selectedFolderId = action.payload;
    },
  },
});

export const {
  addFolder,
  removeFolder,
  setSelectedFolderId,
} = folderSlice.actions;

export default folderSlice.reducer;
