// src/reducers/index.js

import { combineReducers } from 'redux';
import * as actionTypes from '../actions/actionTypes';
import mockChat from '../../utils/mockChat';

const initialChatState = mockChat;

const chatReducer = (state = initialChatState, action) => {
  switch (action.type) {
    case actionTypes.ADD_GENERAL_MESSAGE:
      return state.map((chat) => {
        if (chat.chatId === action.payload.chatId) {
          return {
            ...chat,
            generalMessages: [...chat.generalMessages, action.payload.message],
          };
        }
        return chat;
      });

    case actionTypes.UPDATE_GENERAL_MESSAGE:
      return state.map((chat) => {
        if (chat.chatId === action.payload.chatId) {
          return {
            ...chat,
            generalMessages: chat.generalMessages.map((message) => {
              if (message.messageId === action.payload.messageId) {
                return { ...message, ...action.payload.updatedMessage };
              }
              return message;
            }),
          };
        }
        return chat;
      });

    case actionTypes.DELETE_GENERAL_MESSAGE:
      return state.map((chat) => {
        if (chat.chatId === action.payload.chatId) {
          return {
            ...chat,
            generalMessages: chat.generalMessages.filter(
              (message) => message.messageId !== action.payload.messageId
            ),
          };
        }
        return chat;
      });

    case actionTypes.ADD_SHARED_USER:
      return state.map((chat) => {
        if (chat.chatId === action.payload.chatId) {
          return {
            ...chat,
            sharedUsers: [
              ...chat.sharedUsers,
              { userId: action.payload.userId, role: action.payload.role },
            ],
          };
        }
        return chat;
      });

    case actionTypes.REMOVE_SHARED_USER:
      return state.map((chat) => {
        if (chat.chatId === action.payload.chatId) {
          return {
            ...chat,
            sharedUsers: chat.sharedUsers.filter(
              (user) => user.userId !== action.payload.userId
            ),
          };
        }
        return chat;
      });

    case actionTypes.ADD_COMMENT:
      return state.map((chat) => {
        if (chat.chatId === action.payload.chatId) {
          return {
            ...chat,
            comments: [...chat.comments, action.payload.comment],
          };
        }
        return chat;
      });

    case actionTypes.ADD_REPLY_TO_COMMENT:
      return state.map((chat) => {
        if (chat.chatId === action.payload.chatId) {
          return {
            ...chat,
            comments: chat.comments.map((comment) => {
              if (comment.commentId === action.payload.commentId) {
                return {
                  ...comment,
                  replies: [...comment.replies, action.payload.reply],
                };
              }
              return comment;
            }),
          };
        }
        return chat;
      });

    case actionTypes.DELETE_COMMENT:
      return state.map((chat) => {
        if (chat.chatId === action.payload.chatId) {
          return {
            ...chat,
            comments: chat.comments.filter(
              (comment) => comment.commentId !== action.payload.commentId
            ),
          };
        }
        return chat;
      });

    case actionTypes.DELETE_REPLY_FROM_COMMENT:
      return state.map((chat) => {
        if (chat.chatId === action.payload.chatId) {
          return {
            ...chat,
            comments: chat.comments.map((comment) => {
              if (comment.commentId === action.payload.commentId) {
                return {
                  ...comment,
                  replies: comment.replies.filter(
                    (reply) => reply.replyId !== action.payload.replyId
                  ),
                };
              }
              return comment;
            }),
          };
        }
        return chat;
      });

    case actionTypes.ADD_BOOKMARK:
      return state.map((chat) => {
        if (chat.chatId === action.payload.chatId) {
          return {
            ...chat,
            bookmarks: [...chat.bookmarks, action.payload.bookmark],
          };
        }
        return chat;
      });

    case actionTypes.REMOVE_BOOKMARK:
      return state.map((chat) => {
        if (chat.chatId === action.payload.chatId) {
          return {
            ...chat,
            bookmarks: chat.bookmarks.filter(
              (bookmark) => bookmark.bookmarkId !== action.payload.bookmarkId
            ),
          };
        }
        return chat;
      });

    case actionTypes.ADD_MEDIA:
      return state.map((chat) => {
        if (chat.chatId === action.payload.chatId) {
          return {
            ...chat,
            media: [...chat.media, action.payload.media],
          };
        }
        return chat;
      });

    case actionTypes.REMOVE_MEDIA:
      return state.map((chat) => {
        if (chat.chatId === action.payload.chatId) {
          return {
            ...chat,
            media: chat.media.filter(
              (media) => media.mediaId !== action.payload.mediaId
            ),
          };
        }
        return chat;
      });

    case actionTypes.UPDATE_TASK_PROGRESS:
      return state.map((chat) => {
        if (chat.chatId === action.payload.chatId) {
          return {
            ...chat,
            tasks: chat.tasks.map((task) => {
              if (task.name === action.payload.taskName) {
                return { ...task, progress: action.payload.progress };
              }
              return task;
            }),
          };
        }
        return chat;
      });

    case actionTypes.ADD_VERSION:
      return state.map((chat) => {
        if (chat.chatId === action.payload.chatId) {
          return {
            ...chat,
            versions: [...chat.versions, action.payload.version],
          };
        }
        return chat;
      });

    case actionTypes.ADD_IMAGE:
      return state.map((chat) => {
        if (chat.chatId === action.payload.chatId) {
          return {
            ...chat,
            images: [...chat.images, action.payload.image],
          };
        }
        return chat;
      });

    case actionTypes.REMOVE_IMAGE:
      return state.map((chat) => {
        if (chat.chatId === action.payload.chatId) {
          return {
            ...chat,
            images: chat.images.filter(
              (imageUrl) => imageUrl !== action.payload.imageUrl
            ),
          };
        }
        return chat;
      });

    case actionTypes.ADD_DOCUMENT:
      return state.map((chat) => {
        if (chat.chatId === action.payload.chatId) {
          return {
            ...chat,
            documents: [...chat.documents, action.payload.document],
          };
        }
        return chat;
      });

    case actionTypes.REMOVE_DOCUMENT:
      return state.map((chat) => {
        if (chat.chatId === action.payload.chatId) {
          return {
            ...chat,
            documents: chat.documents.filter(
              (document) => document.name !== action.payload.documentName
            ),
          };
        }
        return chat;
      });

    case actionTypes.ADD_LINK:
      return state.map((chat) => {
        if (chat.chatId === action.payload.chatId) {
          return {
            ...chat,
            links: [...chat.links, action.payload.link],
          };
        }
        return chat;
      });

    case actionTypes.REMOVE_LINK:
      return state.map((chat) => {
        if (chat.chatId === action.payload.chatId) {
          return {
            ...chat,
            links: chat.links.filter(
              (link) => link.name !== action.payload.linkName
            ),
          };
        }
        return chat;
      });

    case actionTypes.ADD_BOOKMARK_DATA:
      return state.map((chat) => {
        if (chat.chatId === action.payload.chatId) {
          return {
            ...chat,
            bookmarkData: [...chat.bookmarkData, action.payload.bookmarkData],
          };
        }
        return chat;
      });

    case actionTypes.ADD_COMMENTING_USER:
      return state.map((chat) => {
        if (chat.chatId === action.payload.chatId) {
          return {
            ...chat,
            commentingUsers: [
              ...chat.commentingUsers,
              {
                userId: action.payload.userId,
                userName: action.payload.userName,
              },
            ],
          };
        }
        return chat;
      });

    case actionTypes.REMOVE_COMMENTING_USER:
      return state.map((chat) => {
        if (chat.chatId === action.payload.chatId) {
          return {
            ...chat,
            commentingUsers: chat.commentingUsers.filter(
              (user) => user.userId !== action.payload.userId
            ),
          };
        }
        return chat;
      });

    case actionTypes.ADD_COMMENT_REPLY:
      return state.map((chat) => {
        if (chat.chatId === action.payload.chatId) {
          return {
            ...chat,
            commentReplies: chat.commentReplies.map((comment) => {
              if (comment.commentId === action.payload.commentId) {
                return {
                  ...comment,
                  replies: [...comment.replies, action.payload.reply],
                };
              }
              return comment;
            }),
          };
        }
        return chat;
      });

    case actionTypes.REMOVE_COMMENT_REPLY:
      return state.map((chat) => {
        if (chat.chatId === action.payload.chatId) {
          return {
            ...chat,
            commentReplies: chat.commentReplies.map((comment) => {
              if (comment.commentId === action.payload.commentId) {
                return {
                  ...comment,
                  replies: comment.replies.filter(
                    (reply) => reply.replyId !== action.payload.replyId
                  ),
                };
              }
              return comment;
            }),
          };
        }
        return chat;
      });

    default:
      return state;
  }
};

export default combineReducers({
  chats: chatReducer,
  // Add additional reducers here if needed
});
