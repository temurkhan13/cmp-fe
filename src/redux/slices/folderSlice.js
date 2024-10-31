import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config/config';

// Thunk to fetch folder data
export const fetchFolderData = createAsyncThunk(
  'folder/fetchFolderData',
  async ({ workspaceId, folderId }, { rejectWithValue }) => {
    try {
      console.log(folderId, 'folderId');
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${config.apiURL}/workspace/${workspaceId}/folder/${folderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Thunk to toggle folder activation status
export const toggleFolderActivation = createAsyncThunk(
  'folder/toggleFolderActivation',
  async ({ workspaceId, folderId, isActive }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.patch(
        `${config.apiURL}/workspace/${workspaceId}/folder/${folderId}`,
        { isActive },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return { folderId, isActive: response.data.isActive }; // Return folderId and isActive status
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const folderSlice = createSlice({
  name: 'folder',
  initialState: {
    selectedFolder: null,
    folderData: null,  // Ensure folderData is initialized as null
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedFolder: (state, action) => {
      state.selectedFolder = action.payload;
    },
    resetFolderState: (state) => {
      state.selectedFolder = null;
      state.folderData = null; // Explicitly reset folderData when switching workspaces
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFolderData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFolderData.fulfilled, (state, action) => {
        state.loading = false;
        state.folderData = action.payload;
      })
      .addCase(fetchFolderData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Handle folder activation toggle
      .addCase(toggleFolderActivation.pending, (state) => {
        state.loading = true;
      })
      .addCase(toggleFolderActivation.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (state.folderData && state.folderData._id === payload.folderId) {
          state.folderData.isActive = payload.isActive; // Update the folder activation status in the state
        }
      })
      .addCase(toggleFolderActivation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedFolder, resetFolderState } = folderSlice.actions;

// Selector to get the selected folder
export const selectSelectedFolder = (state) => state.folder.selectedFolder;

// Selector to get folder data
export const selectFolderData = (state) => state.folder.folderData;

export default folderSlice.reducer;
