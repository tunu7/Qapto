// src/features/auth/authThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../api/axiosInstance';

const extractErrorMessage = (err) => {
  if (err?.response?.data?.message) return err.response.data.message;
  if (err?.message) return err.message;
  return 'An unexpected error occurred';
};

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, thunkAPI) => {
    try {
      const res = await axios.post('/auth/register', userData, { withCredentials: true });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(extractErrorMessage(err));
    }
  }
);

export const loginUser = createAsyncThunk(
  'auth/login',
  async (credentials, thunkAPI) => {
    try {
      const res = await axios.post('/auth/login', credentials, { withCredentials: true });
      return res.data; // expected { accessToken, user }
    } catch (err) {
      return thunkAPI.rejectWithValue(extractErrorMessage(err));
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
      await axios.post('/auth/logout', null, { withCredentials: true });
      return;
    } catch (err) {
      return thunkAPI.rejectWithValue(extractErrorMessage(err));
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refresh',
  async (_, thunkAPI) => {
    try {
      const res = await axios.post('/auth/refresh', null, { withCredentials: true });
      return res.data; // expected { accessToken }
    } catch (err) {
      return thunkAPI.rejectWithValue(extractErrorMessage(err));
    }
  }
);
