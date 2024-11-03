// src/redux/slices/chatSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { format } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';
import mockChat from '../../utils/mockWorkspace';

const initialChatState = mockChat;

const initialState = {
  selectedChatId: '',
  selectedWorkspaceId: 'workspaceId1',
  selectedFolderId: 'folderId1',
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
    setSelectedWorkspaceId: (state, action) => {
      state.selectedWorkspaceId = action.payload;
    },
    setSelectedFolderId: (state, action) => {
      state.selectedFolderId = action.payload;
    },
    addChat: (state, action) => {
      const { workspaceId, folderId, chat } = action.payload;
      const workspace = state.chats.find((w) => w.workspaceId === workspaceId);
      if (workspace) {
        const folder = workspace.folders.find((f) => f.folderId === folderId);
        if (folder) {
          folder.chats.unshift(chat);
        }
      }
    },
    updateChat: (state, action) => {
      const { workspaceId, folderId, chatId, updatedChat } = action.payload;
      const workspace = state.chats.find((w) => w.workspaceId === workspaceId);
      if (workspace) {
        const folder = workspace.folders.find((f) => f.folderId === folderId);
        if (folder) {
          const chatIndex = folder.chats.findIndex(
            (chat) => chat.chatId === chatId
          );
          if (chatIndex !== -1) {
            folder.chats[chatIndex] = {
              ...folder.chats[chatIndex],
              ...updatedChat,
            };
          }
        }
      }
    },
    deleteChat: (state, action) => {
      const { workspaceId, folderId, chatId } = action.payload;
      const workspace = state.chats.find((w) => w.workspaceId === workspaceId);
      if (workspace) {
        const folder = workspace.folders.find((f) => f.folderId === folderId);
        if (folder) {
          folder.chats = folder.chats.filter((chat) => chat.chatId !== chatId);
        }
      }
    },
    updateChatMessages: (state, action) => {
      const { workspaceId, folderId, chatId, messages } = action.payload;
      const workspace = state.chats.find((w) => w.workspaceId === workspaceId);
      if (workspace) {
        const folder = workspace.folders.find((f) => f.folderId === folderId);
        if (folder) {
          const chat = folder.chats.find((chat) => chat.chatId === chatId);
          if (chat) {
            chat.generalMessages = messages;
          }
        }
      }
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
    addBookmark: (state, action) => {
      const { workspaceId, folderId, chatId, bookmark } = action.payload;
      const workspace = state.chats.find((w) => w.workspaceId === workspaceId);
      if (workspace) {
        const folder = workspace.folders.find((f) => f.folderId === folderId);
        if (folder) {
          const chat = folder.chats.find((chat) => chat.chatId === chatId);
          if (chat) {
            chat.bookmarks.push(bookmark);
          }
        }
      }
    },
    deleteBookmark: (state, action) => {
      const { workspaceId, folderId, chatId, bookmarkId } = action.payload;
      const workspace = state.chats.find((w) => w.workspaceId === workspaceId);
      if (workspace) {
        const folder = workspace.folders.find((f) => f.folderId === folderId);
        if (folder) {
          const chat = folder.chats.find((chat) => chat.chatId === chatId);
          if (chat) {
            chat.bookmarks = chat.bookmarks.filter(
              (b) => b.bookmarkId !== bookmarkId
            );
          }
        }
      }
    },
    addMedia: (state, action) => {
      const { workspaceId, folderId, chatId, media } = action.payload;
      const workspace = state.chats.find((w) => w.workspaceId === workspaceId);
      if (workspace) {
        const folder = workspace.folders.find((f) => f.folderId === folderId);
        if (folder) {
          const chat = folder.chats.find((chat) => chat.chatId === chatId);
          if (chat) {
            chat.media.push(media);
          }
        }
      }
    },
    deleteMedia: (state, action) => {
      const { workspaceId, folderId, chatId, mediaId } = action.payload;
      const workspace = state.chats.find((w) => w.workspaceId === workspaceId);
      if (workspace) {
        const folder = workspace.folders.find((f) => f.folderId === folderId);
        if (folder) {
          const chat = folder.chats.find((chat) => chat.chatId === chatId);
          if (chat) {
            chat.media = chat.media.filter((m) => m.mediaId !== mediaId);
          }
        }
      }
    },
    addTask: (state, action) => {
      const { workspaceId, folderId, chatId, task } = action.payload;
      const workspace = state.chats.find((w) => w.workspaceId === workspaceId);
      if (workspace) {
        const folder = workspace.folders.find((f) => f.folderId === folderId);
        if (folder) {
          const chat = folder.chats.find((chat) => chat.chatId === chatId);
          if (chat) {
            chat.tasks.push(task);
          }
        }
      }
    },
    updateTask: (state, action) => {
      const { workspaceId, folderId, chatId, taskId, updatedTask } =
        action.payload;
      const workspace = state.chats.find((w) => w.workspaceId === workspaceId);
      if (workspace) {
        const folder = workspace.folders.find((f) => f.folderId === folderId);
        if (folder) {
          const chat = folder.chats.find((chat) => chat.chatId === chatId);
          if (chat) {
            const taskIndex = chat.tasks.findIndex(
              (task) => task.taskId === taskId
            );
            if (taskIndex !== -1) {
              chat.tasks[taskIndex] = {
                ...chat.tasks[taskIndex],
                ...updatedTask,
              };
            }
          }
        }
      }
    },
    deleteTask: (state, action) => {
      const { workspaceId, folderId, chatId, taskId } = action.payload;
      const workspace = state.chats.find((w) => w.workspaceId === workspaceId);
      if (workspace) {
        const folder = workspace.folders.find((f) => f.folderId === folderId);
        if (folder) {
          const chat = folder.chats.find((chat) => chat.chatId === chatId);
          if (chat) {
            chat.tasks = chat.tasks.filter((task) => task.taskId !== taskId);
          }
        }
      }
    },
    addVersion: (state, action) => {
      const { workspaceId, folderId, chatId, version } = action.payload;
      const workspace = state.chats.find((w) => w.workspaceId === workspaceId);
      if (workspace) {
        const folder = workspace.folders.find((f) => f.folderId === folderId);
        if (folder) {
          const chat = folder.chats.find((chat) => chat.chatId === chatId);
          if (chat) {
            chat.versions.push(version);
          }
        }
      }
    },
    deleteVersion: (state, action) => {
      const { workspaceId, folderId, chatId, versionId } = action.payload;
      const workspace = state.chats.find((w) => w.workspaceId === workspaceId);
      if (workspace) {
        const folder = workspace.folders.find((f) => f.folderId === folderId);
        if (folder) {
          const chat = folder.chats.find((chat) => chat.chatId === chatId);
          if (chat) {
            chat.versions = chat.versions.filter(
              (v) => v.versionId !== versionId
            );
          }
        }
      }
    },
    addImage: (state, action) => {
      const { workspaceId, folderId, chatId, image } = action.payload;
      const workspace = state.chats.find((w) => w.workspaceId === workspaceId);
      if (workspace) {
        const folder = workspace.folders.find((f) => f.folderId === folderId);
        if (folder) {
          const chat = folder.chats.find((chat) => chat.chatId === chatId);
          if (chat) {
            chat.images.push(image);
          }
        }
      }
    },
    deleteImage: (state, action) => {
      const { workspaceId, folderId, chatId, imageId } = action.payload;
      const workspace = state.chats.find((w) => w.workspaceId === workspaceId);
      if (workspace) {
        const folder = workspace.folders.find((f) => f.folderId === folderId);
        if (folder) {
          const chat = folder.chats.find((chat) => chat.chatId === chatId);
          if (chat) {
            chat.images = chat.images.filter((img) => img.imageId !== imageId);
          }
        }
      }
    },
    addDocument: (state, action) => {
      const { workspaceId, folderId, chatId, document } = action.payload;
      const workspace = state.chats.find((w) => w.workspaceId === workspaceId);
      if (workspace) {
        const folder = workspace.folders.find((f) => f.folderId === folderId);
        if (folder) {
          const chat = folder.chats.find((chat) => chat.chatId === chatId);
          if (chat) {
            chat.documents.push(document);
          }
        }
      }
    },
    deleteDocument: (state, action) => {
      const { workspaceId, folderId, chatId, documentId } = action.payload;
      const workspace = state.chats.find((w) => w.workspaceId === workspaceId);
      if (workspace) {
        const folder = workspace.folders.find((f) => f.folderId === folderId);
        if (folder) {
          const chat = folder.chats.find((chat) => chat.chatId === chatId);
          if (chat) {
            chat.documents = chat.documents.filter(
              (doc) => doc.documentId !== documentId
            );
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

} = chatSlice.actions;

export default chatSlice.reducer;
