import { configureStore } from '@reduxjs/toolkit';
import shopReducer from '../features/shops/shopSlice';
import productReducer from '../features/products/productSlice';

export const store = configureStore({
  reducer: {
    shops: shopReducer,
    products: productReducer,
  },
});
