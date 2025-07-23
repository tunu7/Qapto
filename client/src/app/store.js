// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import shopReducer from '../features/shops/shopSlice';
import productReducer from '../features/products/productSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    shops: shopReducer,
    products: productReducer,
  },
});
