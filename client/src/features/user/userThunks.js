// src/features/user/userThunks.js
import { createAsyncThunk } from '@reduxjs/toolkit'
import axiosInstance from '../../api/axiosInstance'

// Fetch own profile
export const fetchUserProfile = createAsyncThunk(
  'user/fetchProfile',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken
      const { data } = await axiosInstance.get('/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      })
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// Update own profile
export const updateUserProfile = createAsyncThunk(
  'user/updateProfile',
  async (updates, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken
      const { data } = await axiosInstance.put('/users/profile', updates, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// Admin: list all users
export const listUsers = createAsyncThunk(
  'user/list',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken
      const { data } = await axiosInstance.get('/users', {
        headers: { Authorization: `Bearer ${token}` }
      })
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// Admin: get user by ID
export const getUserById = createAsyncThunk(
  'user/getById',
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken
      const { data } = await axiosInstance.get(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// Admin: update any user
export const updateUser = createAsyncThunk(
  'user/update',
  async ({ id, updates }, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken
      const { data } = await axiosInstance.put(`/users/${id}`, updates, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// Admin: delete user
export const deleteUser = createAsyncThunk(
  'user/delete',
  async (id, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken
      await axiosInstance.delete(`/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      return id
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// src/features/user/userThunks.js

// User: Apply for Vendor
export const applyForVendor = createAsyncThunk(
  'user/applyForVendor',
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getState().auth.accessToken;
      const { data } = await axiosInstance.put('/users/apply-vendor', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return data.user; // return the updated user
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
