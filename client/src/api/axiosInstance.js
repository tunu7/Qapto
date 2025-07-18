import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // set true if using cookies
});

export default axiosInstance;

