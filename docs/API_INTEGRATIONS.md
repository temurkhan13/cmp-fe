# CMP Frontend — API Integrations

All API calls made by the frontend, grouped by feature. The base URL is configured via the `VITE_API_URL` environment variable. Authentication uses a Bearer token in the `Authorization` header, with automatic refresh via `/auth/refresh-tokens` on 401 responses.

---

## 1. Authentication

| Method | Endpoint | Description | Source |
|--------|----------|-------------|--------|
| POST | `/auth/login` | User login | `authSlice.js`, `useLogin.js` |
| POST | `/auth/` | User registration | `authSlice.js`, `useRegister.js` |
| POST | `/auth/refresh-tokens` | Refresh access token | `axios.js`, `baseQuery.js` |
| POST | `/auth/verification` | Verify email / forgot password OTP | `authSlice.js`, `useVerifyEmail.js`, `useForgotVerification.js` |
| POST | `/auth/email/send-verification` | Resend verification code | `authSlice.js` |
| POST | `/auth/forgot/password` | Request forgot password | `authSlice.js` |
| POST | `/auth/reset/password` | Reset password with OTP | `authSlice.js` |
| POST | `/auth/get-user-from-token` | Get user from token (Google OAuth) | `authSlice.js` |
| POST | `/auth/change-password` | Change password | `ChangePassword.jsx` |
| DELETE | `/auth/delete-account` | Delete user account | `PersonalInfo.jsx` |
| GET | `/auth/users/{userId}` | Get user by ID | `authSlice.js` |
| PATCH | `/auth/users/{userId}` | Update user profile (supports photo upload) | `userSlice.js` |

---

## 2. Workspace Management

| Method | Endpoint | Description | Source |
|--------|----------|-------------|--------|
| GET | `/workspace?userId={userId}` | Get all workspaces for a user | `workspaceApi.js` |
| GET | `/workspace/{workspaceId}` | Get workspace by ID | `workspaceApi.js` |
| POST | `/workspace` | Create workspace | `workspaceApi.js` |
| PATCH | `/workspace/{workspaceId}` | Update workspace | `workspaceApi.js`, `workspacesSlice.js`, `FileStructure.jsx` |
| DELETE | `/workspace/{workspaceId}` | Delete workspace | `workspaceApi.js` |
| GET | `/workspace/user/dashboard-stats` | Fetch dashboard statistics | `workspacesSlice.js` |
| PATCH | `/workspace/{entityType}/{id}/moveToTrash` | Move item to trash | `workspaceApi.js` |
| PATCH | `/{entityType}/{id}/restoreFromTrash` | Restore item from trash | `workspaceApi.js` |

---

## 3. Folder Management

| Method | Endpoint | Description | Source |
|--------|----------|-------------|--------|
| POST | `/workspace/{workspaceId}/folder` | Add folder | `workspaceApi.js` |
| PUT | `/workspace/{workspaceId}/folders/{folderId}` | Update folder | `workspaceApi.js` |
| DELETE | `/workspace/{workspaceId}/folders/{folderId}` | Delete folder | `workspaceApi.js` |
| GET | `/workspace/{workspaceId}/folder/{folderId}` | Get folder data | `folderSlice.js` |
| PATCH | `/workspace/{workspaceId}/folder/{folderId}` | Update / rename folder | `folderSlice.js` |

---

## 4. Chat Management

| Method | Endpoint | Description | Source |
|--------|----------|-------------|--------|
| POST | `/workspace/{workspaceId}/folder/{folderId}/chat` | Create chat | `workspaceApi.js` |
| GET | `/workspace/{workspaceId}/folder/{folderId}/chat/{chatId}/` | Get chat | `workspaceApi.js` |
| PATCH | `/workspace/{workspaceId}/folder/{folderId}/chat/{chatId}` | Update chat | `workspaceApi.js` |
| DELETE | `/workspace/{workspaceId}/folders/{folderId}/chats/{chatId}/` | Delete chat | `workspaceApi.js` |

---

## 5. Messages

| Method | Endpoint | Description | Source |
|--------|----------|-------------|--------|
| PATCH | `/workspace/{workspaceId}/folder/{folderId}/chat/{chatId}/message` | Add message | `workspaceApi.js` |
| PUT | `/workspace/{workspaceId}/folder/{folderId}/chat/{chatId}/message/{messageId}` | Update message | `workspaceApi.js` |
| DELETE | `/workspace/{workspaceId}/folders/{folderId}/chats/{chatId}/messages/{messageId}` | Delete message | `workspaceApi.js` |
| POST | `/workspace/{workspaceId}/folder/{folderId}/chat/{chatId}/message/{messageId}/toggle-like` | Like message | `workspaceApi.js` |
| POST | `/workspace/{workspaceId}/folder/{folderId}/chat/{chatId}/message/{messageId}/toggle-dislike` | Dislike message | `workspaceApi.js` |

---

## 6. Comments & Replies

