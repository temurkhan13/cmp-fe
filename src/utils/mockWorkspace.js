const mockWorkspace = [
  {
  workspaceId: "workspaceId1",
  workspaceName: "Workspace 1",
  userId: "userId1",  // Owner of the workspace
  createdAt: "2024-07-12T12:00:00Z",
  updatedAt: "2024-07-12T12:00:00Z",
  folders: [
    {
      folderId: "folderId1",
      folderName: "Folder 1",
      createdAt: "2024-07-12T12:00:00Z",
      updatedAt: "2024-07-12T12:00:00Z",
      chats: [
        {
          chatId: "chatId1",
          version: 1,
          chatTitle: "How to Change Management",
          createdAt: "2024-07-12T12:00:00Z",
          updatedAt: "2024-07-12T12:00:00Z",
          generalMessages: [
            {
              messageId: "msgId1",
              role: "user",
              file: "",
              userId: "userId1",
              content: "Hello everyone!",
              timestamp: "2024-07-12T12:00:00Z",
              createdAt: "2024-07-12T12:00:00Z",
              updatedAt: "2024-07-12T12:00:00Z"
            },
            {
              messageId: "msgId2",
              userId: "userId2",
              content: "Hi there!",
              timestamp: "2024-07-12T12:01:00Z",
              createdAt: "2024-07-12T12:01:00Z",
              updatedAt: "2024-07-12T12:01:00Z"
            }
          ],
          sharedUsers: [
            {
              userId: "userId3",
              role: "canView",
              addedAt: "2024-07-12T12:15:00Z"
            },
            {
              userId: "userId4",
              role: "canEdit",
              addedAt: "2024-07-12T12:20:00Z"
            }
          ],
          comments: [
            {
              commentId: "commentId1",
              userId: "userId2",
              userName: "jerard",
              text: "Nice message!",
              timestamp: "2024-07-12T12:37:00Z",
              status: "Completed",
              createdAt: "2024-07-12T12:37:00Z",
              updatedAt: "2024-07-12T12:37:00Z",
              messageId: "msgId1",  // Relevant message ID
              replies: [
                {
                  replyId: "replyId1",
                  userId: "userId3",
                  userName: "Raphale",
                  text: "I agree!",
                  timestamp: "2024-07-12T12:38:00Z",
                  createdAt: "2024-07-12T12:38:00Z",
                  updatedAt: "2024-07-12T12:38:00Z",
                  messageId: "msgId1"  // Relevant message ID
                }
              ]
            }
          ],
          bookmarks: [
            {
              bookmarkId: "bookmarkId1",
              userId: "userId4",
              timestamp: "2024-07-12T12:40:00Z",
              date: "2024-07-12",
              createdAt: "2024-07-12T12:40:00Z",
              updatedAt: "2024-07-12T12:40:00Z",
              messageId: "msgBookmarkId1",
              messages: [
                {
                  messageId: "msgBookmarkId1",
                  sender: "ChangeAI",
                  text: "The ADKAR model is a framework designed to guide individuals and organizations through change. Developed by Jeff Hiatt, it provides a structured approach to understanding and managing change at both personal and organizational levels.",
                  savedBy: "You",
                  createdAt: "2024-07-12T12:40:00Z",
                  updatedAt: "2024-07-12T12:40:00Z"
                }
              ]
            }
          ],
          media: [
            {
              mediaId: "mediaId1",
              url: "http://example.com/media.jpg",
              timestamp: "2024-07-12T12:41:00Z",
              createdAt: "2024-07-12T12:41:00Z",
              updatedAt: "2024-07-12T12:41:00Z",
              messageId: "msgId1"  // Relevant message ID
            }
          ],
          tasks: [
            { 
              taskId: "taskId1",
              name: "Assessment Progress",
              progress: 3,
              createdAt: "2024-07-12T12:00:00Z",
              updatedAt: "2024-07-12T12:00:00Z",
              messageId: "msgId1"  // Relevant message ID
            },
            { 
              taskId: "taskId2",
              name: "Change vision/case for change",
              progress: 24,
              createdAt: "2024-07-12T12:00:00Z",
              updatedAt: "2024-07-12T12:00:00Z",
              messageId: "msgId2"  // Relevant message ID
            }
          ],
          versions: [
            {
              versionId: "versionId1",
              date: "2024-07-12T14:13:00Z",
              users: [{ name: "Imran" }, { name: "Sherrimac Gyver" }],
              createdAt: "2024-07-12T14:13:00Z",
              updatedAt: "2024-07-12T14:13:00Z"
            }
          ],
          images: [
            {
              imageId: "imageId1",
              url: "https://picsum.photos/id/0/5000/3333",
              createdAt: "2024-07-12T12:00:00Z",
              updatedAt: "2024-07-12T12:00:00Z",
              messageId: "msgId1"  // Relevant message ID
            },
            {
              imageId: "imageId2",
              url: "https://picsum.photos/id/7/4728/3168",
              createdAt: "2024-07-12T12:00:00Z",
              updatedAt: "2024-07-12T12:00:00Z",
              messageId: "msgId2"  // Relevant message ID
            }
          ],
          documents: [
            {
              documentId: "docId1",
              name: "file_name_123",
              date: "2024-04-18T18:17:00Z",
              size: "2345 KB",
              createdAt: "2024-04-18T18:17:00Z",
              updatedAt: "2024-04-18T18:17:00Z",
              messageId: "msgId1"  // Relevant message ID
            }
          ],
          links: [
            {
              linkId: "linkId1",
              name: "Figma Design",
              url: "https://www.figma.com/design/NFE9opL7eqFHBJ...",
              createdAt: "2024-07-12T12:00:00Z",
              updatedAt: "2024-07-12T12:00:00Z",
              messageId: "msgId2"  // Relevant message ID
            }
          ]
        },
        {
          chatId: "chatId2",
          version: 1,
          chatTitle: "update Change Management",
          createdAt: "2024-07-12T12:00:00Z",
          updatedAt: "2024-07-12T12:00:00Z",
          generalMessages: [
            {
              messageId: "msgId1",
              role: "user",
              file: "",
              userId: "userId1",
              content: "Hello everyone!",
              timestamp: "2024-07-12T12:00:00Z",
              createdAt: "2024-07-12T12:00:00Z",
              updatedAt: "2024-07-12T12:00:00Z"
            },
            {
              messageId: "msgId2",
              userId: "userId2",
              role: "ai",
              content: "Hi Hami!",
              timestamp: "2024-07-12T12:01:00Z",
              createdAt: "2024-07-12T12:01:00Z",
              updatedAt: "2024-07-12T12:01:00Z"
            }
          ],
          sharedUsers: [
            {
              userId: "userId3",
              role: "canView",
              addedAt: "2024-07-12T12:15:00Z"
            },
            {
              userId: "userId4",
              role: "canEdit",
              addedAt: "2024-07-12T12:20:00Z"
            }
          ],
          comments: [
            {
              commentId: "commentId1",
              userId: "userId2",
              userName: "jerard",
              text: "Nice message!",
              timestamp: "2024-07-12T12:37:00Z",
              status: "Completed",
              createdAt: "2024-07-12T12:37:00Z",
              updatedAt: "2024-07-12T12:37:00Z",
              messageId: "msgId1",  // Relevant message ID
              replies: [
                {
                  replyId: "replyId1",
                  userId: "userId3",
                  userName: "Raphale",
                  text: "I agree!",
                  timestamp: "2024-07-12T12:38:00Z",
                  createdAt: "2024-07-12T12:38:00Z",
                  updatedAt: "2024-07-12T12:38:00Z",
                  messageId: "msgId1"  // Relevant message ID
                }
              ]
            }
          ],
          bookmarks: [
            {
              bookmarkId: "bookmarkId1",
              userId: "userId4",
              timestamp: "2024-07-12T12:40:00Z",
              date: "2024-07-12",
              createdAt: "2024-07-12T12:40:00Z",
              updatedAt: "2024-07-12T12:40:00Z",
              messageId: "msgBookmarkId1",
              messages: [
                {
                  messageId: "msgBookmarkId1",
                  sender: "ChangeAI",
                  text: "The ADKAR model is a framework designed to guide individuals and organizations through change. Developed by Jeff Hiatt, it provides a structured approach to understanding and managing change at both personal and organizational levels.",
                  savedBy: "You",
                  createdAt: "2024-07-12T12:40:00Z",
                  updatedAt: "2024-07-12T12:40:00Z"
                }
              ]
            }
          ],
          media: [
            {
              mediaId: "mediaId1",
              url: "http://example.com/media.jpg",
              timestamp: "2024-07-12T12:41:00Z",
              createdAt: "2024-07-12T12:41:00Z",
              updatedAt: "2024-07-12T12:41:00Z",
              messageId: "msgId1"  // Relevant message ID
            }
          ],
          tasks: [
            { 
              taskId: "taskId1",
              name: "Assessment Progress",
              progress: 3,
              createdAt: "2024-07-12T12:00:00Z",
              updatedAt: "2024-07-12T12:00:00Z",
              messageId: "msgId1"  // Relevant message ID
            },
            { 
              taskId: "taskId2",
              name: "Change vision/case for change",
              progress: 24,
              createdAt: "2024-07-12T12:00:00Z",
              updatedAt: "2024-07-12T12:00:00Z",
              messageId: "msgId2"  // Relevant message ID
            }
          ],
          versions: [
            {
              versionId: "versionId1",
              date: "2024-07-12T14:13:00Z",
              users: [{ name: "Imran" }, { name: "Sherrimac Gyver" }],
              createdAt: "2024-07-12T14:13:00Z",
              updatedAt: "2024-07-12T14:13:00Z"
            }
          ],
          images: [
            {
              imageId: "imageId1",
              url: "https://picsum.photos/id/0/5000/3333",
              createdAt: "2024-07-12T12:00:00Z",
              updatedAt: "2024-07-12T12:00:00Z",
              messageId: "msgId1"  // Relevant message ID
            },
            {
              imageId: "imageId2",
              url: "https://picsum.photos/id/7/4728/3168",
              createdAt: "2024-07-12T12:00:00Z",
              updatedAt: "2024-07-12T12:00:00Z",
              messageId: "msgId2"  // Relevant message ID
            }
          ],
          documents: [
            {
              documentId: "docId1",
              name: "file_name_123",
              date: "2024-04-18T18:17:00Z",
              size: "2345 KB",
              createdAt: "2024-04-18T18:17:00Z",
              updatedAt: "2024-04-18T18:17:00Z",
              messageId: "msgId1"  // Relevant message ID
            }
          ],
          links: [
            {
              linkId: "linkId1",
              name: "Figma Design",
              url: "https://www.figma.com/design/NFE9opL7eqFHBJ...",
              createdAt: "2024-07-12T12:00:00Z",
              updatedAt: "2024-07-12T12:00:00Z",
              messageId: "msgId2"  // Relevant message ID
            }
          ]
        }
      ],
      assessments: [
        {
          assessmentId: "assessment1",
          version: 1,
          assessmentTitle: "How to Change Management",
          createdAt: "2024-07-12T12:00:00Z",
          updatedAt: "2024-07-12T12:00:00Z",
          report:[
            {
            reportId:'report1',
            finalReport:'',
                finalReportURL:'',
                ReportTitle: "Change vision/case for change",
                createdAt: "2024-07-12T12:00:00Z",
                updatedAt: "2024-07-12T12:00:00Z",
            subReport:
            [ 
              {
                subReportId:'changeVisionCaseId1',
                finalSubReport:'',
                finalSubReportURL:'',
                ReportTitle: "Change vision/case for change",
                createdAt: "2024-07-12T12:00:00Z",
                updatedAt: "2024-07-12T12:00:00Z",
                questionAnswer:[
                  {
                    "question": {
                      "questionId": "msgId1",
                      "role": "system",
                      "userId": "userId1",
                      "content": "Hello everyone!",
                      "timestamp": "2024-07-12T12:00:00Z",
                      "createdAt": "2024-07-12T12:00:00Z",
                      "updatedAt": "2024-07-12T12:00:00Z"
                    },
                    "answer": {
                      "answerId": "msgId2",
                      "role": "user",
                      "userId": "userId1",
                      "content": "Hello!",
                      "timestamp": "2024-07-12T12:05:00Z",
                      "createdAt": "2024-07-12T12:05:00Z",
                      "updatedAt": "2024-07-12T12:05:00Z"
                    }
                  }
          ]
          }
          ]
          },
          ],            
          sharedUsers: [
            {
              userId: "userId3",
              role: "canView",
              addedAt: "2024-07-12T12:15:00Z"
            },
            {
              userId: "userId4",
              role: "canEdit",
              addedAt: "2024-07-12T12:20:00Z"
            }
          ],
          comments: [
            {
              commentId: "commentId1",
              userId: "userId2",
              userName: "jerard",
              text: "Nice message!",
              timestamp: "2024-07-12T12:37:00Z",
              status: "Completed",
              createdAt: "2024-07-12T12:37:00Z",
              updatedAt: "2024-07-12T12:37:00Z",
              messageId: "msgId1",  // Relevant message ID
              replies: [
                {
                  replyId: "replyId1",
                  userId: "userId3",
                  userName: "Raphale",
                  text: "I agree!",
                  timestamp: "2024-07-12T12:38:00Z",
                  createdAt: "2024-07-12T12:38:00Z",
                  updatedAt: "2024-07-12T12:38:00Z",
                  messageId: "msgId1"  // Relevant message ID
                }
              ]
            }
          ],
          bookmarks: [
            {
              bookmarkId: "bookmarkId1",
              userId: "userId4",
              timestamp: "2024-07-12T12:40:00Z",
              date: "2024-07-12",
              createdAt: "2024-07-12T12:40:00Z",
              updatedAt: "2024-07-12T12:40:00Z",
              messageId: "msgBookmarkId1",
              messages: [
                {
                  messageId: "msgBookmarkId1",
                  sender: "ChangeAI",
                  text: "The ADKAR model is a framework designed to guide individuals and organizations through change. Developed by Jeff Hiatt, it provides a structured approach to understanding and managing change at both personal and organizational levels.",
                  savedBy: "You",
                  createdAt: "2024-07-12T12:40:00Z",
                  updatedAt: "2024-07-12T12:40:00Z"
                }
              ]
            }
          ],
          media: [
            {
              mediaId: "mediaId1",
              url: "http://example.com/media.jpg",
              timestamp: "2024-07-12T12:41:00Z",
              createdAt: "2024-07-12T12:41:00Z",
              updatedAt: "2024-07-12T12:41:00Z",
              messageId: "msgId1"  // Relevant message ID
            }
          ],
          tasks: [
            { 
              taskId: "taskId1",
              name: "Assessment Progress",
              progress: 3,
              createdAt: "2024-07-12T12:00:00Z",
              updatedAt: "2024-07-12T12:00:00Z",
              messageId: "msgId1"  // Relevant message ID
            },
            { 
              taskId: "taskId2",
              name: "Change vision/case for change",
              progress: 24,
              createdAt: "2024-07-12T12:00:00Z",
              updatedAt: "2024-07-12T12:00:00Z",
              messageId: "msgId2"  // Relevant message ID
            }
          ],
          versions: [
            {
              versionId: "versionId1",
              date: "2024-07-12T14:13:00Z",
              users: [{ name: "Imran" }, { name: "Sherrimac Gyver" }],
              createdAt: "2024-07-12T14:13:00Z",
              updatedAt: "2024-07-12T14:13:00Z"
            }
          ],
          images: [
            {
              imageId: "imageId1",
              url: "https://picsum.photos/id/0/5000/3333",
              createdAt: "2024-07-12T12:00:00Z",
              updatedAt: "2024-07-12T12:00:00Z",
              messageId: "msgId1"  // Relevant message ID
            },
            {
              imageId: "imageId2",
              url: "https://picsum.photos/id/7/4728/3168",
              createdAt: "2024-07-12T12:00:00Z",
              updatedAt: "2024-07-12T12:00:00Z",
              messageId: "msgId2"  // Relevant message ID
            }
          ],
          documents: [
            {
              documentId: "docId1",
              name: "file_name_123",
              date: "2024-04-18T18:17:00Z",
              size: "2345 KB",
              createdAt: "2024-04-18T18:17:00Z",
              updatedAt: "2024-04-18T18:17:00Z",
              messageId: "msgId1"  // Relevant message ID
            }
          ],
          links: [
            {
              linkId: "linkId1",
              name: "Figma Design",
              url: "https://www.figma.com/design/NFE9opL7eqFHBJ...",
              createdAt: "2024-07-12T12:00:00Z",
              updatedAt: "2024-07-12T12:00:00Z",
              messageId: "msgId2"  // Relevant message ID
            }
          ]
        }
      ]
    }
  ]
}
];

export default mockWorkspace;