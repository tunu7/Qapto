// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import shopReducer from '../features/shops/shopSlice';
import productReducer from '../features/products/productSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shops: shopReducer,
    products: productReducer,
     user: userReducer,
  },
});
