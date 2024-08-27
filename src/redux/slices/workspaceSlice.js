import { createSlice } from '@reduxjs/toolkit';

import mockWorkspace from '../../utils/mockWorkspace';


const initialChatState = mockWorkspace;



const initialState = {
  workspaces: initialChatState,
  selectedWorkspaceId: 'workspaceId1',
  selectedFolderId: 'folderId1',
  selectedChatId: null,
};

// Helper functions
const findWorkspaceById = (state, workspaceId) =>
  state.workspaces.find(ws => ws.workspaceId === workspaceId);

const findFolderById = (workspace, folderId) =>
  workspace?.folders.find(f => f.folderId === folderId);

const findChatById = (folder, chatId) =>
  folder?.chats.find(c => c.chatId === chatId);


const findCommentById = (chat, commentId) =>
  chat?.comments.find(c => c.commentId === commentId);

const workspaceSlice = createSlice({
  name: 'workspace',
  initialState,
  reducers: {
    // Workspaces CRUD
    addWorkspace: (state, action) => {
      state.workspaces.push(action.payload);
    },
    updateWorkspace: (state, action) => {
      const index = state.workspaces.findIndex(ws => ws.workspaceId === action.payload.workspaceId);
      if (index !== -1) {
        state.workspaces[index] = { ...state.workspaces[index], ...action.payload };
      }
    },
    removeWorkspace: (state, action) => {
      state.workspaces = state.workspaces.filter(ws => ws.workspaceId !== action.payload);
    },
    setSelectedWorkspaceId: (state, action) => {
      state.selectedWorkspaceId = action.payload;
    },
    // Folders CRUD
    addFolder: (state, action) => {
      const workspace = findWorkspaceById(state, action.payload.workspaceId);
      if (workspace) {
        workspace.folders.push(action.payload.folder);
      }
    },
    updateFolder: (state, action) => {
      const workspace = findWorkspaceById(state, action.payload.workspaceId);
      const folder = findFolderById(workspace, action.payload.folder.folderId);
      if (folder) {
        Object.assign(folder, action.payload.folder);
      }
    },
    removeFolder: (state, action) => {
      const workspace = findWorkspaceById(state, action.payload.workspaceId);
      if (workspace) {
        workspace.folders = workspace.folders.filter(f => f.folderId !== action.payload.folderId);
      }
    },
    setSelectedFolderId: (state, action) => {
      state.selectedFolderId = action.payload;
    },
    // Chats CRUD
    addChat: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      if (folder) {
        folder.chats.push(action.payload.chat);
      }
    },
    updateChat: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, action.payload.chat.chatId);
      if (chat) {
        Object.assign(chat, action.payload.chat);
      }
    },
    removeChat: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      if (folder) {
        folder.chats = folder.chats.filter(c => c.chatId !== action.payload.chatId);
      }
    },
    setSelectedChatId: (state, action) => {
      state.selectedChatId = action.payload;
    },
    // Messages CRUD
    addMessage: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      if (chat) {
        console.log("slice message: ", action.payload);
        chat.generalMessages.push(action.payload);
      }
    },
    updateMessage: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      const message = chat.generalMessages.find(msg => msg.messageId === action.payload.message.messageId);
      if (message) {
        Object.assign(message, action.payload);
      }
    },
    removeMessage: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      if (chat) {
        chat.generalMessages = chat.generalMessages.filter(msg => msg.messageId !== action.payload.messageId);
      }
    },
    // Shared Users CRUD
    addSharedUser: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      if (chat) {
        chat.sharedUsers.push(action.payload.user);
      }
    },
    updateSharedUser: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      const user = chat.sharedUsers.find(u => u.userId === action.payload.user.userId);
      if (user) {
        Object.assign(user, action.payload.user);
      }
    },
    removeSharedUser: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      if (chat) {
        chat.sharedUsers = chat.sharedUsers.filter(u => u.userId !== action.payload.userId);
      }
    },
    // Comments CRUD
    addComment: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      if (chat) {
        chat.comments.push(action.payload.comment);
      }
    },
    updateComment: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      const comment = chat.comments.find(c => c.commentId === action.payload.comment.commentId);
      if (comment) {
        Object.assign(comment, action.payload.comment);
      }
    },
    removeComment: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      if (chat) {
        chat.comments = chat.comments.filter(c => c.commentId !== action.payload.commentId);
      }
    },

    // Reply to Comments CRUD
    addReply: (state, action) => {
      //const { commentId, reply } = action.payload;
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      const comment = findCommentById(chat, action.payload.commentId);
      if (comment) {
        comment.replies.push(action.payload.reply);
      }
    },
    updateReply: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      const comment = findCommentById(chat, action.payload.commentId);
      const replyIndex = comment.replies.findIndex(
        (r) => r.replyId === action.payload.replyId
      );
      if (replyIndex !== -1) {
        comment.replies[replyIndex].text = action.payload.updatedReply;
      }
      
    },
    removeReply: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      const comment = findCommentById(chat, action.payload.commentId);
      if (comment) {
        comment.replies = comment.replies.filter(
          (r) => r.replyId !== action.payload.replyId
        );
      }
      
    },

    // Bookmarks CRUD
    addBookmark: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      if (chat) {
        chat.bookmarks.push(action.payload);
      }
    },
    updateBookmark: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      const bookmark = chat.bookmarks.find(b => b.bookmarkId === action.payload.bookmark.bookmarkId);
      if (bookmark) {
        Object.assign(bookmark, action.payload.bookmark);
      }
    },
    removeBookmark: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      if (chat) {
        chat.bookmarks = chat.bookmarks.filter(b => b.bookmarkId !== action.payload.bookmarkId);
      }
    },
    // Media CRUD
    addMedia: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      if (chat) {
        chat.media.push(action.payload.media);
      }
    },
    updateMedia: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      const media = chat.media.find(m => m.mediaId === action.payload.media.mediaId);
      if (media) {
        Object.assign(media, action.payload.media);
      }
    },
    removeMedia: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      if (chat) {
        chat.media = chat.media.filter(m => m.mediaId !== action.payload.mediaId);
      }
    },
    // Tasks CRUD
    addTask: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      if (chat) {
        chat.tasks.push(action.payload.task);
      }
    },
    updateTask: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      const task = chat.tasks.find(t => t.taskId === action.payload.task.taskId);
      if (task) {
        Object.assign(task, action.payload.task);
      }
    },
    removeTask: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      if (chat) {
        chat.tasks = chat.tasks.filter(t => t.taskId !== action.payload.taskId);
      }
    },
    // Versions CRUD
    addVersion: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      if (chat) {
        chat.versions.push(action.payload.version);
      }
    },
    updateVersion: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      const version = chat.versions.find(v => v.versionId === action.payload.version.versionId);
      if (version) {
        Object.assign(version, action.payload.version);
      }
    },
    removeVersion: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      if (chat) {
        chat.versions = chat.versions.filter(v => v.versionId !== action.payload.versionId);
      }
    },
    // Images CRUD
    addImage: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      if (chat) {
        chat.images.push(action.payload.image);
      }
    },
    updateImage: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      const image = chat.images.find(i => i.imageId === action.payload.image.imageId);
      if (image) {
        Object.assign(image, action.payload.image);
      }
    },
    removeImage: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      if (chat) {
        chat.images = chat.images.filter(i => i.imageId !== action.payload.imageId);
      }
    },
    // Documents CRUD
    addDocument: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      if (chat) {
        chat.documents.push(action.payload.document);
      }
    },
    updateDocument: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      const document = chat.documents.find(d => d.documentId === action.payload.document.documentId);
      if (document) {
        Object.assign(document, action.payload.document);
      }
    },
    removeDocument: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      if (chat) {
        chat.documents = chat.documents.filter(d => d.documentId !== action.payload.documentId);
      }
    },
    // Links CRUD
    addLink: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      if (chat) {
        chat.links.push(action.payload.link);
      }
    },
    updateLink: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      const link = chat.links.find(l => l.linkId === action.payload.link.linkId);
      if (link) {
        Object.assign(link, action.payload.link);
      }
    },
    removeLink: (state, action) => {
      const workspace = findWorkspaceById(state, state.selectedWorkspaceId);
      const folder = findFolderById(workspace, state.selectedFolderId);
      const chat = findChatById(folder, state.selectedChatId);
      if (chat) {
        chat.links = chat.links.filter(l => l.linkId !== action.payload.linkId);
      }
    },
  },
});

export const {
  addWorkspace,
  updateWorkspace,
  removeWorkspace,
  setSelectedWorkspaceId,
  addFolder,
  updateFolder,
  removeFolder,
  setSelectedFolderId,
  addChat,
  updateChat,
  removeChat,
  setSelectedChatId,
  addMessage,
  updateMessage,
  removeMessage,
  addSharedUser,
  updateSharedUser,
  removeSharedUser,
  addComment,
  updateComment,
  removeComment,
  addReply,
  updateReply,
  removeReply,
  addBookmark,
  updateBookmark,
  removeBookmark,
  addMedia,
  updateMedia,
  removeMedia,
  addTask,
  updateTask,
  removeTask,
  addVersion,
  updateVersion,
  removeVersion,
  addImage,
  updateImage,
  removeImage,
  addDocument,
  updateDocument,
  removeDocument,
  addLink,
  updateLink,
  removeLink,
} = workspaceSlice.actions;

export default workspaceSlice.reducer;
