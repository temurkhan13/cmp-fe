// src/redux/slices/chatSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import apiClient from '../../api/axios';

export const getChatsAsync = createAsyncThunk(
  'chat/getChats',
  async ({ workspaceId, folderId }, thunkAPI) => {
    try {
      const response = await apiClient.get(
        `/workspace/${workspaceId}/folder/${folderId}/chat`,
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

const initialState = {
  selectedChatId: '',
  selectedWorkspaceId: null,
  selectedFolderId: null,
  chats: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChats: (state, action) => {
      state.chats = action.payload;
    },
    setSelectedChatId: (state, action) => {
      state.selectedChatId = action.payload;
    },
    setSelectedWorkspaceId: (state, action) => {
      state.selectedWorkspaceId = action.payload;
    },
    setSelectedFolderId: (state, action) => {
      state.selectedFolderId = action.payload;
    },
    addComment: (state, action) => {
      const { workspaceId, folderId, chatId, comment } = action.payload;
      const workspace = state.chats.find((w) => w.workspaceId === workspaceId);
      if (workspace) {
        const folder = workspace.folders.find((f) => f.folderId === folderId);
        if (folder) {
          const chat = folder.chats.find((chat) => chat.chatId === chatId);
          if (chat) {
            const newComment = {
              text: comment,
              timestamp: format(new Date(), 'yyyy-MM-dd hh:mm:ssa'),
              commentId: uuidv4(),
              userName: 'Raphale', // This should be the authenticated user
              replies: [],
            };
            chat.comments.push(newComment);
          }
        }
      }
    },
    updateComment: (state, action) => {
      const { workspaceId, folderId, chatId, commentId, updatedComment } =
        action.payload;
      const workspace = state.chats.find((w) => w.workspaceId === workspaceId);
      if (workspace) {
        const folder = workspace.folders.find((f) => f.folderId === folderId);
        if (folder) {
          const chat = folder.chats.find((chat) => chat.chatId === chatId);
          if (chat) {
            const commentIndex = chat.comments.findIndex(
              (c) => c.commentId === commentId
            );
            if (commentIndex !== -1) {
              chat.comments[commentIndex].text = updatedComment;
            }
          }
        }
      }
    },
    deleteComment: (state, action) => {
      const { workspaceId, folderId, chatId, commentId } = action.payload;
      const workspace = state.chats.find((w) => w.workspaceId === workspaceId);
      if (workspace) {
        const folder = workspace.folders.find((f) => f.folderId === folderId);
        if (folder) {
          const chat = folder.chats.find((chat) => chat.chatId === chatId);
          if (chat) {
            chat.comments = chat.comments.filter(
              (c) => c.commentId !== commentId
            );
          }
        }
      }
    },
    addReply: (state, action) => {
      const { workspaceId, folderId, chatId, commentId, reply } =
        action.payload;
      const workspace = state.chats.find((w) => w.workspaceId === workspaceId);
      if (workspace) {
        const folder = workspace.folders.find((f) => f.folderId === folderId);
        if (folder) {
          const chat = folder.chats.find((chat) => chat.chatId === chatId);
          if (chat) {
            const comment = chat.comments.find(
              (c) => c.commentId === commentId
            );
            if (comment) {
              const newReply = {
                text: reply,
                timestamp: format(new Date(), 'yyyy-MM-dd hh:mm:ssa'),
                replyId: uuidv4(),
                userName: 'Raphale', // This should be the authenticated user
              };
              comment.replies.push(newReply);
            }
          }
        }
      }
    },
    updateReply: (state, action) => {
      const {
        workspaceId,
        folderId,
        chatId,
        commentId,
        replyId,
        updatedReply,
      } = action.payload;
      const workspace = state.chats.find((w) => w.workspaceId === workspaceId);
      if (workspace) {
        const folder = workspace.folders.find((f) => f.folderId === folderId);
        if (folder) {
          const chat = folder.chats.find((chat) => chat.chatId === chatId);
          if (chat) {
            const comment = chat.comments.find(
              (c) => c.commentId === commentId
            );
            if (comment) {
              const replyIndex = comment.replies.findIndex(
                (r) => r.replyId === replyId
              );
              if (replyIndex !== -1) {
                comment.replies[replyIndex].text = updatedReply;
              }
            }
          }
        }
      }
    },
    deleteReply: (state, action) => {
      const { workspaceId, folderId, chatId, commentId, replyId } =
        action.payload;
      const workspace = state.chats.find((w) => w.workspaceId === workspaceId);
      if (workspace) {
        const folder = workspace.folders.find((f) => f.folderId === folderId);
        if (folder) {
          const chat = folder.chats.find((chat) => chat.chatId === chatId);
          if (chat) {
            const comment = chat.comments.find(
              (c) => c.commentId === commentId
            );
            if (comment) {
              comment.replies = comment.replies.filter(
                (r) => r.replyId !== replyId
              );
            }
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    // Handle async thunks if any
  },
});

export const {
  setChats,
  setSelectedChatId,
  setSelectedWorkspaceId,
  setSelectedFolderId,
  addComment,
  updateComment,
  deleteComment,
  addReply,
  updateReply,
  deleteReply,
} = chatSlice.actions;

export default chatSlice.reducer;
