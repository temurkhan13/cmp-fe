import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/axios';
import { workspaceApi } from '../api/workspaceApi'; // Import the workspaceApi

// Thunk for updating workspace activation status
export const updateWorkspaceStatus = createAsyncThunk(
  'workspaces/updateWorkspaceStatus',
  async ({ workspaceId, isActive }, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(
        `/workspace/${workspaceId}`,
        { isActive },
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
      const response = await apiClient.get('/workspace/user/dashboard-stats');
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
        if (!state.selectedWorkspace && payload.workspaces && payload.workspaces.length > 0) {
          const activeWorkspace =
            payload.workspaces.find((workspace) => workspace.isActive) ||
            (payload.results && payload.results[0]);
          state.selectedWorkspace = activeWorkspace;
          state.currentWorkspaceId = activeWorkspace?.id;
        } else if (state.selectedWorkspace && Array.isArray(payload.workspaces)) {
          // dashboardStats is the source of truth for folder lists (the
          // getWorkspaces endpoint doesn't populate them). If the stats
          // response includes folders for our selected workspace and our
          // current copy lacks them, sync them in.
          const fromStats = payload.workspaces.find(
            (ws) => ws.id === state.currentWorkspaceId
          );
          const hasIncomingFolders =
            Array.isArray(fromStats?.folders) && fromStats.folders.length > 0;
          const currentFolders = state.selectedWorkspace.folders;
          const needsHeal =
            !Array.isArray(currentFolders) || currentFolders.length === 0;
          if (hasIncomingFolders && needsHeal) {
            state.selectedWorkspace = {
              ...state.selectedWorkspace,
              folders: fromStats.folders,
            };
            // Also heal the workspace in the list so selectors see the folders.
            const listIndex = state.workspaces.findIndex(
              (ws) => ws.id === state.currentWorkspaceId
            );
            if (listIndex !== -1) {
              state.workspaces[listIndex] = {
                ...state.workspaces[listIndex],
                folders: fromStats.folders,
              };
            }
          }
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
        // getWorkspaces returns metadata only; folders come from
        // fetchDashboardStats. Preserve any folders we already hydrated.
        const previousWorkspaces = state.workspaces || [];
        const mergeFolders = (incoming) => {
          if (Array.isArray(incoming.folders) && incoming.folders.length > 0) {
            return incoming;
          }
          const existing = previousWorkspaces.find((w) => w.id === incoming.id);
          if (Array.isArray(existing?.folders) && existing.folders.length > 0) {
            return { ...incoming, folders: existing.folders };
          }
          return incoming;
        };

        state.workspaces = payload.results.map(mergeFolders);

        // only pick a default selection on first load. On reload, redux-persist
        // already rehydrated the user's selection; backend isActive may point
        // somewhere else and would clobber it.
        if (!state.selectedWorkspace) {
          const activeWorkspace =
            state.workspaces.find((workspace) => workspace.isActive) ||
            state.workspaces[0];
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
          // refresh the persisted selection from the API response,
          // keeping existing folders if the response doesn't include them.
          const refreshed = state.workspaces.find(
            (ws) => ws.id === state.currentWorkspaceId
          );
          if (refreshed) {
            const incomingFolders = refreshed.folders;
            const existingFolders = state.selectedWorkspace.folders;
            const finalFolders =
              Array.isArray(incomingFolders) && incomingFolders.length > 0
                ? incomingFolders
                : (Array.isArray(existingFolders) ? existingFolders : []);
            state.selectedWorkspace = { ...refreshed, folders: finalFolders };
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
