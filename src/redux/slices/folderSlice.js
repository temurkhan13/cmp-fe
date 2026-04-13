import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/axios';
import config from '../../config/config';

// Thunk to fetch folder data
export const fetchFolderData = createAsyncThunk(
  'folder/fetchFolderData',
  async ({ workspaceId, folderId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await apiClient.get(
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
    if (!workspaceId || !folderId) {
      return rejectWithValue('Workspace ID or Folder ID is missing.');
    }

    try {
      const token = localStorage.getItem('token');
      const response = await apiClient.patch(
        `${config.apiURL}/workspace/${workspaceId}/folder/${folderId}`,
        { isActive },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Extract the `isReportGenerated` values from assessments.report list if available
      const assessments = response.data.assessments || [];
      const reports = assessments.flatMap((assessment) =>
        (assessment.report || []).map((report) => ({
          isReportGenerated: report.isReportGenerated,
          ReportTitle: report.ReportTitle,
        }))
      );

      return { folderId, isActive, reports, response };
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Thunk to fetch assessments by folderId
export const fetchWorkspaceAssessments = createAsyncThunk(
  'folder/fetchWorkspaceAssessments',
  async ({ folderId }, { rejectWithValue }) => {
    try {
      if (!folderId) {
        throw new Error('Folder ID is required.');
      }

      const token = localStorage.getItem('token');
      const response = await apiClient.get(
        `${config.apiURL}/workspace-assessment?folderId=${folderId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

const folderSlice = createSlice({
  name: 'folder',
  initialState: {
    selectedFolder: null,
    folderData: null,
    assessments: null, // New state to store assessments data
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedFolder: (state, action) => {
      state.selectedFolder = action.payload;
    },
    resetFolderState: (state) => {
      state.selectedFolder = null;
      state.folderData = null;
      state.assessments = null; // Reset assessments when switching workspaces
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
      })
      // Handle fetching workspace assessments
      .addCase(fetchWorkspaceAssessments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWorkspaceAssessments.fulfilled, (state, action) => {
        state.loading = false;
        state.assessments = action.payload; // Store fetched assessments data
      })
      .addCase(fetchWorkspaceAssessments.rejected, (state, action) => {
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

// Selector to get assessments data
// export const selectAssessments = (state) => state.folder.assessments;

export default folderSlice.reducer;