| Method | Endpoint | Description | Source |
|--------|----------|-------------|--------|
| POST | `/workspace/{workspaceId}/folder/{folderId}/chat/{chatId}/message/{messageId}/comment` | Add comment | `workspaceApi.js` |
| PATCH | `/workspace/{workspaceId}/folder/{folderId}/chat/{chatId}/comment/{commentId}` | Update comment | `workspaceApi.js` |
| DELETE | `/workspace/{workspaceId}/folders/{folderId}/chats/{chatId}/comments/{commentId}` | Delete comment | `workspaceApi.js` |
| POST | `/workspace/{workspaceId}/folder/{folderId}/chat/{chatId}/comment/{commentId}/reply` | Add reply | `workspaceApi.js` |
| PUT | `/workspace/{workspaceId}/folders/{folderId}/chats/{chatId}/comments/{commentId}/replies/{replyId}` | Update reply | `workspaceApi.js` |
| DELETE | `/workspace/{workspaceId}/folders/{folderId}/chats/{chatId}/comments/{commentId}/replies/{replyId}` | Delete reply | `workspaceApi.js` |

---

## 7. Bookmarks

| Method | Endpoint | Description | Source |
|--------|----------|-------------|--------|
| POST | `/workspace/{workspaceId}/folder/{folderId}/chat/{chatId}/message/{messageId}/bookmark` | Add bookmark | `workspaceApi.js` |
| PUT | `/workspace/{workspaceId}/folders/{folderId}/chats/{chatId}/bookmarks/{bookmarkId}` | Update bookmark | `workspaceApi.js` |
| DELETE | `/workspace/{workspaceId}/folder/{folderId}/chat/{chatId}/message/{messageId}/bookmark/{bookmarkId}` | Delete bookmark | `workspaceApi.js` |

---

## 8. Media

| Method | Endpoint | Description | Source |
|--------|----------|-------------|--------|
| POST | `/workspace/{workspaceId}/folders/{folderId}/chats/{chatId}/media` | Add media | `workspaceApi.js` |
| PUT | `/workspace/{workspaceId}/folders/{folderId}/chats/{chatId}/media/{mediaId}` | Update media | `workspaceApi.js` |
| DELETE | `/workspace/{workspaceId}/folders/{folderId}/chats/{chatId}/media/{mediaId}` | Delete media | `workspaceApi.js` |

---

## 9. Tasks

| Method | Endpoint | Description | Source |
|--------|----------|-------------|--------|
| POST | `/workspace/{workspaceId}/folders/{folderId}/chats/{chatId}/tasks` | Add task | `workspaceApi.js` |
| PUT | `/workspace/{workspaceId}/folders/{folderId}/chats/{chatId}/tasks/{taskId}` | Update task | `workspaceApi.js` |
| DELETE | `/workspace/{workspaceId}/folders/{folderId}/chats/{chatId}/tasks/{taskId}` | Delete task | `workspaceApi.js` |

---

## 10. Versions

| Method | Endpoint | Description | Source |
|--------|----------|-------------|--------|
| POST | `/workspace/{workspaceId}/folders/{folderId}/chats/{chatId}/versions` | Add version | `workspaceApi.js` |
| PUT | `/workspace/{workspaceId}/folders/{folderId}/chats/{chatId}/versions/{versionId}` | Update version | `workspaceApi.js` |
| DELETE | `/workspace/{workspaceId}/folders/{folderId}/chats/{chatId}/versions/{versionId}` | Delete version | `workspaceApi.js` |

---

## 11. Shared Users (Collaboration)

| Method | Endpoint | Description | Source |
|--------|----------|-------------|--------|
| POST | `/workspace/{workspaceId}/folders/{folderId}/chats/{chatId}/sharedUsers` | Add shared user | `workspaceApi.js` |
| PUT | `/workspace/{workspaceId}/folders/{folderId}/chats/{chatId}/sharedUsers/{userId}` | Update shared user | `workspaceApi.js` |
| DELETE | `/workspace/{workspaceId}/folders/{folderId}/chats/{chatId}/sharedUsers/{userId}` | Remove shared user | `workspaceApi.js` |

---

## 12. Assessments

| Method | Endpoint | Description | Source |
|--------|----------|-------------|--------|
| POST | `/workspace/{workspaceId}/folder/{folderId}/assessment` | Create assessment | `useAssessment.js` |
| GET | `/workspace-assessment/{id}` | Get assessment by ID | `useAssessment.js`, `useGenerateSingleReport.js` |
| POST | `/workspace-assessment/` | Start assessment | `usestartAssessment.js` |
| POST | `/assessment/` | Update assessment | `useUpdateAssessment.js` |
| PATCH | `/workspace-assessment/{assessmentId}/answer` | Submit assessment answer | `useAssessmentReport.js` |
| GET | `/workspace-assessment?folderId={folderId}` | Get assessments by folder | `folderSlice.js` |
| PATCH | `/workspace/{workspaceId}/folder/{folderId}/assessment/{chatId}/message` | Add assessment message | `workspaceApi.js` |
| PATCH | `/workspace/{workspaceId}/folder/{folderId}/assessment/{chatId}/assessment` | Add assessment sample | `workspaceApi.js` |
| PUT | `/workspace/{workspaceId}/folder/{folderId}/assessment/{chatId}/messages/{messageId}` | Update assessment message | `workspaceApi.js` |
| DELETE | `/workspace/{workspaceId}/folder/{folderId}/assessment/{chatId}/messages/{messageId}` | Delete assessment message | `workspaceApi.js` |
| POST | `/workspace/{workspaceId}/folder/{folderId}/assessment/reports` | Generate all reports | `workspaceApi.js` |
| POST | `/workspace/{workspaceId}/folder/{folderId}/assessment/{chatId}/reports` | Generate report for chat | `workspaceApi.js` |
| PATCH | `/workspace-assessment/{assessmentId}/report` | Edit report | `workspaceApi.js` |
| GET | `/workspace-assessment/{assessmentId}/report/download` | Download report | `workspaceApi.js` |

