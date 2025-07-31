// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from './authService';

// Safely parse `user` from localStorage, guarding against `"undefined"` or missing keys
const storedUser = localStorage.getItem('user');
const user = storedUser && storedUser !== 'undefined'
  ? JSON.parse(storedUser)
  : null;

const initialState = {
  user:      user,
  isLoading: false,
  isError:   false,
  message:   '',
};

// Thunks
export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      return await authService.register(userData);
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      return await authService.login(credentials);
    } catch (err) {
      const msg = err.response?.data?.message || err.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async () => {
    await authService.logout();
    // Optionally, clear stored user here:
    localStorage.removeItem('user');
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      return await authService.refresh();
    } catch {
      return thunkAPI.rejectWithValue('Could not refresh token');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetError(state) {
      state.isError = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Register
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError   = true;
        state.message   = action.payload;
      })

      // Login
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user      = action.payload;
        // persist to localStorage
        localStorage.setItem('user', JSON.stringify(action.payload));
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError   = true;
        state.message   = action.payload;
      })

      // Logout
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
      })

      // Refresh
      .addCase(refreshToken.fulfilled, (state, action) => {
        if (state.user) {
          state.user.accessToken = action.payload.accessToken;
          // update stored user with new token if you wish
          localStorage.setItem('user', JSON.stringify(state.user));
        }
      });
  },
});

export const { resetError } = authSlice.actions;
export default authSlice.reducer;
