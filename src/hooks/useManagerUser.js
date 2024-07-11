import { useState, useEffect } from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import apiClient from "@api/axios";


// Mock API setup
const mock = new MockAdapter(apiClient, { delayResponse: 500 });

// Mock response data
const initialData = [
  { id: 1, name: 'User A', role: 'owner' },
  { id: 2, name: 'User B', role: 'edit' },
  { id: 3, name: 'User C', role: 'view' },
];


const initialSharedUsers = [
  { id: 1, username: "user1@example.com" },
  { id: 2, username: "user2@example.com" },
];

const initialComments = [
  { id: 1, text: "This is a comment", blockId: 1 },
  { id: 2, text: "This is another comment", blockId: 1 },
];

const mockData = [
  {
    id: 1,
    members: [
      { id: 1, name: 'Imran', role: 'owner' },
      { id: 2, name: 'Jerald Huels', role: 'edit' },
      { id: 3, name: 'Sherrimac Gyver', role: 'view' },
      { id: 4, name: 'New Member', role: 'remove' },
    ],
  },
  {
    id: 2,
    members: [
      { id: 5, name: 'Imran2', role: 'owner' },
      { id: 6, name: 'Jerald Huels1', role: 'edit' },
      { id: 7, name: 'Sherrimac Gyver3', role: 'view' },
      { id: 8, name: 'New Member2', role: 'remove' },
    ],
  },
  // Add more mock data if necessary
];



// Mock GET request to fetch user share data
mock.onGet(/\/fetchUserShareData\/\d+/).reply((config) => {
  const chatId = parseInt(config.url.split('/').pop());
  const chatData = mockData.find((chat) => chat.id === chatId);
  return [200, chatData ? chatData.members : []];
});
mock.onGet("/fetchSharedUsers").reply(200, initialSharedUsers);
mock.onGet('/fetchUserShareData/1').reply(200, initialData);
mock.onGet('/fetchUserShareData/2').reply(200, initialData);
mock.onGet('/fetchUserShareData/3').reply(200, initialData);
mock.onGet('/fetchUserShareData/4').reply(200, initialData);
mock.onPost("/inviteUser").reply(200, {});
mock.onPost("/removeSharedUser").reply(200, {});
mock.onGet(/\/fetchComments\?blockId=\d+/).reply(config => {
  const blockId = parseInt(new URLSearchParams(config.url.split('?')[1]).get('blockId'));
  const filteredComments = initialComments.filter(comment => comment.blockId === blockId);
  return [200, filteredComments];
});
mock.onPost("/addComment").reply(config => {
  const { blockId, comment } = JSON.parse(config.data);
  initialComments.push({ id: initialComments.length + 1, text: comment, blockId });
  return [200, {}];
});
mock.onPost("/replyToComment").reply(200, {});

 // Fetch initial data from the server
 export const fetchUserShareData = async (id) => {
    try {
      const response = await apiClient.get(`/fetchUserShareData/${id}`); // Adjust endpoint as per your API
      console.log(response);
    //  setUserData(response.data);
    //  setError(null);
      return response; //for redux
      
    } catch (error) {
      console.error('Error fetching initial data:', error);
    //  setError(error.message);
      throw error;
    }
  };

const useManagerUser = (chatId) => {
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null); // State to hold folders and chats
  const [sharedUsers, setSharedUsers] = useState([]); // State to hold shared users
  const [comments, setComments] = useState([]); // State to hold comments

  

  // Fetch initial data from the server
 const fetchUserShareData = async (id) => {
    try {
      const response = await apiClient.get(`/fetchUserShareData/${id}`); // Adjust endpoint as per your API
      console.log(response);
      setUserData(response.data);
      setError(null);
      return response; //for redux
      
    } catch (error) {
      console.error('Error fetching initial data:', error);
      setError(error.message);
      throw error;
    }
  };

  useEffect(() => {
    if (chatId) {
      fetchUserShareData(chatId);
    }
  }, [chatId]);

  // Fetch shared users
  const fetchSharedUsers = async () => {
    try {
      const response = await apiClient.get("/fetchSharedUsers"); // Adjust endpoint as per your API
      setSharedUsers(response.data); // Update state with server data
      setError(null);
    } catch (error) {
      console.error('Error fetching shared users:', error);
      setError(error.message);
    }
  };

  // Invite user by username or email
  const inviteUser = async (identifier) => {
    try {
      await apiClient.post("/inviteUser", { identifier }); // Adjust endpoint as per your API
      fetchSharedUsers(); // Refresh shared users list
      setError(null);
    } catch (error) {
      console.error('Error inviting user:', error);
      setError(error.message);
    }
  };

  // Remove shared user
  const removeSharedUser = async (userId) => {
    try {
      await apiClient.post("/removeSharedUser", { userId }); // Adjust endpoint as per your API
      fetchSharedUsers(); // Refresh shared users list
      setError(null);
    } catch (error) {
      console.error('Error removing shared user:', error);
      setError(error.message);
    }
  };

  // Fetch comments for a specific block of chat
  const fetchComments = async (blockId) => {
    try {
      const response = await apiClient.get(`/fetchComments?blockId=${blockId}`); // Adjust endpoint as per your API
      setComments(response.data); // Update state with server data
      setError(null);
    } catch (error) {
      console.error('Error fetching comments:', error);
      setError(error.message);
    }
  };

  // Add a comment to a specific block of chat
  const addComment = async (blockId, comment) => {
    try {
      await apiClient.post("/addComment", { blockId, comment }); // Adjust endpoint as per your API
      fetchComments(blockId); // Refresh comments list
      setError(null);
    } catch (error) {
      console.error('Error adding comment:', error);
      setError(error.message);
    }
  };

  // Reply to a comment
  const replyToComment = async (commentId, reply) => {
    try {
      await apiClient.post("/replyToComment", { commentId, reply }); // Adjust endpoint as per your API
      fetchComments(); // Refresh comments list
      setError(null);
    } catch (error) {
      console.error('Error replying to comment:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchUserShareData();
    fetchSharedUsers();
  }, []);

  return {
    userData,
    fetchUserShareData,
    error,
    sharedUsers,
    inviteUser,
    removeSharedUser,
    comments,
    fetchComments,
    addComment,
    replyToComment,
  };
};


//export userdata for test


export default useManagerUser;
