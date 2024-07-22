// src/redux/slices/folderSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  folders: [],
  loading: false,
  error: null,
};

const folderSlice = createSlice({
  name: 'folder',
  initialState,
  reducers: {
    setFolders: (state, action) => {
      state.folders = action.payload;
    },
    addFolder: (state, action) => {
      state.folders.push(action.payload);
    },
    updateFolder: (state, action) => {
      const { folderId, updatedFolder } = action.payload;
      const folderIndex = state.folders.findIndex(f => f.folderId === folderId);
      if (folderIndex !== -1) {
        state.folders[folderIndex] = { ...state.folders[folderIndex], ...updatedFolder };
      }
    },
    deleteFolder: (state, action) => {
      state.folders = state.folders.filter(f => f.folderId !== action.payload);
    },
  },
});

export const { setFolders, addFolder, updateFolder, deleteFolder } = folderSlice.actions;
export default folderSlice.reducer;
