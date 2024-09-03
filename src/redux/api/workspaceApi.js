import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery'; // Adjust the import path as needed

export const workspaceApi = createApi({
  reducerPath: 'workspaceApi',
  baseQuery,
  endpoints: (builder) => ({
    // Workspaces
    getWorkspaces: builder.query({
      query: () => 'workspace',
      providesTags: ['Workspace'],
    }),
    getWorkspace: builder.query({
      query: (workspaceId) => `workspace/${workspaceId}`,
    }),
    addWorkspace: builder.mutation({
      query: (newWorkspace) => ({
        url: 'workspace',
        method: 'POST',
        body: newWorkspace,
      }),
      invalidatesTags: ['Workspace'],
    }),
    updateWorkspace: builder.mutation({
      query: (workspace) => ({
        url: `workspaces/${workspace.workspaceId}`,
        method: 'PUT',
        body: workspace,
      }),
    }),
    removeWorkspace: builder.mutation({
      query: (workspaceId) => ({
        url: `workspaces/${workspaceId}`,
        method: 'DELETE',
      }),
    }),

    // Folders
    addFolder: builder.mutation({
      query: ({ workspaceId, folderName }) => ({
        url: `workspace/${workspaceId}/folder`,
        method: 'POST',
        body: { folderName },
      }),
    }),
    updateFolder: builder.mutation({
      query: ({ workspaceId, folder }) => ({
        url: `workspaces/${workspaceId}/folders/${folder.folderId}`,
        method: 'PUT',
        body: folder,
      }),
    }),
    removeFolder: builder.mutation({
      query: ({ workspaceId, folderId }) => ({
        url: `workspaces/${workspaceId}/folders/${folderId}`,
        method: 'DELETE',
      }),
    }),

    // Chats
    addChat: builder.mutation({
      query: ({ workspaceId, folderId, chat }) => ({
        url: `workspace/${workspaceId}/folder/${folderId}/chat`,
        method: 'POST',
        // body: chat,
      }),
    }),
    updateChat: builder.mutation({
      query: ({ workspaceId, folderId, chat }) => ({
        url: `workspaces/${workspaceId}/folders/${folderId}/chats/${chat.chatId}`,
        method: 'PUT',
        body: chat,
      }),
    }),
    removeChat: builder.mutation({
      query: ({ workspaceId, folderId, chatId }) => ({
        url: `workspaces/${workspaceId}/folders/${folderId}/chats/${chatId}`,
        method: 'DELETE',
      }),
    }),

    // Messages
    addMessage: builder.mutation({
      query: ({ workspaceId, folderId, chatId, message, files }) => {
        const formData = new FormData();
        formData.append('text', message);

        // Append a single file or multiple files
        if (files && files.length > 0) {
          files.forEach((file, index) => {
            formData.append(`file${index}`, file);
          });
        }

        return {
          url: `workspace/${workspaceId}/folder/${folderId}/chat/${chatId}/message`,
          method: 'PATCH',
          body: formData,
        };
      },
    }),

    updateMessage: builder.mutation({
      query: ({ workspaceId, folderId, chatId, messageId, message }) => ({
        url: `workspaces/${workspaceId}/folders/${folderId}/chats/${chatId}/messages/${messageId}`,
        method: 'PUT',
        body: message,
      }),
    }),
    removeMessage: builder.mutation({
      query: ({ workspaceId, folderId, chatId, messageId }) => ({
        url: `workspaces/${workspaceId}/folders/${folderId}/chats/${chatId}/messages/${messageId}`,
        method: 'DELETE',
      }),
    }),

    // AddAssessment
    addAssessment: builder.mutation({
      query: ({ workspaceId, folderId, chatId, message, files }) => {
        const formData = new FormData();
        formData.append('text', message);

        // Append a single file or multiple files
        if (files && files.length > 0) {
          files.forEach((file, index) => {
            formData.append(`file${index}`, file);
          });
        }

        return {
          url: `workspace/${workspaceId}/folder/${folderId}/assessment/${chatId}/message`,
          method: 'PATCH',
          body: formData,
        };
      },
    }),

    updateAssessment: builder.mutation({
      query: ({ workspaceId, folderId, chatId, message }) => ({
        url: `workspace/${workspaceId}/folder/${folderId}/assessment/${chatId}/messages/${message.messageId}`,
        method: 'PUT',
        body: message,
      }),
    }),
    removeAssessment: builder.mutation({
      query: ({ workspaceId, folderId, chatId, messageId }) => ({
        url: `workspace/${workspaceId}/folder/${folderId}/assessment/${chatId}/messages/${messageId}`,
        method: 'DELETE',
      }),
    }),

    // Shared Users
    addSharedUser: builder.mutation({
      query: ({ workspaceId, folderId, chatId, user }) => ({
        url: `workspaces/${workspaceId}/folders/${folderId}/chats/${chatId}/sharedUsers`,
        method: 'POST',
        body: user,
      }),
    }),
    updateSharedUser: builder.mutation({
      query: ({ workspaceId, folderId, chatId, user }) => ({
        url: `workspaces/${workspaceId}/folders/${folderId}/chats/${chatId}/sharedUsers/${user.userId}`,
        method: 'PUT',
        body: user,
      }),
    }),
    removeSharedUser: builder.mutation({
      query: ({ workspaceId, folderId, chatId, userId }) => ({
        url: `workspaces/${workspaceId}/folders/${folderId}/chats/${chatId}/sharedUsers/${userId}`,
        method: 'DELETE',
      }),
    }),

    // Comments
    addComment: builder.mutation({
      query: ({ workspaceId, folderId, chatId, messageId, text }) => ({
        url: `workspace/${workspaceId}/folder/${folderId}/chat/${chatId}/message/${messageId}/comment`,
        method: 'POST',
        body: {text},
      }),
    }),
    updateComment: builder.mutation({
      query: ({ workspaceId, folderId, chatId, comment }) => ({
        url: `workspaces/${workspaceId}/folders/${folderId}/chats/${chatId}/comments/${comment.commentId}`,
        method: 'PUT',
        body: "text:"+{comment},
      }),
    }),
    removeComment: builder.mutation({
      query: ({ workspaceId, folderId, chatId, commentId }) => ({
        url: `workspaces/${workspaceId}/folders/${folderId}/chats/${chatId}/comments/${commentId}`,
        method: 'DELETE',
      }),
    }),

    // Replies
    addReply: builder.mutation({
      query: ({ workspaceId, folderId, chatId, commentId, reply }) => ({
        url: `workspace/${workspaceId}/folder/${folderId}/chat/${chatId}/comment/${commentId}/reply`,
        method: 'POST',
        body: reply,
      }),
    }),
    updateReply: builder.mutation({
      query: ({
        workspaceId,
        folderId,
        chatId,
        commentId,
        replyId,
        updatedReply,
      }) => ({
        url: `workspaces/${workspaceId}/folders/${folderId}/chats/${chatId}/comments/${commentId}/replies/${replyId}`,
        method: 'PUT',
        body: { text: updatedReply },
      }),
    }),
    removeReply: builder.mutation({
      query: ({ workspaceId, folderId, chatId, commentId, replyId }) => ({
        url: `workspaces/${workspaceId}/folders/${folderId}/chats/${chatId}/comments/${commentId}/replies/${replyId}`,
        method: 'DELETE',
      }),
    }),

    // Bookmarks
    addBookmark: builder.mutation({
      query: ({ workspaceId, folderId, chatId, messageId }) => ({
        url: `workspace/${workspaceId}/folder/${folderId}/chat/${chatId}/message/${messageId}/bookmark`,
        method: 'POST',
       // body: bookmark,
      }),
    }),
    updateBookmark: builder.mutation({
      query: ({ workspaceId, folderId, chatId, bookmark }) => ({
        url: `workspaces/${workspaceId}/folders/${folderId}/chats/${chatId}/bookmarks/${bookmark.bookmarkId}`,
        method: 'PUT',
        body: bookmark,
      }),
    }),
    removeBookmark: builder.mutation({
      query: ({ workspaceId, folderId, chatId, bookmarkId }) => ({
        url: `workspaces/${workspaceId}/folders/${folderId}/chats/${chatId}/bookmarks/${bookmarkId}`,
        method: 'DELETE',
      }),
    }),

    // Media
    addMedia: builder.mutation({
      query: ({ workspaceId, folderId, chatId, media }) => ({
        url: `workspaces/${workspaceId}/folders/${folderId}/chats/${chatId}/media`,
        method: 'POST',
        body: media,
      }),
    }),
    updateMedia: builder.mutation({
      query: ({ workspaceId, folderId, chatId, media }) => ({
        url: `workspaces/${workspaceId}/folders/${folderId}/chats/${chatId}/media/${media.mediaId}`,
        method: 'PUT',
        body: media,
      }),
    }),
    removeMedia: builder.mutation({
      query: ({ workspaceId, folderId, chatId, mediaId }) => ({
        url: `workspaces/${workspaceId}/folders/${folderId}/chats/${chatId}/media/${mediaId}`,
        method: 'DELETE',
      }),
    }),

    // Tasks
    addTask: builder.mutation({
      query: ({ workspaceId, folderId, chatId, task }) => ({
        url: `workspaces/${workspaceId}/folders/${folderId}/chats/${chatId}/tasks`,
        method: 'POST',
        body: task,
      }),
    }),
    updateTask: builder.mutation({
      query: ({ workspaceId, folderId, chatId, task }) => ({
        url: `workspaces/${workspaceId}/folders/${folderId}/chats/${chatId}/tasks/${task.taskId}`,
        method: 'PUT',
        body: task,
      }),
    }),
    removeTask: builder.mutation({
      query: ({ workspaceId, folderId, chatId, taskId }) => ({
        url: `workspaces/${workspaceId}/folders/${folderId}/chats/${chatId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
    }),

    // Versions
    addVersion: builder.mutation({
      query: ({ workspaceId, folderId, chatId, version }) => ({
        url: `workspaces/${workspaceId}/folders/${folderId}/chats/${chatId}/versions`,
        method: 'POST',
        body: version,
      }),
    }),
    updateVersion: builder.mutation({
      query: ({ workspaceId, folderId, chatId, version }) => ({
        url: `workspaces/${workspaceId}/folders/${folderId}/chats/${chatId}/versions/${version.versionId}`,
        method: 'PUT',
        body: version,
      }),
    }),
    removeVersion: builder.mutation({
      query: ({ workspaceId, folderId, chatId, versionId }) => ({
        url: `workspaces/${workspaceId}/folders/${folderId}/chats/${chatId}/versions/${versionId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetWorkspacesQuery,
  useGetWorkspaceQuery,
  useAddWorkspaceMutation,
  useUpdateWorkspaceMutation,
  useRemoveWorkspaceMutation,
  useAddFolderMutation,
  useUpdateFolderMutation,
  useRemoveFolderMutation,
  useAddChatMutation,
  useUpdateChatMutation,
  useRemoveChatMutation,
  useAddMessageMutation,
  useUpdateMessageMutation,
  useRemoveMessageMutation,

  useAddAssessmentMutation,
  useUpdateAssessmentMutation,
  useRemoveAssessmentMutation,

  useAddSharedUserMutation,
  useUpdateSharedUserMutation,
  useRemoveSharedUserMutation,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useRemoveCommentMutation,
  useAddReplyMutation,
  useUpdateReplyMutation,
  useRemoveReplyMutation,
  useAddBookmarkMutation,
  useUpdateBookmarkMutation,
  useRemoveBookmarkMutation,
  useAddMediaMutation,
  useUpdateMediaMutation,
  useRemoveMediaMutation,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useRemoveTaskMutation,
  useAddVersionMutation,
  useUpdateVersionMutation,
  useRemoveVersionMutation,
} = workspaceApi;
