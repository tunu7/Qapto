import axios from '../../api/axiosInstance';

const API_URL = '/auth/';

// Optional: store manually if you’re not letting Redux handle persistence
const persistAuth = ({ user, accessToken }) => {
  localStorage.setItem('auth', JSON.stringify({ user, accessToken }));
};

const register = async (userData) => {
  const res = await axios.post(API_URL + 'register', userData, { withCredentials: true });
  const { user, accessToken } = res.data;
  persistAuth({ user, accessToken }); // ✅ store properly
  return res.data;
};

const login = async (credentials) => {
  const res = await axios.post(API_URL + 'login', credentials, { withCredentials: true });
  const { user, accessToken } = res.data;
  persistAuth({ user, accessToken }); // ✅ store properly
  return res.data;
};

const logout = async () => {
  await axios.post(API_URL + 'logout', null, { withCredentials: true });
  localStorage.removeItem('auth'); // ✅ match key used in slice
};

const refresh = async () => {
  const res = await axios.post(API_URL + 'refresh', null, { withCredentials: true });
  const stored = JSON.parse(localStorage.getItem('auth'));

  if (stored?.user) {
    const updated = {
      user: stored.user,
      accessToken: res.data.accessToken,
    };
    localStorage.setItem('auth', JSON.stringify(updated)); // ✅ match slice structure
  }

  return res.data;
};

const authService = { register, login, logout, refresh };
export default authService;
