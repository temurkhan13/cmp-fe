import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/axios';
import config from '../../config/config';
import { workspaceApi } from '../api/workspaceApi'; // Import the workspaceApi

// Thunk for updating workspace activation status
export const updateWorkspaceStatus = createAsyncThunk(
  'workspaces/updateWorkspaceStatus',
  async ({ workspaceId, isActive }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await apiClient.patch(
        `${config.apiURL}/workspace/${workspaceId}`,
        { isActive },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue('ERROR', error.response.data);
    }
  }
);

// Fetch dashboard stats thunk
export const fetchDashboardStats = createAsyncThunk(
  'workspaces/fetchDashboardStats',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await apiClient.get(
        `${config.apiURL}/workspace/user/dashboard-stats`,
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

const workspacesSlice = createSlice({
  name: 'workspaces',
  initialState: {
    workspaces: [],
    selectedWorkspace: null,
    currentWorkspaceId: null,
    selectedFolder: null,
    currentFolderId: null,
    currentChatId: null,
    currentAssessmentId: null,
    currentSelectedTitle: '',
    dashboardStats: null, // New state for dashboard stats
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedWorkspace: (state, action) => {
      const selectedWorkspace = action.payload;
      state.selectedWorkspace = selectedWorkspace;
      state.currentWorkspaceId = selectedWorkspace.id;

      // Dispatch the updateWorkspaceStatus thunk to patch the workspace status
      updateWorkspaceStatus({
        workspaceId: selectedWorkspace.id,
        isActive: true,
      });
    },
    setSelectedFolder: (state, action) => {
      state.selectedFolder = action.payload;
      state.currentFolderId = action.payload?._id || action.payload?.id || null;
    },
    setCurrentChatId: (state, action) => {
      state.currentChatId = action.payload;
    },
    setCurrentAssessmentId: (state, action) => {
      state.currentAssessmentId = action.payload;
    },
    setCurrentSelectedTitle: (state, action) => {
      state.currentSelectedTitle = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Handle the fetchDashboardStats thunk
    builder
      .addCase(fetchDashboardStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDashboardStats.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.dashboardStats = payload;
        // Only set workspace if none is currently selected
        if (!state.selectedWorkspace && payload.workspaces && payload.workspaces.length > 0) {
          const activeWorkspace =
            payload.workspaces.find((workspace) => workspace.isActive) ||
            (payload.results && payload.results[0]);
          state.selectedWorkspace = activeWorkspace;
          state.currentWorkspaceId = activeWorkspace?.id;
        }
      })
      .addCase(fetchDashboardStats.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      // Handle the updateWorkspaceStatus thunk
      .addCase(updateWorkspaceStatus.fulfilled, (state, action) => {
        const updatedWorkspace = state.workspaces.find(
          (ws) => ws.id === action.payload.id
        );
        if (updatedWorkspace) {
          updatedWorkspace.isActive = action.payload.isActive;
        }
      })
      .addCase(updateWorkspaceStatus.rejected, (state, { payload }) => {
        state.error = payload;
      });

    // Use the matcher from workspaceApi
    builder.addMatcher(
      workspaceApi.endpoints.getWorkspaces.matchFulfilled,
      (state, { payload }) => {
        // Always update the workspaces list with fresh data
        state.workspaces = payload.results;

        // Only set workspace/folder selection if none is currently selected
        // (e.g., first visit or after logout). On page reload, redux-persist
        // rehydrates the previous selection — we must not overwrite it with
        // the backend's isActive flag, which may point to a different workspace.
        if (!state.selectedWorkspace) {
          const activeWorkspace =
            payload.results.find((workspace) => workspace.isActive) ||
            payload.results[0];
          if (activeWorkspace) {
            state.selectedWorkspace = activeWorkspace;
            state.currentWorkspaceId = activeWorkspace?.id;
            const activeFolder =
              activeWorkspace?.folders?.find((folder) => folder.isActive) ||
              (activeWorkspace.folders && activeWorkspace.folders[0]);
            if (activeFolder) {
              state.selectedFolder = activeFolder;
              state.currentFolderId = activeFolder?.id;
            }
          }
        } else {
          // Workspace already selected (persisted) — refresh its data from
          // the API response so folders/metadata stay up-to-date without
          // changing which workspace is selected.
          const refreshed = payload.results.find(
            (ws) => ws.id === state.currentWorkspaceId
          );
          if (refreshed) {
            state.selectedWorkspace = refreshed;
          }
        }
      }
    );
  },
});

export const {
  setSelectedWorkspace,
  setCurrentChatId,
  setCurrentAssessmentId,
  setSelectedFolder,
  setCurrentSelectedTitle,
} = workspacesSlice.actions;

// Selectors
export const selectWorkspace = (state) => state.workspaces.selectedWorkspace;
export const selectDashboardStats = (state) => state.workspaces.dashboardStats;
export const selectLoading = (state) => state.workspaces.loading;
export const selectError = (state) => state.workspaces.error;

export default workspacesSlice.reducer;
