import { createApi } from '@reduxjs/toolkit/query/react';
import baseQuery from './baseQuery'; // Adjust the import path as needed

export const workspaceApi = createApi({
  reducerPath: 'workspaceApi',
  baseQuery,
  endpoints: (builder) => ({
    // Workspaces
    getWorkspaces: builder.query({
      query: (userId) => `workspace?userId=${userId}`,
      //query: () => 'workspace',
      providesTags: ['Workspace'],
    }),
    // `workspace/id`
    getWorkspace: builder.query({
      query: (workspaceId) => `workspace/${workspaceId}`,
      providesTags: ['Workspace'],
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
        url: `workspace/${workspace.workspaceId}`,
        method: 'PATCH',
        body: workspace,
      }),
      invalidatesTags: ['Workspace'],
    }),
    removeWorkspace: builder.mutation({
      query: (workspaceId) => ({
        url: `workspace/${workspaceId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Workspace'],
    }),

    // Folders
    addFolder: builder.mutation({
      query: ({ workspaceId, folderName, businessInfo }) => ({
        url: `workspace/${workspaceId}/folder`,
        method: 'POST',
        body: { folderName, businessInfo },
      }),
      invalidatesTags: ['Workspace'],
    }),
    updateFolder: builder.mutation({
      query: ({ workspaceId, folder }) => ({
        url: `workspace/${workspaceId}/folders/${folder.folderId}`,
        method: 'PUT',
        body: folder,
      }),
      invalidatesTags: ['Workspace'],
    }),
    removeFolder: builder.mutation({
      query: ({ workspaceId, folderId }) => ({
        url: `workspace/${workspaceId}/folders/${folderId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Workspace'],
    }),

    // Chats
    addChat: builder.mutation({
      query: ({ workspaceId, folderId, chat }) => ({
        url: `workspace/${workspaceId}/folder/${folderId}/chat`,
        method: 'POST',
        // body: chat,
      }),
      invalidatesTags: ['Workspace'],
    }),

    // Query to fetch the full chat object
    getChat: builder.query({
      query: ({ workspaceId, folderId, chatId }) =>
        `workspace/${workspaceId}/folder/${folderId}/chat/${chatId}/`,
      providesTags: (result, error, { workspaceId, folderId, chatId }) => [
        { type: 'Chat', id: `${workspaceId}-${folderId}-${chatId}` },
      ],
    }),

    updateChat: builder.mutation({
      query: ({ workspaceId, folderId, chatId, chat }) => ({
        url: `workspace/${workspaceId}/folder/${folderId}/chat/${chatId}`,
        method: 'PATCH',
        body: chat,
      }),
    }),

    removeChat: builder.mutation({
      query: ({ workspaceId, folderId, chatId }) => ({
        url: `workspace/${workspaceId}/folders/${folderId}/chats/${chatId}/`,
        method: 'DELETE',
      }),
    }),

    addMessage: builder.mutation({
      query: ({ workspaceId, folderId, chatId, message, files }) => {
        const formData = new FormData();
        formData.append('text', message);

        // Handle both single file and array of files
        if (files) {
          if (files instanceof File) {
            formData.append('pdfPath', files);
          } else if (files.length > 0) {
            formData.append('pdfPath', files[0]);
          }
        }

        // Use the actual chatId or handle for a new chat
        return {
          url: `workspace/${workspaceId}/folder/${folderId}/chat/${chatId}/message`,
          method: 'PATCH',
          body: formData,
        };
      },
      invalidatesTags: (result, error, { workspaceId, folderId, chatId }) => [
        {
          type: 'Chat',
          id: `${workspaceId}-${folderId}-${chatId || 'newChat'}`,
        },
        { type: 'Workspace', id: workspaceId },
        { type: 'Folder', id: `${workspaceId}-${folderId}` },
      ],
      async onQueryStarted(
        { workspaceId, folderId, chatId, message },
        { dispatch, queryFulfilled }
      ) {
        const tempId = `temp-${Date.now()}`;
        const timestamp = new Date().toISOString();
        const newChat = chatId === 'newChat'; // Determine if it's a new chat

        // Optimistic UI update: Add the new message to the chat (or create a new chat if necessary)
        const patchResult = dispatch(
          workspaceApi.util.updateQueryData(
            'getChat',
            { workspaceId, folderId, chatId: newChat ? tempId : chatId },
            (draft) => {
              // Create an empty message array if it's a new chat
              if (!draft.generalMessages) {
                draft.generalMessages = [];
              }
              // Push the new message
              draft.generalMessages.push({
                _id: tempId,
                text: message,
                sender: 'user',
                createdAt: timestamp,
                status: 'sending',
                files: [],
              });
            }
          )
        );

        try {
          // Wait for the query to be fulfilled (i.e., server response)
          const { data } = await queryFulfilled;
          // If it's a new chat, update the workspace with the new chatId
          if (newChat) {
            dispatch(
              workspaceApi.util.updateQueryData(
                'getWorkspace',
                { workspaceId },
                (draftWorkspace) => {
                  const folder = draftWorkspace.folders.find(
                    (folder) => folder._id === folderId
                  );
                  if (folder) {
                    folder.chats.push({
                      _id: data.chatId, // Use the new chatId from the server
                      generalMessages: [
                        {
                          _id: data._id, // Real message ID from the server
                          text: data.text,
                          sender: data.sender,
                          createdAt: data.createdAt,
                          status: 'sent',
                          files: data.files || [],
                        },
                      ],
                    });
                  }
                }
              )
            );
          } else {
            // If the chat already exists, update the message with the real data from the server
            dispatch(
              workspaceApi.util.updateQueryData(
                'getChat',
                { workspaceId, folderId, chatId },
                (draft) => {
                  const index = draft.generalMessages.findIndex(
                    (msg) => msg._id === tempId
                  );
                  if (index !== -1) {
                    draft.generalMessages[index] = {
                      ...draft.generalMessages[index],
                      _id: data._id, // Replace tempId with real ID
                      status: 'sent',
                      files: data.files || [],
                    };
                  }
                }
              )
            );
          }
        } catch (error) {
          // If the server request fails, undo the optimistic update
          patchResult.undo();
        }
      },
    }),

    updateMessage: builder.mutation({
      query: ({ workspaceId, folderId, chatId, messageId, message }) => ({
        url: `workspace/${workspaceId}/folder/${folderId}/chat/${chatId}/message/${messageId}`,
        method: 'PUT',
        body: message,
      }),
    }),
    removeMessage: builder.mutation({
      query: ({ workspaceId, folderId, chatId, messageId }) => ({
        url: `workspace/${workspaceId}/folders/${folderId}/chats/${chatId}/messages/${messageId}`,
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
    // AddAssessment
    addAssessmentSample: builder.mutation({
      query: ({
        workspaceId,
        folderId,
        chatId,
        message,
        files,
        assessmentName,
      }) => {
        const formData = new FormData();
        formData.append('text', message);

        // Append a single file or multiple files
        if (files && files.length > 0) {
          files.forEach((file, index) => {
            formData.append(`file${index}`, file);
          });
        }
        const bodyData = {
          assessmentName: assessmentName, //"Change Vision/Case for Change",
          message: { message },
        };

        return {
          url: `workspace/${workspaceId}/folder/${folderId}/assessment/${chatId}/assessment`,
          method: 'PATCH',
          body: bodyData,
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
    generateReport: builder.mutation({
      query: ({ workspaceId, folderId }) => ({
        url: `workspace/${workspaceId}/folder/${folderId}/assessment/reports`,
        method: 'POST',
      }),
    }),
    generateAllReport: builder.mutation({
      query: ({ workspaceId, folderId, chatId }) => ({
        url: `workspace/${workspaceId}/folder/${folderId}/assessment/${chatId}/reports`,
        method: 'POST',
      }),
    }),

    // Survey
    addProjectSurvey: builder.mutation({
      query: ({ workspaceId, folderId, survey }) => ({
        url: `workspace/${workspaceId}/folder/${folderId}/surveyInfo`,
        method: 'POST',
        body: survey,
      }),
    }),
    // Shared Users
    addSharedUser: builder.mutation({
      query: ({ workspaceId, folderId, chatId, user }) => ({
        url: `workspace/${workspaceId}/folders/${folderId}/chats/${chatId}/sharedUsers`,
        method: 'POST',
        body: user,
      }),
    }),
    updateSharedUser: builder.mutation({
      query: ({ workspaceId, folderId, chatId, user }) => ({
        url: `workspace/${workspaceId}/folders/${folderId}/chats/${chatId}/sharedUsers/${user.userId}`,
        method: 'PUT',
        body: user,
      }),
    }),
    removeSharedUser: builder.mutation({
      query: ({ workspaceId, folderId, chatId, userId }) => ({
        url: `workspace/${workspaceId}/folders/${folderId}/chats/${chatId}/sharedUsers/${userId}`,
        method: 'DELETE',
      }),
    }),

    // Comments
    addComment: builder.mutation({
      query: ({ workspaceId, folderId, chatId, messageId, text }) => ({
        url: `workspace/${workspaceId}/folder/${folderId}/chat/${chatId}/message/${messageId}/comment`,
        method: 'POST',
        body: { text },
      }),
    }),
    updateComment: builder.mutation({
      query: ({ workspaceId, folderId, chatId, commentId, text }) => ({
        url: `workspace/${workspaceId}/folder/${folderId}/chat/${chatId}/comment/${commentId}`,
        method: 'PATCH',
        body: { text },
      }),
    }),
    removeComment: builder.mutation({
      query: ({ workspaceId, folderId, chatId, commentId }) => ({
        url: `workspace/${workspaceId}/folders/${folderId}/chats/${chatId}/comments/${commentId}`,
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
        url: `workspace/${workspaceId}/folders/${folderId}/chats/${chatId}/comments/${commentId}/replies/${replyId}`,
        method: 'PUT',
        body: { text: updatedReply },
      }),
    }),
    removeReply: builder.mutation({
      query: ({ workspaceId, folderId, chatId, commentId, replyId }) => ({
        url: `workspace/${workspaceId}/folders/${folderId}/chats/${chatId}/comments/${commentId}/replies/${replyId}`,
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
        url: `workspace/${workspaceId}/folders/${folderId}/chats/${chatId}/bookmarks/${bookmark.bookmarkId}`,
        method: 'PUT',
        body: bookmark,
      }),
    }),
    removeBookmark: builder.mutation({
      query: ({ workspaceId, folderId, chatId, messageId, bookmarkId }) => ({
        url: `workspace/${workspaceId}/folder/${folderId}/chat/${chatId}/message/${messageId}/bookmark/${bookmarkId}`,
        method: 'DELETE',
      }),
    }),

    // Define likeChatMessage mutation
    likeChatMessage: builder.mutation({
      query: ({ workspaceId, folderId, chatId, messageId }) => ({
        url: `workspace/${workspaceId}/folder/${folderId}/chat/${chatId}/message/${messageId}/toggle-like`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, { workspaceId, folderId, chatId }) => [
        { type: 'Chat', id: `${workspaceId}-${folderId}-${chatId}` },
      ],
    }),

    // Define dislikeChatMessage mutation
    dislikeChatMessage: builder.mutation({
      query: ({ workspaceId, folderId, chatId, messageId }) => ({
        url: `workspace/${workspaceId}/folder/${folderId}/chat/${chatId}/message/${messageId}/toggle-dislike`,
        method: 'POST',
      }),
      invalidatesTags: (result, error, { workspaceId, folderId, chatId }) => [
        { type: 'Chat', id: `${workspaceId}-${folderId}-${chatId}` },
      ],
    }),

    // Media
    addMedia: builder.mutation({
      query: ({ workspaceId, folderId, chatId, media }) => ({
        url: `workspace/${workspaceId}/folders/${folderId}/chats/${chatId}/media`,
        method: 'POST',
        body: media,
      }),
    }),
    updateMedia: builder.mutation({
      query: ({ workspaceId, folderId, chatId, media }) => ({
        url: `workspace/${workspaceId}/folders/${folderId}/chats/${chatId}/media/${media.mediaId}`,
        method: 'PUT',
        body: media,
      }),
    }),
    removeMedia: builder.mutation({
      query: ({ workspaceId, folderId, chatId, mediaId }) => ({
        url: `workspace/${workspaceId}/folders/${folderId}/chats/${chatId}/media/${mediaId}`,
        method: 'DELETE',
      }),
    }),

    // Tasks
    addTask: builder.mutation({
      query: ({ workspaceId, folderId, chatId, task }) => ({
        url: `workspace/${workspaceId}/folders/${folderId}/chats/${chatId}/tasks`,
        method: 'POST',
        body: task,
      }),
    }),
    updateTask: builder.mutation({
      query: ({ workspaceId, folderId, chatId, task }) => ({
        url: `workspace/${workspaceId}/folders/${folderId}/chats/${chatId}/tasks/${task.taskId}`,
        method: 'PUT',
        body: task,
      }),
    }),
    removeTask: builder.mutation({
      query: ({ workspaceId, folderId, chatId, taskId }) => ({
        url: `workspace/${workspaceId}/folders/${folderId}/chats/${chatId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
    }),

    // Versions
    addVersion: builder.mutation({
      query: ({ workspaceId, folderId, chatId, version }) => ({
        url: `workspace/${workspaceId}/folders/${folderId}/chats/${chatId}/versions`,
        method: 'POST',
        body: version,
      }),
    }),
    updateVersion: builder.mutation({
      query: ({ workspaceId, folderId, chatId, version }) => ({
        url: `workspace/${workspaceId}/folders/${folderId}/chats/${chatId}/versions/${version.versionId}`,
        method: 'PUT',
        body: version,
      }),
    }),
    removeVersion: builder.mutation({
      query: ({ workspaceId, folderId, chatId, versionId }) => ({
        url: `workspace/${workspaceId}/folders/${folderId}/chats/${chatId}/versions/${versionId}`,
        method: 'DELETE',
      }),
    }),
    moveToTrash: builder.mutation({
      query: ({ entityType, id }) => ({
        url: `workspace/${entityType}/${id}/moveToTrash`,
        method: 'PATCH',
      }),
    }),
    restoreFromTrash: builder.mutation({
      query: ({ entityType, id }) => ({
        url: `/${entityType}/${id}/restoreFromTrash`,
        method: 'PATCH',
      }),
    }),
    addFeedback: builder.mutation({
      query: (newFeedback) => ({
        url: 'feedback',
        method: 'POST',
        body: newFeedback,
      }),
      // invalidatesTags: ['Workspace'],
    }),
    editReport: builder.mutation({
      query: ({ assessmentId, title, content }) => ({
        url: `workspace-assessment/${assessmentId}/report`,
        method: 'PATCH',
        body: { title: title, content: content },
      }),
    }),
    downloadReport: builder.mutation({
      query: ({ assessmentId }) => ({
        url: `/workspace-assessment/${assessmentId}/report/download`,
        method: 'GET',
        responseHandler: (response) => response.blob(), // Process as Blob
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
  useGenerateAllReportMutation,
  useGenerateReportMutation,
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
  useAddProjectSurveyMutation,
  useGetChatQuery,
  useMoveToTrashMutation,
  useRestoreFromTrashMutation,
  useLikeChatMessageMutation,
  useDislikeChatMessageMutation,
  useAddFeedbackMutation,
  useEditReportMutation,
  useDownloadReportMutation,
} = workspaceApi;
