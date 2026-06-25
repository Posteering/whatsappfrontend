import axios from 'axios';

// 1. ASK YOUR BACKEND ENGINEER FOR THE URL AND PASTE IT HERE
const BASE_URL = 'http://localhost:3000'; 

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Add a "Middleman" to attach the Token (Secret Key) once logged in
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;