import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchProductsByShopIdAPI } from './productAPI';

export const fetchProductsByShop = createAsyncThunk(
  'products/fetchByShop',
  async (shopId) => {
    return await fetchProductsByShopIdAPI(shopId);
  }
);

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByShop.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByShop.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductsByShop.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default productSlice.reducer;
