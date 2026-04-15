import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '../../api/axios';
import config from '../../config/config.js';
const initialState = {
  users: [],
  loading: false,
  error: null,
};

const baseURL = `${config.apiURL}/auth`; // Change this as per your API


// Async thunk action to handle user update
const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async ({ userId, updatedUserData, photoPath, removePhoto }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token');

      const url = `${baseURL}/users/${userId}`;

      // If a new photo file is provided, upload it via FormData
      if (photoPath) {
        const formData = new FormData();
        formData.append('photoPath', photoPath);
        Object.entries(updatedUserData).forEach(([key, value]) => {
          if (value !== undefined) formData.append(key, value);
        });

        const response = await apiClient.patch(url, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        return response.data;
      }

      // If photo was deleted, include photoPath: '' to clear it on the server
      const payload = { ...updatedUserData };
      if (removePhoto) {
        payload.photoPath = '';
      }

      const response = await apiClient.patch(url, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || 'Update failed');
    }
  }
);



const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload;
    },
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload;
      const index = state.users.findIndex((user) => user.userId === updatedUser.userId);
      if (index !== -1) {
        state.users[index] = updatedUser;
      }
    },
    deleteUser: (state, action) => {
      const userId = action.payload;
      state.users = state.users.filter((user) => user.userId !== userId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateUserAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserAsync.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.users.findIndex((user) => user.userId === updatedUser.userId);
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
        state.loading = false;
      })
      .addCase(updateUserAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Update failed';
      });
  },
});

// Export the reducer actions
export const { setUsers, addUser, updateUser, deleteUser } = userSlice.actions;

// Export the async action
export default userSlice.reducer;
export { updateUserAsync};
