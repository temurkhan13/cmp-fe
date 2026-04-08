const baseURL = import.meta.env.VITE_API_URL || 'https://cmp-backend-830s.onrender.com';

const config = {
  baseURL,
  apiURL: `${baseURL}/api`,
};

export default config;
