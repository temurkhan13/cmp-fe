import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config/config';
import { workspaceApi } from '../api/workspaceApi'; // Import the workspaceApi

// Fetch dashboard stats thunk
export const fetchDashboardStats = createAsyncThunk(
  'workspaces/fetchDashboardStats',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${config.apiURL}/workspace/user/dashboard-stats`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
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
      state.selectedWorkspace = action.payload;
      state.currentWorkspaceId = action.payload.id;
    },
    setSelectedFolder: (state, action) => {
      state.selectedFolder = action.payload;
      state.currentFolderId = action.payload._id;
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
        // Set the first workspace as default
        if (payload.workspaces && payload.workspaces.length > 0) {
          state.selectedWorkspace = payload.workspaces[0];
          state.currentWorkspaceId = payload.workspaces[0].id;
        }
      })
      .addCase(fetchDashboardStats.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // Use the matcher from workspaceApi
    builder.addMatcher(
      workspaceApi.endpoints.getWorkspaces.matchFulfilled,
      (state, { payload }) => {
        state.workspaces = payload.results;
        state.selectedWorkspace = payload.results[0]; // Select first workspace by default if none is selected
        state.currentWorkspaceId = state.selectedWorkspace.id;
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
