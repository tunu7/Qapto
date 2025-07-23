import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  fetchProductsByShopIdAPI,
  updateProductByIdAPI,
  deleteProductByIdAPI,
} from './productAPI';

export const fetchProductsByShop = createAsyncThunk(
  'products/fetchByShop',
  async (shopId) => await fetchProductsByShopIdAPI(shopId)
);

export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, data }) => await updateProductByIdAPI(id, data)
);

export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id) => await deleteProductByIdAPI(id)
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
      // fetch
      .addCase(fetchProductsByShop.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(fetchProductsByShop.fulfilled, (s, a) => { s.loading = false; s.products = a.payload; })
      .addCase(fetchProductsByShop.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })

      // update
      .addCase(updateProduct.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(updateProduct.fulfilled, (s, a) => {
        s.loading = false;
        const idx = s.products.findIndex(p => p._id === a.payload._id);
        if (idx !== -1) s.products[idx] = a.payload;
      })
      .addCase(updateProduct.rejected, (s, a) => { s.loading = false; s.error = a.error.message; })

      // delete
      .addCase(deleteProduct.pending, (s) => { s.loading = true; s.error = null; })
      .addCase(deleteProduct.fulfilled, (s, a) => {
        s.loading = false;
        s.products = s.products.filter(p => p._id !== a.payload);
      })
      .addCase(deleteProduct.rejected, (s, a) => { s.loading = false; s.error = a.error.message; });
  },
});

export default productSlice.reducer;
