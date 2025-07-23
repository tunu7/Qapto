import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5007/api',
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false,
});

export default axiosInstance;


