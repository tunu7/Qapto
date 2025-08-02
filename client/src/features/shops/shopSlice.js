import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchShopsAPI } from './shopAPI';

export const fetchShops = createAsyncThunk(
  'shops/fetchShops',
  async () => {
    return await fetchShopsAPI();
  },
  {
    condition: (_, { getState }) => {
      const { shops } = getState().shops;
      return shops.length === 0; // skip if already loaded
    }
  }
);


const shopSlice = createSlice({
  name: 'shops',
  initialState: {
    shops: [],
    loading: false,
    error: null,
    selectedShop: null, // ✅ added this
  },
  reducers: {
    setSelectedShop(state, action) {
      state.selectedShop = action.payload;
    },
    clearSelectedShop(state) {
      state.selectedShop = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShops.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchShops.fulfilled, (state, action) => {
        state.shops = action.payload;
        state.loading = false;
      })
      .addCase(fetchShops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedShop, clearSelectedShop } = shopSlice.actions;
export default shopSlice.reducer;
