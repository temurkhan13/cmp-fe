// actions.js
import * as actionTypes from './actionTypes';


// General Messages
export const addGeneralMessage = (chatId, message) => ({
  type: actionTypes.ADD_GENERAL_MESSAGE,
  payload: { chatId, message }
});

export const updateGeneralMessage = (chatId, messageId, updatedMessage) => ({
  type: actionTypes.UPDATE_GENERAL_MESSAGE,
  payload: { chatId, messageId, updatedMessage }
});

export const deleteGeneralMessage = (chatId, messageId) => ({
  type: actionTypes.DELETE_GENERAL_MESSAGE,
  payload: { chatId, messageId }
});

// Shared Users
export const addSharedUser = (chatId, userId, role) => ({
  type: actionTypes.ADD_SHARED_USER,
  payload: { chatId, userId, role }
});

export const removeSharedUser = (chatId, userId) => ({
  type: actionTypes.REMOVE_SHARED_USER,
  payload: { chatId, userId }
});

// Comments
export const addComment = (chatId, comment) => ({
  type: actionTypes.ADD_COMMENT,
  payload: { chatId, comment }
});

export const addReplyToComment = (chatId, commentId, reply) => ({
  type: actionTypes.ADD_REPLY_TO_COMMENT,
  payload: { chatId, commentId, reply }
});

export const deleteComment = (chatId, commentId) => ({
  type: actionTypes.DELETE_COMMENT,
  payload: { chatId, commentId }
});

export const deleteReplyFromComment = (chatId, commentId, replyId) => ({
  type: actionTypes.DELETE_REPLY_FROM_COMMENT,
  payload: { chatId, commentId, replyId }
});

// Bookmarks
export const addBookmark = (chatId, bookmark) => ({
  type: actionTypes.ADD_BOOKMARK,
  payload: { chatId, bookmark }
});

export const removeBookmark = (chatId, bookmarkId) => ({
  type: actionTypes.REMOVE_BOOKMARK,
  payload: { chatId, bookmarkId }
});

// Media
export const addMedia = (chatId, media) => ({
  type: actionTypes.ADD_MEDIA,
  payload: { chatId, media }
});

export const removeMedia = (chatId, mediaId) => ({
  type: actionTypes.REMOVE_MEDIA,
  payload: { chatId, mediaId }
});

// Tasks
export const updateTaskProgress = (chatId, taskName, progress) => ({
  type: actionTypes.UPDATE_TASK_PROGRESS,
  payload: { chatId, taskName, progress }
});

// Versions
export const addVersion = (chatId, version) => ({
  type: actionTypes.ADD_VERSION,
  payload: { chatId, version }
});

// Images
export const addImage = (chatId, image) => ({
  type: actionTypes.ADD_IMAGE,
  payload: { chatId, image }
});

export const removeImage = (chatId, imageUrl) => ({
  type: actionTypes.REMOVE_IMAGE,
  payload: { chatId, imageUrl }
});

// Documents
export const addDocument = (chatId, document) => ({
  type: actionTypes.ADD_DOCUMENT,
  payload: { chatId, document }
});

export const removeDocument = (chatId, documentName) => ({
  type: actionTypes.REMOVE_DOCUMENT,
  payload: { chatId, documentName }
});

// Links
export const addLink = (chatId, link) => ({
  type: actionTypes.ADD_LINK,
  payload: { chatId, link }
});

export const removeLink = (chatId, linkName) => ({
  type: actionTypes.REMOVE_LINK,
  payload: { chatId, linkName }
});

// Bookmark Data
export const addBookmarkData = (chatId, bookmarkData) => ({
  type: actionTypes.ADD_BOOKMARK_DATA,
  payload: { chatId, bookmarkData }
});

// Commenting Users
export const addCommentingUser = (chatId, userId, userName) => ({
  type: actionTypes.ADD_COMMENTING_USER,
  payload: { chatId, userId, userName }
});

export const removeCommentingUser = (chatId, userId) => ({
  type: actionTypes.REMOVE_COMMENTING_USER,
  payload: { chatId, userId }
});

// Comment Replies
export const addCommentReply = (chatId, commentId, reply) => ({
  type: actionTypes.ADD_COMMENT_REPLY,
  payload: { chatId, commentId, reply }
});

export const removeCommentReply = (chatId, commentId, replyId) => ({
  type: actionTypes.REMOVE_COMMENT_REPLY,
  payload: { chatId, commentId, replyId }
});
