import { useState, useEffect } from 'react';
import apiClient from '@api/axios';

const useManagerChat = () => {
  const [error, setError] = useState(null);
  const [managerData, setData] = useState(null);
  const [useMockData] = useState(true);
  const [useMockData2, setUseMockData2] = useState(false);

  const moveChatToFolder = async (chatId, targetFolderId) => {
    try {
      const response = await apiClient.post('/moveChatToFolder', {
        chatId,
        targetFolderId,
      });
      setData(response.data);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const renameFolder = async (folderId, newName) => {
    try {
      const response = await apiClient.put(`/folders/${folderId}`, {
        name: newName,
      });
      setData(response.data);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const deleteFolder = async (folderId) => {
    try {
      await apiClient.delete(`/folders/${folderId}`);
      setData((prevData) => ({
        folders: prevData.folders.filter((folder) => folder.id !== folderId),
      }));
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const downloadFolderAsZip = async (folderId) => {
    try {
      const response = await apiClient.get(`/folders/${folderId}/downloadZip`, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/zip' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `folder-${folderId}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
  };

  const downloadChatAsPdf = async (chatId) => {
    try {
      const response = await apiClient.get(`/chats/${chatId}/downloadPdf`, {
        responseType: 'blob',
      });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chat-${chatId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (useMockData2) {
      toggleMockData();
    } else {
      const mockData = {
        folders: [
          {
            id: 1,
            name: 'Project Discussions',
            chats: [
              {
                id: 1,
                title: 'Chat with Alice',
                content:
                  'Hi Alice, how are you doing today? I wanted to discuss our project...',
              },
              {
                id: 2,
                title: 'Meeting Notes',
                content:
                  "Today's meeting covered the upcoming release schedule, new feature implementations...",
              },
            ],
          },
          {
            id: 2,
            name: 'Support Tickets',
            chats: [
              {
                id: 3,
                title: 'Support Ticket #12345',
                content:
                  'The user reported an issue with the login functionality. Steps to reproduce...',
              },
            ],
          },
        ],
      };
      setData(mockData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useMockData]);

  const toggleMockData = () => {
    setUseMockData2((prev) => !prev);

    if (useMockData2) {
      const mockData = {
        folders: [
          {
            id: 1,
            name: 'Project 2 Discussions',
            chats: [
              {
                id: 1,
                title: 'Chat 2 with Alice',
                content:
                  'Hi Alice, how are you doing today? I wanted to discuss our project...',
              },
              {
                id: 2,
                title: 'Meeting Notes',
                content:
                  "Today's meeting covered the upcoming release schedule, new feature implementations...",
              },
            ],
          },
          {
            id: 2,
            name: 'Support Tickets',
            chats: [
              {
                id: 3,
                title: 'Support Ticket #12345',
                content:
                  'The user reported an issue with the login functionality. Steps to reproduce...',
              },
            ],
          },
        ],
      };
      setData(mockData);
    }
  };

  return {
    managerData,
    error,
    toggleMockData,
    moveChatToFolder,
    renameFolder,
    deleteFolder,
    downloadFolderAsZip,
    downloadChatAsPdf,
  };
};

export default useManagerChat;
