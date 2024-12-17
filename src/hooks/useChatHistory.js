import { useState } from 'react';
import apiClient from '@api/axios';
import MockAdapter from 'axios-mock-adapter';
// Create a new instance of MockAdapter on the default axios instance
const mock = new MockAdapter(apiClient, { delayResponse: 500 });

// Sample data for mocking chat additional features comments, bookmark,
const chatMetadata = {
  _id: 'chatId1',
  version: 1,
  comments: [
    {
      commentId: 'commentId1',
      userId: 'userId2',
      content: 'Nice message!',
      timestamp: '2024-07-12T12:37:00Z',
      replies: [
        {
          replyId: 'replyId1',
          userId: 'userId3',
          content: 'I agree!',
          timestamp: '2024-07-12T12:38:00Z',
        },
      ],
    },
  ],
  bookmarks: [
    {
      bookmarkId: 'bookmarkId1',
      userId: 'userId4',
      timestamp: '2024-07-12T12:40:00Z',
    },
  ],
  media: [
    {
      mediaId: 'mediaId1',
      url: 'http://example.com/media.jpg',
      timestamp: '2024-07-12T12:41:00Z',
    },
  ],
};

// Mock PUT request for updating chat version
mock.onPut(/\/chat\/\w+\/version/).reply((config) => {
  const { version } = JSON.parse(config.data);
  chatMetadata.version = version;
  return [200, chatMetadata];
});

// Fetch initial data from the server
export const fetchChatMetadata = async (id) => {
  try {
    const response = await apiClient.get(`/fetchChatMetadata/chat/${id}`); // Adjust endpoint as per your API
    //  setUserData(response.data);
    //  setError(null);
    return response; //for redux
  } catch (error) {
    //  setError(error.message);
    throw error;
  }
};

const useChatHistory = () => {
  const [error, setError] = useState(null);

  const historyChat = async () => {
    const useMockData = true; // Set this to true to use mock data

    if (useMockData) {
      const mockData = [
        {
          chatId: 1,
          date: '2024-07-06',
          title: 'Change Managment',
          message: [{ text: 'This is a mock chat message 1.' }],
        },
        {
          chatId: 2,
          date: '2024-07-05',
          title: 'Change Managment',
          message: [{ text: 'Another mock chat message 2.' }],
        },
        {
          chatId: 3,
          date: '2024-07-05',
          title: 'Change Managment',
          message: [{ text: 'Another mock chat message 3.' }],
        },
        {
          chatId: 4,
          date: '2024-07-05',
          title: 'Change Managment',
          message: [{ text: 'Another mock chat message 4.' }],
        },
        {
          chatId: 5,
          date: '2024-07-05',
          title: 'Change Managment',
          message: [{ text: 'Another mock chat message 5.' }],
        },
      ];
      return mockData;
    }

    try {
      const response = await apiClient.post('/chat', {
        message:
          "Tell me, How to do you assess the business's change management?",
      });
      setError(null);
      return response.data.message;
    } catch (error) {
      setError(error.message);
    }
  };

  return { error, historyChat };
};

export default useChatHistory;
