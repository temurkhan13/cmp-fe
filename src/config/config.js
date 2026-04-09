const baseURL = import.meta.env.VITE_API_URL || 'https://cmp-backend-v2.onrender.com';

const config = {
  baseURL,
  apiURL: `${baseURL}/api`,
};

export default config;
