// src/features/auth/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshToken,
} from './authThunks';

// Helpers to safely access localStorage (handles non-browser environments)
const safeGetItem = (key) => {
  try {
    if (typeof window === 'undefined') return null;
    const v = localStorage.getItem(key);
    if (v && v !== 'undefined') return JSON.parse(v);
  } catch  {
    // silently ignore storage errors (e.g., quota, SSR, disabled)
    // console.warn('safeGetItem error:', err);
  }
  return null;
};
const safeSetItem = (key, value) => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, JSON.stringify(value));
  } catch  {
    // ignore failures to write (e.g., storage full or blocked)
    // console.warn('safeSetItem error:', err);
  }
};
const safeRemoveItem = (key) => {
  try {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  } catch {
    // ignore remove errors
    // console.warn('safeRemoveItem error:', err);
  }
};

const persisted = safeGetItem('auth');

const initialState = {
  user: persisted?.user || null,
  accessToken: persisted?.accessToken || null,
  isLoading: false,
  isError: false,
  message: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError(state) {
      state.isError = false;
      state.message = '';
    },
    setCredentials(state, action) {
      const { accessToken, user } = action.payload || {};
      state.accessToken = accessToken || state.accessToken;
      state.user = user || state.user;
      state.isError = false;
      state.message = '';
      safeSetItem('auth', { accessToken: state.accessToken, user: state.user });
    },
    clearState(state) {
      state.user = null;
      state.accessToken = null;
      state.isLoading = false;
      state.isError = false;
      state.message = '';
      safeRemoveItem('auth');
    },
  },
  extraReducers: (builder) => {
    builder
      // register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        // no auto-login assumed
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || 'Registration failed';
      })

      // login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.message = '';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const { accessToken, user } = action.payload || {};
        state.accessToken = accessToken || null;
        state.user = user || null;
        state.isError = false;
        state.message = '';
        safeSetItem('auth', { accessToken: state.accessToken, user: state.user });
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || 'Login failed';
      })

      // logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.accessToken = null;
        state.isLoading = false;
        state.isError = false;
        state.message = '';
        safeRemoveItem('auth');
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.user = null;
        state.accessToken = null;
        state.isError = true;
        state.message = action.payload || 'Logout issue';
        safeRemoveItem('auth');
      })

      // refresh
      .addCase(refreshToken.fulfilled, (state, action) => {
        if (state.user) {
          const { accessToken } = action.payload || {};
          state.accessToken = accessToken || state.accessToken;
          state.isError = false;
          state.message = '';
          safeSetItem('auth', { accessToken: state.accessToken, user: state.user });
        }
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.user = null;
        state.accessToken = null;
        state.isError = true;
        state.message = action.payload || 'Session expired';
        safeRemoveItem('auth');
      });
  },
});

export const { resetError, setCredentials, clearState } = authSlice.actions;
export default authSlice.reducer;
