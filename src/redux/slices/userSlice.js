import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
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
  async ({ userId, updatedUserData, photoPath }, thunkAPI) => {
    try {
      const token = localStorage.getItem('token'); // Authorization token

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      // API base URL for user updates
      const url = `${baseURL}/users/${userId}`;

      // If photoPath exists, upload image using FormData
      if (photoPath) {
        const formData = new FormData();
        formData.append('photoPath', photoPath); // Key for the image file

        // Send image as FormData in a separate request
        await axios.patch(url, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      // Send other fields as JSON, if available
      if (Object.keys(updatedUserData).length > 0) {
        const response = await axios.patch(url, updatedUserData, config);
        const updatedUser = response.data;
        return updatedUser;
      }

      // If no fields were updated, return the current user (or any relevant data)
      return thunkAPI.fulfillWithValue('No fields updated');
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
