import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5005/api', // ✅ adjust if needed
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // set true if using cookies
});

export default axiosInstance;
