// src/features/auth/authService.js
import axios from '../../api/axiosInstance';

const API_URL = '/auth/';

const register = async (userData) => {
  const res = await axios.post(API_URL + 'register', userData);
  // no tokens returned on register
  return res.data;
};

const login = async (credentials) => {
  const res = await axios.post(API_URL + 'login', credentials);
  // { accessToken }
  if (res.data.accessToken) {
    return res.data;
  }
};

const logout = async () => {
  await axios.post(API_URL + 'logout');
  localStorage.removeItem('user');
};

const refresh = async () => {
  const res = await axios.post(API_URL + 'refresh');
  // { accessToken }
  const user = JSON.parse(localStorage.getItem('user'));
  user.accessToken = res.data.accessToken;

  return res.data;
};

const authService = { register, login, logout, refresh };
export default authService;