---

## 13. AI Chat

| Method | Endpoint | Description | Source |
|--------|----------|-------------|--------|
| POST | `/chat/` | Chat with document (FormData) | `useChat.js` |
| POST | `/chat` | Streaming chat (hits external AI URL) | `useStreamingChat.js` |
| POST | `/chat/ingest` | Ingest documents into RAG | `ragApi.js` |
| POST | `/chat/search` | Search ingested documents | `ragApi.js` |
| POST | `/support/chat` | Support chat | `SupportChat.jsx` |

---

## 14. AI Writing Tools

| Method | Endpoint | Description | Source |
|--------|----------|-------------|--------|
| POST | `/chat/summarize` | Summarize text | `useSummarize.js` |
| POST | `/chat/translate` | Translate text | `useTranslation.js` |
| POST | `/chat/explain` | Explain text | `useExplain.js` |
| POST | `/chat/grammar-fix` | Fix grammar | `useGrammarFix.js` |
| POST | `/chat/change-tone` | Change tone of text | `useChangeTone.js` |
| POST | `/chat/imporve-writing` | Improve writing *(typo in endpoint name)* | `useImproveWriting.js` |
| POST | `/chat/short-text` | Make text shorter | `useShorter.js` |
| POST | `/chat/long-text` | Make text longer | `useLonger.js` |
| POST | `/chat/comprehensive` | Make text comprehensive | `useComprehensive.js` |
| POST | `/chat/inspire-me` | Get inspiration | `useInspire.js` |
| POST | `/chat/auto/` | Auto-write text | `useAuto.js` |

---

## 15. Subscriptions & Billing

| Method | Endpoint | Description | Source |
|--------|----------|-------------|--------|
| GET | `/subscription` | Get available subscription plans | `PlanAndBilling.jsx` |
| GET | `/auth/user-subscription` | Get user's active subscription | `PlanAndBilling.jsx` |
| POST | `/subscription` | Subscribe to a plan (returns checkout URL) | `PlanAndBilling.jsx` |

---

## 16. Trash

| Method | Endpoint | Description | Source |
|--------|----------|-------------|--------|
| GET | `/workspace/user/trash` | Fetch trashed items | `trashSlice.js` |
| PATCH | `/workspace/{type}/{id}/restoreFromTrash` | Restore item from trash | `trashSlice.js` |
| DELETE | `/workspace/{type}/{id}/deleteFromTrash` | Permanently delete item | `trashSlice.js` |

---

## 17. Document Upload & Text Extraction

| Method | Endpoint | Description | Source |
|--------|----------|-------------|--------|
| POST | `/workspace/extract-text` | Extract text from uploaded document (FormData) | `RAGUpload.jsx` |

---

## 18. Survey

| Method | Endpoint | Description | Source |
|--------|----------|-------------|--------|
| POST | `/workspace/{workspaceId}/folder/{folderId}/surveyInfo` | Add project survey | `workspaceApi.js` |

---

## 19. Feedback

| Method | Endpoint | Description | Source |
|--------|----------|-------------|--------|
| POST | `/feedback` | Submit user feedback | `workspaceApi.js` |

---

## 20. Digital Playbooks

| Method | Endpoint | Description | Source |
|--------|----------|-------------|--------|
| GET | `/dpb/sitemap` | Get all digital playbooks | `Playbook-List.jsx` |

---

## Known Issues

| Issue | Location |
|-------|----------|
| Typo in endpoint: `/chat/imporve-writing` (should be `/chat/improve-writing`) | `useImproveWriting.js` |
| `useStreamingChat.js` calls an external hardcoded AI URL (`https://cmp-ai-check.onrender.com`) as a default fallback | `useStreamingChat.js` |
| `useManagerUser.js` uses a different URL pattern (`/fetchUserShareData`, `/inviteUser`, `/fetchSharedUsers`, etc.) — may be legacy | `useManagerUser.js` |
| `useManagerChat.js` uses a different URL pattern (`/initialData`, `/moveChatToFolder`, `/folders/{folderId}`, etc.) — may be legacy | `useManagerChat.js` |
