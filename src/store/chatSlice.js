import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import apiClient from '@api/axios';
import { fetchUserShareData } from '../hooks/useManagerUser';
//import useManagerUser from '@hooks/useManagerUser';

 // Async thunk for fetching shared users
export const fetchSharedUsers = createAsyncThunk(
  'chat/fetchSharedUsers',
  async (chatId) => {
    const response = await fetchUserShareData(chatId);
    console.log('Thunk response data:', response);
    return response.data;
  }
);

// export const fetchSharedUsers = createAsyncThunk(
//     'chat/fetchSharedUsers',
//     async (chatId, { rejectWithValue }) => {
//       // Import the hook
//       const { fetchUserShareData } = useManagerUser();
//       console.log("Thunk response Chat A: "+ chatId);
//       try {
//         const response = await fetchUserShareData(chatId);
//         console.log("Thunk response: "+ response);
//         return response; // Ensure the correct data is returned
//       } catch (error) {
//         return rejectWithValue(error.message);
//       }
//     }
//   );


const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    currentChatId: null,
    sharedUsers: [],
  },
  reducers: {
    setCurrentChat(state, action) {
        console.log(action.payload.chatId);
      state.currentChatId = action.payload.chatId;
    },
    addSharedUser(state, action) {
        console.log(action.payload);
      state.sharedUsers.push(action.payload);
    },
    removeSharedUser(state, action) {
      state.sharedUsers = state.sharedUsers.filter(
        (user) => user.name !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSharedUsers.fulfilled, (state, action) => {
        console.log('Action payload in fulfilled case:', action.payload);
        state.sharedUsers = action.payload;
      })
      .addCase(fetchSharedUsers.rejected, (state, action) => {
        console.log('Action payload in rejected case:', action.payload);
        state.error = action.payload;
      });
  },
});

export const { setCurrentChat, addSharedUser, removeSharedUser } = chatSlice.actions;
export default chatSlice.reducer;
