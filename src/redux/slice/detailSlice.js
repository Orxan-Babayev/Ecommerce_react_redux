import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductById = createAsyncThunk(
  "productdetail/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      if (isNaN(parseInt(id))) {
        throw new Error("Invalid product ID");
      }
      const res = await axios.get(`http://localhost:8001/products/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching product by ID:", error.message);
      return rejectWithValue({
        message:
          error.response?.data?.error || "Failed to fetch product details",
      });
    }
  }
);

const initialState = {
  product: null, // Store single product
  loading: false,
  error: null,
};

const productdetailSlice = createSlice({
  name: "productdetail",
  initialState,
  reducers: {
    resetProduct: (state) => {
      state.product = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.product = null; // Clear previous product
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export const { resetProduct } = productdetailSlice.actions;

export default productdetailSlice.reducer;
