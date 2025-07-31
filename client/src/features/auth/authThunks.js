// src/features/auth/authThunks.js

import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axiosInstance'

// ✅ Register user and auto-login
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        '/auth/register',
        { name, email, password },
        { withCredentials: true } // Ensures cookies (refresh token) are sent
      )
      return data // Expected: { user, accessToken }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// ✅ Login user
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        '/auth/login',
        { email, password },
        { withCredentials: true }
      )
      return data // Expected: { user, accessToken }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// ✅ Refresh access token using httpOnly cookie
export const refreshToken = createAsyncThunk(
  'auth/refresh',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        '/auth/refresh',
        {},
        { withCredentials: true }
      )
      return data.accessToken // Only accessToken is returned
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// ✅ Logout user (clears refresh cookie server-side)
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await axiosInstance.post(
        '/auth/logout',
        {},
        { withCredentials: true }
      )
      return // nothing to return
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)
