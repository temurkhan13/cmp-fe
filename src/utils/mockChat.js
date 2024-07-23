const mockChat = [
 {
  
      "chatId": "chatId1",
      "version": 1,
      "chatTitle" : "How to Change Management",
      "generalMessages": [
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        }
      ],
      "sharedUsers": [
        {
          "userId": "userId3",
          "role": "canView"
        },
        {
          "userId": "userId4",
          "role": "canEdit"
        }
      ],
      "comments": [
        {
          "commentId": "commentId1",
          "userId": "userId2",
          "userName": "jerard",
          "text": "Nice message!",
          "timestamp": "2024-07-12T12:37:00Z",
          "status": 'It’s Completed.',
          "replies": [
            {
              "replyId": "replyId1",
              "userId": "userId3",
              "userName": "Raphale",
              "text": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            },
            {
              "replyId": "replyId2",
              "userId": "userId3",
              "userName": "Raphale",
              "text": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            },
            {
              "replyId": "replyId3",
              "userId": "userId3",
              "userName": "Raphale",
              "text": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            }
          ]
        },
        {
          "commentId": "commentId2",
          "userId": "userId3",
          "userName": "herard",
          "text": "This is that thing!",
          "timestamp": "2024-07-12T12:37:00Z",
          "status": 'It’s Completed.',
          "replies": [
            {
              "replyId": "replyId1",
              "userId": "userId3",
              "userName": "Raphale",
              "text": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            }
          ]
        },
      ],
      "bookmarks": [
        {
          "bookmarkId": "bookmarkId1",
          "userId": "userId4",
          "timestamp": "2024-07-12T12:40:00Z",
          "date": "2024-07-12",
          "messages": [
            {
              "sender": 'ChangeAI',
              "text": 'The ADKAR model is a framework designed to guide individuals and organizations through change. Developed by Jeff Hiatt, it provides a structured approach to understanding and managing change at both personal and organizational levels.',
              "savedBy": 'You',
            },
          ],
        },
        {
          "bookmarkId": "bookmarkId2",
          "userId": "userId4",
          "timestamp": "2024-07-12T12:40:00Z",
          "date": "2024-07-12",
          "messages": [
            {
              "sender": 'ChangeAI',
              "text": 'How the ADKAR model is a framework designed to guide individuals and organizations through change. Developed by Jeff Hiatt, it provides a structured approach to understanding and managing change at both personal and organizational levels.',
              "savedBy": 'You',
            },
          ],
        }
      ],
      "media": [
        {
          "mediaId": "mediaId1",
          "url": "http://example.com/media.jpg",
          "timestamp": "2024-07-12T12:41:00Z"
        }
      ],
      "tasks": [
        { "name": "Assessment Progress", "progress": 3 },
        { "name": "Change vision/case for change", "progress": 24 }
      ],
      "versions": [
        {
          "date": "Today at 14:13 AM",
          "users": [{ "name": "Imran" }, { "name": "Sherrimac Gyver" }]
        }
      ],
      "images": [
        "https://picsum.photos/id/0/5000/3333",
        "https://picsum.photos/id/7/4728/3168"
      ],
      "documents": [
        {
          "name": "file_name_123",
          "date": "April 18, 2024, 6:17 PM",
          "size": "2,345 KB"
        }
      ],
      "links": [
        {
          "name": "www.figma.com",
          "url": "https://www.figma.com/design/NFE9opL7eqFHBJ..."
        }
      ],     
    },
    {
      "chatId": "chatId2",
      "version": 1,
      "chatTitle" : "Change Management understanding",
      "generalMessages": [
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        },
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        },
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        },
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        },
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        },
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        },
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        },
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        },
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        },
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        },
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        },
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        },
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        },
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        },
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        },
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        },
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        },
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        },
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        },
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        },
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        },
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        },
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        },
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        }

      ],
      "sharedUsers": [
        {
          "userId": "userId3",
          "role": "canView"
        },
        {
          "userId": "userId4",
          "role": "canEdit"
        }
      ],
      "comments": [
        {
          "commentId": "commentId1",
          "userId": "userId2",
          "userName": "jerard",
          "text": "Nice message!",
          "timestamp": "2024-07-12T12:37:00Z",
          "status": 'It’s Completed.',
          "replies": [
            {
              "replyId": "replyId1",
              "userId": "userId3",
              "userName": "Raphale",
              "text": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            },
            {
              "replyId": "replyId2",
              "userId": "userId3",
              "userName": "Raphale",
              "text": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            },
            {
              "replyId": "replyId3",
              "userId": "userId3",
              "userName": "Raphale",
              "text": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            }
          ]
        },
        {
          "commentId": "commentId2",
          "userId": "userId3",
          "userName": "herard",
          "text": "This is that thing!",
          "timestamp": "2024-07-12T12:37:00Z",
          "status": 'It’s Completed.',
          "replies": [
            {
              "replyId": "replyId1",
              "userId": "userId3",
              "userName": "Raphale",
              "text": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            }
          ]
        },
      ],
      "bookmarks": [
        {
          "bookmarkId": "bookmarkId1",
          "userId": "userId4",
          "timestamp": "2024-07-12T12:40:00Z",
          "date": "2024-07-12",
          "messages": [
            {
              "sender": 'ChangeAI',
              "text": 'The ADKAR model is a framework designed to guide individuals and organizations through change. Developed by Jeff Hiatt, it provides a structured approach to understanding and managing change at both personal and organizational levels.',
              "savedBy": 'You',
            },
          ],
        }
      ],
      "media": [
        {
          "mediaId": "mediaId1",
          "url": "http://example.com/media.jpg",
          "timestamp": "2024-07-12T12:41:00Z"
        }
      ],
      "tasks": [
        { "name": "Assessment Progress", "progress": 3 },
        { "name": "Change vision/case for change", "progress": 24 }
      ],
      "versions": [
        {
          "date": "Today at 14:13 AM",
          "users": [{ "name": "Imran" }, { "name": "Sherrimac Gyver" }],
        },
        {
          "date": "Today at 14:13 AM",
          "users": [{ "name": "Ali" }, { "name": "Sherrimac Gyver" }],
        }
      ],
      "images": [
        "https://picsum.photos/id/0/5000/3333",
        "https://picsum.photos/id/7/4728/3168"
      ],
      "documents": [
        {
          "name": "file_name_123",
          "date": "April 18, 2024, 6:17 PM",
          "size": "2,345 KB"
        }
      ],
      "links": [
        {
          "name": "www.figma.com",
          "url": "https://www.figma.com/design/NFE9opL7eqFHBJ..."
        }
      ],
      "bookmarkData": [
        {
          "date": "Today",
          "messages": [
            {
              "avatar": "<RxAvatar />",
              "sender": "ChangeAI",
              "text": "The ADKAR model is a framework designed to guide individuals and organizations through change. Developed by Jeff Hiatt, it provides a structured approach to understanding and managing change at both personal and organizational levels.",
              "savedBy": "You"
            }
          ]
        }
      ],
      "commentingUsers": [
        {
          "userId": "userId2",
          "userName": "User1"
        },
        {
          "userId": "userId3",
          "userName": "User2"
        }
      ],
      "commentReplies": [
        {
          "commentId": "commentId1",
          "replies": [
            {
              "replyId": "replyId1",
              "userId": "userId3",
              "content": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            }
          ]
        }
      ]
    },
    {
      "chatId": "chatId3",
      "version": 1,
      "chatTitle" : "Change Managem",
      "generalMessages": [
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        }
      ],
      "sharedUsers": [
        {
          "userId": "userId3",
          "role": "canView"
        },
        {
          "userId": "userId4",
          "role": "canEdit"
        }
      ],
      "comments": [
        {
          "commentId": "commentId1",
          "userId": "userId2",
          "userName": "jerard",
          "text": "Nice message!",
          "timestamp": "2024-07-12T12:37:00Z",
          "status": 'It’s Completed.',
          "replies": [
            {
              "replyId": "replyId1",
              "userId": "userId3",
              "userName": "Raphale",
              "text": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            },
            {
              "replyId": "replyId2",
              "userId": "userId3",
              "userName": "Raphale",
              "text": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            },
            {
              "replyId": "replyId3",
              "userId": "userId3",
              "userName": "Raphale",
              "text": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            }
          ]
        },
        {
          "commentId": "commentId2",
          "userId": "userId3",
          "userName": "herard",
          "text": "This is that thing!",
          "timestamp": "2024-07-12T12:37:00Z",
          "status": 'It’s Completed.',
          "replies": [
            {
              "replyId": "replyId1",
              "userId": "userId3",
              "userName": "Raphale",
              "text": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            }
          ]
        },
      ],
      "bookmarks": [
        {
          "bookmarkId": "bookmarkId1",
          "userId": "userId4",
          "timestamp": "2024-07-12T12:40:00Z",
          "date": "2024-07-12",
          "messages": [
            {
              "sender": 'ChangeAI',
              "text": 'The ADKAR model is a framework designed to guide individuals and organizations through change. Developed by Jeff Hiatt, it provides a structured approach to understanding and managing change at both personal and organizational levels.',
              "savedBy": 'You',
            },
          ],
        }
      ],
      "media": [
        {
          "mediaId": "mediaId1",
          "url": "http://example.com/media.jpg",
          "timestamp": "2024-07-12T12:41:00Z"
        }
      ],
      "tasks": [
        { "name": "Assessment Progress", "progress": 3 },
        { "name": "Change vision/case for change", "progress": 24 }
      ],
      "versions": [
        {
          "date": "Today at 14:13 AM",
          "users": [{ "name": "Imran" }, { "name": "Sherrimac Gyver" }]
        }
      ],
      "images": [
        "https://picsum.photos/id/0/5000/3333",
        "https://picsum.photos/id/7/4728/3168"
      ],
      "documents": [
        {
          "name": "file_name_123",
          "date": "April 18, 2024, 6:17 PM",
          "size": "2,345 KB"
        }
      ],
      "links": [
        {
          "name": "www.figma.com",
          "url": "https://www.figma.com/design/NFE9opL7eqFHBJ..."
        }
      ],
      "bookmarkData": [
        {
          "date": "Today",
          "messages": [
            {
              "avatar": "<RxAvatar />",
              "sender": "ChangeAI",
              "text": "The ADKAR model is a framework designed to guide individuals and organizations through change. Developed by Jeff Hiatt, it provides a structured approach to understanding and managing change at both personal and organizational levels.",
              "savedBy": "You"
            }
          ]
        }
      ],
      "commentingUsers": [
        {
          "userId": "userId2",
          "userName": "User1"
        },
        {
          "userId": "userId3",
          "userName": "User2"
        }
      ],
      "commentReplies": [
        {
          "commentId": "commentId1",
          "replies": [
            {
              "replyId": "replyId1",
              "userId": "userId3",
              "content": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            }
          ]
        }
      ]
    },
    {
      "chatId": "chatId4",
      "version": 1,
      "chatTitle" : "Change Managem",
      "generalMessages": [
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        }
      ],
      "sharedUsers": [
        {
          "userId": "userId3",
          "role": "canView"
        },
        {
          "userId": "userId4",
          "role": "canEdit"
        }
      ],
      "comments": [
        {
          "commentId": "commentId1",
          "userId": "userId2",
          "userName": "jerard",
          "text": "Nice message!",
          "timestamp": "2024-07-12T12:37:00Z",
          "status": 'It’s Completed.',
          "replies": [
            {
              "replyId": "replyId1",
              "userId": "userId3",
              "userName": "Raphale",
              "text": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            },
            {
              "replyId": "replyId2",
              "userId": "userId3",
              "userName": "Raphale",
              "text": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            },
            {
              "replyId": "replyId3",
              "userId": "userId3",
              "userName": "Raphale",
              "text": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            }
          ]
        },
        {
          "commentId": "commentId2",
          "userId": "userId3",
          "userName": "herard",
          "text": "This is that thing!",
          "timestamp": "2024-07-12T12:37:00Z",
          "status": 'It’s Completed.',
          "replies": [
            {
              "replyId": "replyId1",
              "userId": "userId3",
              "userName": "Raphale",
              "text": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            }
          ]
        },
      ],
      "bookmarks": [
        {
          "bookmarkId": "bookmarkId1",
          "userId": "userId4",
          "timestamp": "2024-07-12T12:40:00Z",
          "date": "2024-07-12",
          "messages": [
            {
              "sender": 'ChangeAI',
              "text": 'The ADKAR model is a framework designed to guide individuals and organizations through change. Developed by Jeff Hiatt, it provides a structured approach to understanding and managing change at both personal and organizational levels.',
              "savedBy": 'You',
            },
          ],
        }
      ],
      "media": [
        {
          "mediaId": "mediaId1",
          "url": "http://example.com/media.jpg",
          "timestamp": "2024-07-12T12:41:00Z"
        }
      ],
      "tasks": [
        { "name": "Assessment Progress", "progress": 3 },
        { "name": "Change vision/case for change", "progress": 24 }
      ],
      "versions": [
        {
          "date": "Today at 14:13 AM",
          "users": [{ "name": "Imran" }, { "name": "Sherrimac Gyver" }]
        }
      ],
      "images": [
        "https://picsum.photos/id/0/5000/3333",
        "https://picsum.photos/id/7/4728/3168"
      ],
      "documents": [
        {
          "name": "file_name_123",
          "date": "April 18, 2024, 6:17 PM",
          "size": "2,345 KB"
        }
      ],
      "links": [
        {
          "name": "www.figma.com",
          "url": "https://www.figma.com/design/NFE9opL7eqFHBJ..."
        }
      ],
      "bookmarkData": [
        {
          "date": "Today",
          "messages": [
            {
              "avatar": "<RxAvatar />",
              "sender": "ChangeAI",
              "text": "The ADKAR model is a framework designed to guide individuals and organizations through change. Developed by Jeff Hiatt, it provides a structured approach to understanding and managing change at both personal and organizational levels.",
              "savedBy": "You"
            }
          ]
        }
      ],
      "commentingUsers": [
        {
          "userId": "userId2",
          "userName": "User1"
        },
        {
          "userId": "userId3",
          "userName": "User2"
        }
      ],
      "commentReplies": [
        {
          "commentId": "commentId1",
          "replies": [
            {
              "replyId": "replyId1",
              "userId": "userId3",
              "content": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            }
          ]
        }
      ]
    },
    {
      "chatId": "chatId5",
      "version": 1,
      "chatTitle" : "Change Managem",
      "generalMessages": [
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        }
      ],
      "sharedUsers": [
        {
          "userId": "userId3",
          "role": "canView"
        },
        {
          "userId": "userId4",
          "role": "canEdit"
        }
      ],
      "comments": [
        {
          "commentId": "commentId1",
          "userId": "userId2",
          "userName": "jerard",
          "text": "Nice message!",
          "timestamp": "2024-07-12T12:37:00Z",
          "status": 'It’s Completed.',
          "replies": [
            {
              "replyId": "replyId1",
              "userId": "userId3",
              "userName": "Raphale",
              "text": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            },
            {
              "replyId": "replyId2",
              "userId": "userId3",
              "userName": "Raphale",
              "text": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            },
            {
              "replyId": "replyId3",
              "userId": "userId3",
              "userName": "Raphale",
              "text": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            }
          ]
        },
        {
          "commentId": "commentId2",
          "userId": "userId3",
          "userName": "herard",
          "text": "This is that thing!",
          "timestamp": "2024-07-12T12:37:00Z",
          "status": 'It’s Completed.',
          "replies": [
            {
              "replyId": "replyId1",
              "userId": "userId3",
              "userName": "Raphale",
              "text": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            }
          ]
        },
      ],
      "bookmarks": [
        {
          "bookmarkId": "bookmarkId1",
          "userId": "userId4",
          "timestamp": "2024-07-12T12:40:00Z",
          "date": "2024-07-12",
          "messages": [
            {
              "sender": 'ChangeAI',
              "text": 'The ADKAR model is a framework designed to guide individuals and organizations through change. Developed by Jeff Hiatt, it provides a structured approach to understanding and managing change at both personal and organizational levels.',
              "savedBy": 'You',
            },
          ],
        }
      ],
      "media": [
        {
          "mediaId": "mediaId1",
          "url": "http://example.com/media.jpg",
          "timestamp": "2024-07-12T12:41:00Z"
        }
      ],
      "tasks": [
        { "name": "Assessment Progress", "progress": 3 },
        { "name": "Change vision/case for change", "progress": 24 }
      ],
      "versions": [
        {
          "date": "Today at 14:13 AM",
          "users": [{ "name": "Imran" }, { "name": "Sherrimac Gyver" }]
        }
      ],
      "images": [
        "https://picsum.photos/id/0/5000/3333",
        "https://picsum.photos/id/7/4728/3168"
      ],
      "documents": [
        {
          "name": "file_name_123",
          "date": "April 18, 2024, 6:17 PM",
          "size": "2,345 KB"
        }
      ],
      "links": [
        {
          "name": "www.figma.com",
          "url": "https://www.figma.com/design/NFE9opL7eqFHBJ..."
        }
      ],
      "bookmarkData": [
        {
          "date": "Today",
          "messages": [
            {
              "avatar": "<RxAvatar />",
              "sender": "ChangeAI",
              "text": "The ADKAR model is a framework designed to guide individuals and organizations through change. Developed by Jeff Hiatt, it provides a structured approach to understanding and managing change at both personal and organizational levels.",
              "savedBy": "You"
            }
          ]
        }
      ],
      "commentingUsers": [
        {
          "userId": "userId2",
          "userName": "User1"
        },
        {
          "userId": "userId3",
          "userName": "User2"
        }
      ],
      "commentReplies": [
        {
          "commentId": "commentId1",
          "replies": [
            {
              "replyId": "replyId1",
              "userId": "userId3",
              "content": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            }
          ]
        }
      ]
    },
    {
      "chatId": "chatId6",
      "version": 1,
      "chatTitle" : "Change Managem",
      "generalMessages": [
        {
          "messageId": "msgId1",
          "role": "user",
          "file": "",
          "userId": "userId1",
          "content": "Hello everyone!",
          "timestamp": "2024-07-12T12:00:00Z"
        },
        {
          "messageId": "msgId2",
          "userId": "userId2",
          "content": "Hi there!",
          "timestamp": "2024-07-12T12:01:00Z"
        }
      ],
      "sharedUsers": [
        {
          "userId": "userId3",
          "role": "canView"
        },
        {
          "userId": "userId4",
          "role": "canEdit"
        }
      ],
      "comments": [
        {
          "commentId": "commentId1",
          "userId": "userId2",
          "userName": "jerard",
          "text": "Nice message!",
          "timestamp": "2024-07-12T12:37:00Z",
          "status": 'It’s Completed.',
          "replies": [
            {
              "replyId": "replyId1",
              "userId": "userId3",
              "userName": "Raphale",
              "text": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            },
            {
              "replyId": "replyId2",
              "userId": "userId3",
              "userName": "Raphale",
              "text": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            },
            {
              "replyId": "replyId3",
              "userId": "userId3",
              "userName": "Raphale",
              "text": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            }
          ]
        },
        {
          "commentId": "commentId2",
          "userId": "userId3",
          "userName": "herard",
          "text": "This is that thing!",
          "timestamp": "2024-07-12T12:37:00Z",
          "status": 'It’s Completed.',
          "replies": [
            {
              "replyId": "replyId1",
              "userId": "userId3",
              "userName": "Raphale",
              "text": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            }
          ]
        },
      ],
      "bookmarks": [
        {
          "bookmarkId": "bookmarkId1",
          "userId": "userId4",
          "timestamp": "2024-07-12T12:40:00Z",
          "date": "2024-07-12",
          "messages": [
            {
              "sender": 'ChangeAI',
              "text": 'The ADKAR model is a framework designed to guide individuals and organizations through change. Developed by Jeff Hiatt, it provides a structured approach to understanding and managing change at both personal and organizational levels.',
              "savedBy": 'You',
            },
          ],
        }
      ],
      "media": [
        {
          "mediaId": "mediaId1",
          "url": "http://example.com/media.jpg",
          "timestamp": "2024-07-12T12:41:00Z"
        }
      ],
      "tasks": [
        { "name": "Assessment Progress", "progress": 3 },
        { "name": "Change vision/case for change", "progress": 24 }
      ],
      "versions": [
        {
          "date": "Today at 14:13 AM",
          "users": [{ "name": "Imran" }, { "name": "Sherrimac Gyver" }]
        }
      ],
      "images": [
        "https://picsum.photos/id/0/5000/3333",
        "https://picsum.photos/id/7/4728/3168"
      ],
      "documents": [
        {
          "name": "file_name_123",
          "date": "April 18, 2024, 6:17 PM",
          "size": "2,345 KB"
        }
      ],
      "links": [
        {
          "name": "www.figma.com",
          "url": "https://www.figma.com/design/NFE9opL7eqFHBJ..."
        }
      ],
      "bookmarkData": [
        {
          "date": "Today",
          "messages": [
            {
              "avatar": "<RxAvatar />",
              "sender": "ChangeAI",
              "text": "The ADKAR model is a framework designed to guide individuals and organizations through change. Developed by Jeff Hiatt, it provides a structured approach to understanding and managing change at both personal and organizational levels.",
              "savedBy": "You"
            }
          ]
        }
      ],
      "commentingUsers": [
        {
          "userId": "userId2",
          "userName": "User1"
        },
        {
          "userId": "userId3",
          "userName": "User2"
        }
      ],
      "commentReplies": [
        {
          "commentId": "commentId1",
          "replies": [
            {
              "replyId": "replyId1",
              "userId": "userId3",
              "content": "I agree!",
              "timestamp": "2024-07-12T12:38:00Z"
            }
          ]
        }
      ]
    },
  ]

  export default mockChat;
  