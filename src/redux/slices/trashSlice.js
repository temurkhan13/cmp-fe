import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import config from '../../config/config';

const initialState = {
  trashItems: {
    workspaces: [],
    folders: [],
    chats: [],
    assessments: [],
  },
  isLoading: false,
  error: null,
};

// Async thunk to fetch trash items
export const fetchTrashItemsAsync = createAsyncThunk(
  'trash/fetchTrashItems',
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `${config.apiURL}/workspace/user/trash`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Failed to fetch trash items'
      );
    }
  }
);

// Async thunk to restore an item from trash
export const restoreFromTrashAsync = createAsyncThunk(
  'trash/restoreFromTrash',
  async ({ type, id }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const url = `${config.apiURL}/workspace/${type}/${id}/restoreFromTrash`;
      const response = await axios.patch(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Failed to restore item from trash'
      );
    }
  }
);

// Async thunk to permanently delete an item from trash
export const deleteFromTrashAsync = createAsyncThunk(
  'trash/deleteFromTrash',
  async ({ type, id }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');
      const url = `${config.apiURL}/workspace/${type}/${id}/deleteFromTrash`;
      const response = await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Failed to delete item from trash'
      );
    }
  }
);

// Create trashSlice
const trashSlice = createSlice({
  name: 'trash',
  initialState,
  reducers: {
    resetTrashState: (state) => {
      state.trashItems = {
        workspaces: [],
        folders: [],
        chats: [],
        assessments: [],
      };
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch trash items
      .addCase(fetchTrashItemsAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTrashItemsAsync.fulfilled, (state, action) => {
        state.trashItems = action.payload;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(fetchTrashItemsAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch trash items';
      })
      // Restore item from trash
      .addCase(restoreFromTrashAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(restoreFromTrashAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(restoreFromTrashAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to restore item from trash';
      })
      // Delete item from trash
      .addCase(deleteFromTrashAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(deleteFromTrashAsync.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteFromTrashAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to delete item from trash';
      });
  },
});

export default trashSlice.reducer;
export const { resetTrashState } = trashSlice.actions;
export {
  fetchTrashItemsAsync as fetchTrashItems,
  restoreFromTrashAsync as restoreFromTrash,
  deleteFromTrashAsync as deleteFromTrash,
};
