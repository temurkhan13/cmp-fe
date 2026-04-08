import axios from './axios';

export const ingestDocument = async (data) => {
  const userId = JSON.parse(localStorage.getItem('user'))?.id || '';
  const response = await axios.post('/chat/ingest', { ...data, user_id: userId });
  return response.data;
};

export const searchDocuments = async (query, limit = 5) => {
  const userId = JSON.parse(localStorage.getItem('user'))?.id || '';
  const response = await axios.post('/chat/search', { user_id: userId, query, limit });
  return response.data;
};
