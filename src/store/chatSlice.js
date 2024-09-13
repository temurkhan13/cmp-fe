// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// //import apiClient from '@api/axios';
// import { fetchUserShareData } from '../hooks/useManagerUser';
// //import useManagerUser from '@hooks/useManagerUser';

// Async thunk for fetching shared users
// export const fetchSharedUsers = createAsyncThunk(
//   'chat/fetchSharedUsers',
//   async (chatId) => {
//     const response = await fetchUserShareData(chatId);
//     console.log('Thunk response data:', response);
//     return response.data;
//   }
// );

// export const fetchSharedUsers = createAsyncThunk(
//     'chat/fetchSharedUsers',
//     async (chatId, { rejectWithValue }) => { nooot Needed above one is working fine
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

//Chat Slice working
// const chatSlice = createSlice({
//   name: 'chat',
//   initialState: {
//     currentChatId: null,
//     sharedUsers: [],
//   },
//   reducers: {
//     setCurrentChat(state, action) {
//         console.log(action.payload.chatId);
//       state.currentChatId = action.payload.chatId;
//     },
//     addSharedUser(state, action) {
//         console.log(action.payload);
//       state.sharedUsers.push(action.payload);
//     },
//     removeSharedUser(state, action) {
//       state.sharedUsers = state.sharedUsers.filter(
//         (user) => user.name !== action.payload
//       );
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSharedUsers.fulfilled, (state, action) => {
//         console.log('Action payload in fulfilled case:', action.payload);
//         state.sharedUsers = action.payload;
//       })
//       .addCase(fetchSharedUsers.rejected, (state, action) => {
//         console.log('Action payload in rejected case:', action.payload);
//         state.error = action.payload;
//       });
//   },
// });

// export const { setCurrentChat, addSharedUser, removeSharedUser } = chatSlice.actions;
// export default chatSlice.reducer;

//chatSlice with additional features

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import apiClient from '@api/axios';
import { fetchUserShareData } from '../hooks/useManagerUser';
//import { } from '';

// Async thunk for fetching shared users
export const fetchSharedUsers = createAsyncThunk(
  'chat/fetchSharedUsers',
  async (chatId) => {
    const response = await fetchUserShareData(chatId);
    console.log('Thunk response data:', response);
    return response.data;
  }
);
// Async thunks for fetching and updating chat data
export const fetchChat = createAsyncThunk('chat/fetchChat', async (chatId) => {
  const response = await apiClient.get(`/chat/${chatId}`);
  console.log('Thunk response data:', response);
  return response.data;
});

export const updateChatVersion = createAsyncThunk(
  'chat/updateVersion',
  async ({ chatId, newVersion }) => {
    const response = await apiClient.put(`/chat/${chatId}/version`, {
      version: newVersion,
    });
    console.log('Thunk response data:', response);
    return response.data;
  }
);

// Define the initial state
const initialState = {
  sharedUsers: [],
  currentChat: null,
  loading: false,
  error: null,
};

// Create the chat slice
const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setCurrentChat(state, action) {
      state.currentChat = action.payload;
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
    addComment(state, action) {
      state.currentChat.comments.push(action.payload);
    },
    addBookmark(state, action) {
      state.currentChat.bookmarks.push(action.payload);
    },
    addMedia(state, action) {
      state.currentChat.media.push(action.payload);
    },
    addReplyToComment(state, action) {
      const { commentId, reply } = action.payload;
      const comment = state.currentChat.comments.find(
        (comment) => comment.commentId === commentId
      );
      if (comment) {
        comment.replies.push(reply);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChat.fulfilled, (state, action) => {
        state.currentChat = action.payload;
        state.loading = false;
      })
      .addCase(fetchChat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateChatVersion.fulfilled, (state, action) => {
        state.currentChat.version = action.payload.version;
      })
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

export const {
  setCurrentChat,
  addSharedUser,
  removeSharedUser,
  addComment,
  addBookmark,
  addMedia,
  addReplyToComment,
} = chatSlice.actions;
export default chatSlice.reducer;
