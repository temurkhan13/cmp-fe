// src/redux/slices/workspaceSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  workspaces: [],
  loading: false,
  error: null,
};

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    setWorkspaces: (state, action) => {
      state.workspaces = action.payload;
    },
    addWorkspace: (state, action) => {
      state.workspaces.push(action.payload);
    },
    updateWorkspace: (state, action) => {
      const { workspaceId, updatedWorkspace } = action.payload;
      const workspaceIndex = state.workspaces.findIndex(ws => ws.workspaceId === workspaceId);
      if (workspaceIndex !== -1) {
        state.workspaces[workspaceIndex] = { ...state.workspaces[workspaceIndex], ...updatedWorkspace };
      }
    },
    deleteWorkspace: (state, action) => {
      state.workspaces = state.workspaces.filter(ws => ws.workspaceId !== action.payload);
    },
  },
});

export const { setWorkspaces, addWorkspace, updateWorkspace, deleteWorkspace } = workspaceSlice.actions;
export default workspaceSlice.reducer;
