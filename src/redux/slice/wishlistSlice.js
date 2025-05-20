import { createSlice } from "@reduxjs/toolkit";

const storedWishlist = localStorage.getItem("wishlist");
const initialState = {
  items: storedWishlist ? JSON.parse(storedWishlist) : [],
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState,
  reducers: {
    addToWishlist(state, action) {
      state.items.push(action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    removeFromWishlist(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
    toggleWishlist(state, action) {
      const item = action.payload;
      const isInWishlist = state.items.some(
        (product) => product.id === item.id
      );
      if (isInWishlist) {
        state.items = state.items.filter((product) => product.id !== item.id);
      } else {
        state.items.push(item);
      }
      localStorage.setItem("wishlist", JSON.stringify(state.items));
    },
  },
});

export const selectWishlistItems = (state) => state.wishlist.items;

export const { addToWishlist, removeFromWishlist, toggleWishlist } =
  wishlistSlice.actions;

export default wishlistSlice.reducer;
