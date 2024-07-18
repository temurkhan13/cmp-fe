// src/redux/slices/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';

import mockChat from '../../utils/mockChat';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns'; // Importing format function from date-fns

const initialChatState = mockChat;


const initialState = {
    selectedChatId: null,
  chats: initialChatState,
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
    addChat: (state, action) => {
     // state.chats.push(action.payload);
     state.chats.unshift(action.payload);
    },
    updateChat: (state, action) => {
      const { chatId, updatedChat } = action.payload;
      const chatIndex = state.chats.findIndex((chat) => chat.chatId === chatId);
      if (chatIndex !== -1) {
        state.chats[chatIndex] = { ...state.chats[chatIndex], ...updatedChat };
      }
    },
    deleteChat: (state, action) => {
      const chatId = action.payload;
      state.chats = state.chats.filter((chat) => chat.chatId !== chatId);
      
    },
    updateChatMessages: (state, action) => {
      const { chatId, messages } = action.payload;
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        chat.generalMessages = messages;
      }
    },
    addComment: (state, action) => {
      const { chatId, comment } = action.payload;
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        const newComment = {
          text: comment,
          timestamp: format(new Date(), 'yyyy-MM-dd hh:mm:ssa'), // Add timestamp
          commentId: uuidv4(), // Generate a unique ID
          "userName": "Raphale", //this will be the Auth User
          replies: [],
        };
        chat.comments.push(newComment);
      }
    },
    updateComment: (state, action) => {
      const { chatId, commentId, updatedComment } = action.payload;
      console.log(updatedComment +" comment updating ...."+chatId +commentId);
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        const commentIndex = chat.comments.findIndex((c) => c.commentId === commentId);
        if (commentIndex !== -1) {
          chat.comments[commentIndex].text = updatedComment;
          //chat.comments[commentIndex].text = { ...chat.comments[commentIndex].text, ...updatedComment }; //immutability not needed
          console.log("comment updated");
        }
      }
    },
    deleteComment: (state, action) => {
      const { chatId, commentId } = action.payload;
      console.log("delete comment"+chatId + commentId);
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        chat.comments = chat.comments.filter((c) => c.commentId !== commentId);
        console.log("comment deleted");
      }
    },
    addReply: (state, action) => {
      const { chatId, commentId, reply } = action.payload;
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        const comment = chat.comments.find((c) => c.commentId === commentId);
        if (comment) {
          const newReply = {
            text:reply,
            timestamp: format(new Date(), 'yyyy-MM-dd hh:mm:ssa'), // Add timestamp
            replyId: uuidv4(), // Generate a unique ID
            "userName": "Raphale", //this will be the Auth User
          };
          comment.replies.push(newReply);
        }
      }
    },
    updateReply: (state, action) => {
      const { chatId, commentId, replyId, updatedReply } = action.payload;
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        const comment = chat.comments.find((c) => c.commentId === commentId);
        if (comment) {
          const replyIndex = comment.replies.findIndex((r) => r.replyId === replyId);
          if (replyIndex !== -1) {
            comment.replies[replyIndex].text = updatedReply;
           // comment.replies[replyIndex] = { ...comment.replies[replyIndex], ...updatedReply };
          }
        }
      }
    },
    deleteReply: (state, action) => {
      const { chatId, commentId, replyId } = action.payload;
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        const comment = chat.comments.find((c) => c.commentId === commentId);
        if (comment) {
          comment.replies = comment.replies.filter((r) => r.replyId !== replyId);
        }
      }
    },
    addBookmark: (state, action) => {
      const { chatId, bookmark } = action.payload;
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        chat.bookmarks.push(bookmark);
      }
    },
    deleteBookmark: (state, action) => {
      const { chatId, bookmarkId } = action.payload;
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        chat.bookmarks = chat.bookmarks.filter((b) => b.bookmarkId !== bookmarkId);
      }
    },
    addMedia: (state, action) => {
      const { chatId, media } = action.payload;
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        chat.media.push(media);
      }
    },
    deleteMedia: (state, action) => {
      const { chatId, mediaId } = action.payload;
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        chat.media = chat.media.filter((m) => m.mediaId !== mediaId);
      }
    },
    addTask: (state, action) => {
      const { chatId, task } = action.payload;
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        chat.tasks.push(task);
      }
    },
    updateTask: (state, action) => {
      const { chatId, taskId, updatedTask } = action.payload;
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        const taskIndex = chat.tasks.findIndex((t) => t.taskId === taskId);
        if (taskIndex !== -1) {
          chat.tasks[taskIndex] = { ...chat.tasks[taskIndex], ...updatedTask };
        }
      }
    },
    deleteTask: (state, action) => {
      const { chatId, taskId } = action.payload;
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        chat.tasks = chat.tasks.filter((t) => t.taskId !== taskId);
      }
    },
    addVersion: (state, action) => {
      const { chatId, version } = action.payload;
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        chat.versions.push(version);
      }
    },
    deleteVersion: (state, action) => {
      const { chatId, versionId } = action.payload;
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        chat.versions = chat.versions.filter((v) => v.versionId !== versionId);
      }
    },
    addImage: (state, action) => {
      const { chatId, image } = action.payload;
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        chat.images.push(image);
      }
    },
    deleteImage: (state, action) => {
      const { chatId, imageId } = action.payload;
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        chat.images = chat.images.filter((img) => img.imageId !== imageId);
      }
    },
    addDocument: (state, action) => {
      const { chatId, document } = action.payload;
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        chat.documents.push(document);
      }
    },
    deleteDocument: (state, action) => {
      const { chatId, documentId } = action.payload;
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        chat.documents = chat.documents.filter((doc) => doc.documentId !== documentId);
      }
    },
    addLink: (state, action) => {
      const { chatId, link } = action.payload;
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        chat.links.push(link);
      }
    },
    deleteLink: (state, action) => {
      const { chatId, linkId } = action.payload;
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        chat.links = chat.links.filter((link) => link.linkId !== linkId);
      }
    },
    addBookmarkData: (state, action) => {
      const { chatId, bookmarkData } = action.payload;
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        chat.bookmarkData.push(bookmarkData);
      }
    },
    deleteBookmarkData: (state, action) => {
      const { chatId, bookmarkDataId } = action.payload;
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        chat.bookmarkData = chat.bookmarkData.filter((b) => b.bookmarkDataId !== bookmarkDataId);
      }
    },
    addCommentingUser: (state, action) => {
      const { chatId, commentingUser } = action.payload;
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        chat.commentingUsers.push(commentingUser);
      }
    },
    deleteCommentingUser: (state, action) => {
      const { chatId, commentingUserId } = action.payload;
      const chat = state.chats.find((chat) => chat.chatId === chatId);
      if (chat) {
        chat.commentingUsers = chat.commentingUsers.filter((u) => u.commentingUserId !== commentingUserId);
      }
    },
  },
});

export const {
setSelectedChatId,
  addChat,
  updateChat,
  deleteChat,
  updateChatMessages,
  addComment,
  updateComment,
  deleteComment,
  addReply,
  updateReply,
  deleteReply,
  addBookmark,
  deleteBookmark,
  addMedia,
  deleteMedia,
  addTask,
  updateTask,
  deleteTask,
  addVersion,
  deleteVersion,
  addImage,
  deleteImage,
  addDocument,
  deleteDocument,
  addLink,
  deleteLink,
  addBookmarkData,
  deleteBookmarkData,
  addCommentingUser,
  deleteCommentingUser,
} = chatSlice.actions;

export default chatSlice.reducer;
