// workspaceSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { workspaceApi } from '../api/workspaceApi';

const workspacesSlice = createSlice({
  name: 'workspaces',
  initialState: { 
    workspaces: [],
    selectedWorkspace: null,
    currentWorkspaceId: null,
    currentFolderId:"66a500bef6d2341978d6d4b9",
    currentChatId:"66a500bef6d2341978d6d4ba",
   },
  reducers: {
    setSelectedWorkspace: (state, action) => {
      state.selectedWorkspace = action.payload;
      state.currentWorkspaceId = action.payload.id;
    },
    setCurrentChatId: (state,action) => {
      state.currentChatId = action.payload;
    },
  },
  extraReducers: (builder) => {
    // When getWorkspacesQuery is fulfilled, automatically store workspaces in Redux
    builder.addMatcher(
      workspaceApi.endpoints.getWorkspaces.matchFulfilled,
      (state, { payload }) => {
        state.workspaces = payload.results;
        state.selectedWorkspace = payload.results[0]; // Select first workspace by default if none is selected
        state.currentWorkspaceId = state.selectedWorkspace.id;
        if (!state.selectedWorkspace && payload.length > 0) {
          state.workspaces.selectedWorkspace = payload.results[0]; // Select first workspace by default if none is selected
        }
      }
    );
    // builder.addMatcher(
    //   workspaceApi.endpoints.getWorkspace.matchFulfilled,
    //   (state, { payload }) => {
    //     state.selectedWorkspace = payload;
    //     state.currentWorkspaceId = payload.id;
    //   }
    // );
  },
});

export const { setSelectedWorkspace,setCurrentChatId } = workspacesSlice.actions;
export const selectWorkspace = (state) => state.workspaces.selectedWorkspace;
export default workspacesSlice.reducer;
