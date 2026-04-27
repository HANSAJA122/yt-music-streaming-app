import axios from 'axios';

// In `npm run dev`, use same-origin `/api` so Vite can proxy to the backend (see vite.config.js).
// Production / preview: set VITE_API_URL to your deployed API base URL.
export const API_BASE_URL = import.meta.env.DEV
  ? '/api'
  : import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({ baseURL: API_BASE_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
