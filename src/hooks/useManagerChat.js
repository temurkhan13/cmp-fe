// import { useState } from "react";
// import apiClient from "@api/axios";

// const useManagerChat = () => {
//   const [error, setError] = useState(null);
//   const [data, setData] = useState({ folders: [] });

//   const managerChat = async () => {
//     const useMockData = true; // Set this to true to use mock data

//     if (useMockData) {
//       const mockData = {
//         folders: [
//           {
//             id: 1,
//             name: "Project Discussions",
//             chats: [
//               {
//                 id: 1,
//                 title: "Chat with Alice",
//                 content: "Hi Alice, how are you doing today? I wanted to discuss our project..."
//               },
//               {
//                 id: 2,
//                 title: "Meeting Notes",
//                 content: "Today's meeting covered the upcoming release schedule, new feature implementations..."
//               }
//             ]
//           },
//           {
//             id: 2,
//             name: "Support Tickets",
//             chats: [
//               {
//                 id: 3,
//                 title: "Support Ticket #12345",
//                 content: "The user reported an issue with the login functionality. Steps to reproduce..."
//               }
//             ]
//           }
//         ]
//       };
//       setData(mockData);
//       return mockData;
//     }

//     try {
//       const response = await apiClient.post("/getRecentChat");
//       console.log("Response data: ", response.data);
//       setError(null);
//       setData(response.data);
//       return response.data;
//     } catch (error) {
//       console.log(error.message);
//       setError(error.message);
//     }
//   };

//   const moveChatToFolder = (chatId, targetFolderId) => {
//     // Implementation of moving a chat to a different folder
//   };

//   const duplicateChat = (chatId) => {
//     // Implementation of duplicating a chat
//   };

//   const renameChat = (chatId, newTitle) => {
//     // Implementation of renaming a chat
//   };

//   const deleteChat = (chatId) => {
//     // Implementation of deleting a chat
//   };

//   const moveFolder = (folderId, targetParentId) => {
//     // Implementation of moving a folder to a different parent
//   };

//   const duplicateFolder = (folderId) => {
//     // Implementation of duplicating a folder
//   };

//   const renameFolder = (folderId, newName) => {
//     // Implementation of renaming a folder
//   };

//   const deleteFolder = (folderId) => {
//     // Implementation of deleting a folder
//   };

//   return {
//     error,
//     data,
//     managerChat,
//     moveChatToFolder,
//     duplicateChat,
//     renameChat,
//     deleteChat,
//     moveFolder,
//     duplicateFolder,
//     renameFolder,
//     deleteFolder,
//   };
// };

// export default useManagerChat;

import { useState,useEffect } from "react";
import apiClient from "@api/axios";

const useManagerChat = () => {
  const [error, setError] = useState(null);
  const [managerData, setData] = useState(null); // State to hold folders and chats
  const [useMockData, setUseMockData] = useState(true); // Manage mock data toggle
  const [useMockData2, setUseMockData2] = useState(false); // Manage mock data toggle

  // Fetch initial data from the server
  const fetchInitialData = async () => {
    try {
      const response = await apiClient.get("/initialData"); // Adjust endpoint as per your API
      setData(response.data); // Update state with server data
      setError(null);
    } catch (error) {
      console.error('Error fetching initial data:', error);
      setError(error.message);
    }
  };

  // Function to move a chat to a different folder
  const moveChatToFolder = async (chatId, targetFolderId) => {
    try {
      const response = await apiClient.post("/moveChatToFolder", { chatId, targetFolderId });
      setData(response.data); // Update state with updated server data
      setError(null);
    } catch (error) {
      console.error('Error moving chat to folder:', error);
      setError(error.message);
    }
  };

  // Function to rename a folder
  const renameFolder = async (folderId, newName) => {
    try {
      const response = await apiClient.put(`/folders/${folderId}`, { name: newName });
      setData(response.data); // Update state with updated server data
      setError(null);
    } catch (error) {
      console.error('Error renaming folder:', error);
      setError(error.message);
    }
  };

  // Function to delete a folder
  const deleteFolder = async (folderId) => {
    try {
      await apiClient.delete(`/folders/${folderId}`);
      setData(prevData => ({
        folders: prevData.folders.filter(folder => folder.id !== folderId)
      }));
      setError(null);
    } catch (error) {
      console.error('Error deleting folder:', error);
      setError(error.message);
    }
  };

  // Function to download a folder as a ZIP file
  const downloadFolderAsZip = async (folderId) => {
    try {
      const response = await apiClient.get(`/folders/${folderId}/downloadZip`, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/zip' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `folder-${folderId}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading folder as ZIP:', error);
    }
  };

  // Function to download a chat as a PDF (example)
  const downloadChatAsPdf = async (chatId) => {
    try {
      const response = await apiClient.get(`/chats/${chatId}/downloadPdf`, { responseType: 'blob' });
      const blob = new Blob([response.data], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chat-${chatId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading chat as PDF:', error);
    }
  };

  
  useEffect(() => {
    if (useMockData2) {
      //fetchInitialData(); //Real Api Data Call
      toggleMockData();
    }
    else {
      // Set mock data synchronously
      const mockData = {
        folders: [
          {
            id: 1,
            name: "Project Discussions",
            chats: [
              {
                id: 1,
                title: "Chat with Alice",
                content: "Hi Alice, how are you doing today? I wanted to discuss our project..."
              },
              {
                id: 2,
                title: "Meeting Notes",
                content: "Today's meeting covered the upcoming release schedule, new feature implementations..."
              }
            ]
          },
          {
            id: 2,
            name: "Support Tickets",
            chats: [
              {
                id: 3,
                title: "Support Ticket #12345",
                content: "The user reported an issue with the login functionality. Steps to reproduce..."
              }
            ]
          }
        ]
      };
      setData(mockData);
    }
  }, [useMockData]); // Ensure useEffect runs when useMockData changes

  // Function to toggle mock data for testing purposes
  // Function to toggle between mock data and live data
  // const toggleMockData = () => {
  //   setUseMockData(prev => !prev); // Toggle between true and false
  //   if (!useMockData) {
  //     fetchInitialData(); // Fetch fresh data when switching to live data
  //   }
  // };


  const toggleMockData = () => {
    // Toggle useMockData state
   // setUseMockData(prev => !prev);
   setUseMockData2(prev => !prev);
  
    // Update managerData state based on useMockData
    if (useMockData2) {
      // Set mock data synchronously
      const mockData = {
        folders: [
          {
            id: 1,
            name: "Project 2 Discussions",
            chats: [
              {
                id: 1,
                title: "Chat 2 with Alice",
                content: "Hi Alice, how are you doing today? I wanted to discuss our project..."
              },
              {
                id: 2,
                title: "Meeting Notes",
                content: "Today's meeting covered the upcoming release schedule, new feature implementations..."
              }
            ]
          },
          {
            id: 2,
            name: "Support Tickets",
            chats: [
              {
                id: 3,
                title: "Support Ticket #12345",
                content: "The user reported an issue with the login functionality. Steps to reproduce..."
              }
            ]
          }
        ]
      };
      setData(mockData); // Update managerData immediately with mock data
    }
  };
  

  // Return state and functions for use in components
  return { managerData, error, toggleMockData, moveChatToFolder, renameFolder, deleteFolder, downloadFolderAsZip, downloadChatAsPdf };
};

export default useManagerChat;

