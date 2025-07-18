import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,            // no numeric separator
  withCredentials: false,
});

// …interceptors unchanged…

export default axiosInstance;
