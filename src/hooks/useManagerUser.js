import { useState, useEffect } from 'react';
import apiClient from '@api/axios';

// Mock adapter removed — was intercepting all production API calls

export const fetchUserShareData = async (id) => {
  try {
    const response = await apiClient.get(`/fetchUserShareData/${id}`); // Adjust endpoint as per your API
    //  setUserData(response.data);
    //  setError(null);
    return response; //for redux
  } catch (error) {
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
      setUserData(response.data);
      setError(null);
      return response; //for redux
    } catch (error) {
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
      const response = await apiClient.get('/fetchSharedUsers'); // Adjust endpoint as per your API
      setSharedUsers(response.data); // Update state with server data
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  // Invite user by username or email
  const inviteUser = async (identifier) => {
    try {
      await apiClient.post('/inviteUser', { identifier }); // Adjust endpoint as per your API
      fetchSharedUsers(); // Refresh shared users list
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  // Remove shared user
  const removeSharedUser = async (userId) => {
    try {
      await apiClient.post('/removeSharedUser', { userId }); // Adjust endpoint as per your API
      fetchSharedUsers(); // Refresh shared users list
      setError(null);
    } catch (error) {
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
      setError(error.message);
    }
  };

  // Add a comment to a specific block of chat
  const addComment = async (blockId, comment) => {
    try {
      await apiClient.post('/addComment', { blockId, comment }); // Adjust endpoint as per your API
      fetchComments(blockId); // Refresh comments list
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  // Reply to a comment
  const replyToComment = async (commentId, reply) => {
    try {
      await apiClient.post('/replyToComment', { commentId, reply }); // Adjust endpoint as per your API
      fetchComments(); // Refresh comments list
      setError(null);
    } catch (error) {
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
