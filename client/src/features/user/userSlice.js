// src/features/user/userSlice.js
import { createSlice } from '@reduxjs/toolkit'
import {
  fetchUserProfile,
  updateUserProfile,
  listUsers,
  getUserById,
  updateUser,
  deleteUser
} from './userThunks'

const initialState = {
  profile: null,
  users: [],
  selectedUser: null,
  loading: false,
  error: null,
  success: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserState(state) {
      state.error = null
      state.success = false
    }
  },
  extraReducers: builder => {
    builder
      // fetch profile
      .addCase(fetchUserProfile.pending, state => {
        state.loading = true; state.error = null
      })
      .addCase(fetchUserProfile.fulfilled, (state, { payload }) => {
        state.loading = false; state.profile = payload
      })
      .addCase(fetchUserProfile.rejected, (state, { payload }) => {
        state.loading = false; state.error = payload
      })

      // update profile
      .addCase(updateUserProfile.pending, state => {
        state.loading = true; state.error = null
      })
      .addCase(updateUserProfile.fulfilled, (state, { payload }) => {
        state.loading = false; state.profile = payload; state.success = true
      })
      .addCase(updateUserProfile.rejected, (state, { payload }) => {
        state.loading = false; state.error = payload
      })

      // list users
      .addCase(listUsers.pending, state => {
        state.loading = true; state.error = null
      })
      .addCase(listUsers.fulfilled, (state, { payload }) => {
        state.loading = false; state.users = payload
      })
      .addCase(listUsers.rejected, (state, { payload }) => {
        state.loading = false; state.error = payload
      })

      // get by id
      .addCase(getUserById.pending, state => {
        state.loading = true; state.error = null
      })
      .addCase(getUserById.fulfilled, (state, { payload }) => {
        state.loading = false; state.selectedUser = payload
      })
      .addCase(getUserById.rejected, (state, { payload }) => {
        state.loading = false; state.error = payload
      })

      // update any user
      .addCase(updateUser.pending, state => {
        state.loading = true; state.error = null
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.users = state.users.map(u => u._id === payload._id ? payload : u)
        state.success = true
      })
      .addCase(updateUser.rejected, (state, { payload }) => {
        state.loading = false; state.error = payload
      })

      // delete user
      .addCase(deleteUser.pending, state => {
        state.loading = true; state.error = null
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.loading = false
        state.users = state.users.filter(u => u._id !== payload)
        state.success = true
      })
      .addCase(deleteUser.rejected, (state, { payload }) => {
        state.loading = false; state.error = payload
      })
  }
})

export const { clearUserState } = userSlice.actions

// — re-export your thunks so they can be imported from userSlice.js —
export {
  fetchUserProfile,
  updateUserProfile,
  listUsers,
  getUserById,
  updateUser,
  deleteUser
}

export default userSlice.reducer
