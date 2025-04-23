import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductById = createAsyncThunk(
  "productdetail/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.get(`http://localhost:8001/products/${id}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching product by ID:", error.message);
      return rejectWithValue({ message: "Failed to fetch product details" });
    }
  }
);

const initialState = {
  products: [],
  loading: false,
  error: null,
};

const productdetailSlice = createSlice({
  name: "productdetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductById.pending, (state) => {
        console.log("Fetching product by ID...");
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        console.log("Product details fetched successfully");
        console.log("Action payload:", action.payload); // Added for debugging
        console.log("Current products:", state.products); // Added for debugging

        const updatedProducts = state.products.map((product) => {
          if (product.id === action.payload.id) {
            return action.payload;
          }
          return product;
        });

        // Add new product if it's not already in the list
        if (
          !state.products.find((product) => product.id === action.payload.id)
        ) {
          updatedProducts.push(action.payload);
        }

        console.log("Updated products:", updatedProducts); // Added for debugging
        state.products = updatedProducts;
        state.loading = false;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        console.error("Error fetching product by ID");
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {} = productdetailSlice.actions;

export default productdetailSlice.reducer;
