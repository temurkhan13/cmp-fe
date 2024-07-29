// src/redux/thunks/fetchWorkspacesData.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setWorkspaces } from '../slices/workspaceSlice';
import { setFolders } from '../slices/folderSlice';
import { setChats } from '../slices/chatSlice';

export const fetchWorkspacesData = createAsyncThunk(
  'data/fetchWorkspacesData',
  async (_, thunkAPI) => {
    try {
      const response = await fetch('/api/workspaces'); // Adjust the API endpoint as needed
      const data = await response.json();

      // Assuming data contains workspaces, folders, and chats
      const { workspaces, folders, chats } = data;

      thunkAPI.dispatch(setWorkspaces(workspaces));
      thunkAPI.dispatch(setFolders(folders));
      thunkAPI.dispatch(setChats(chats));

      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
