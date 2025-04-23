import { configureStore } from '@reduxjs/toolkit'
import wishlistReducer from './slice/wishlistSlice'
import productReducer from './slice/productSlice'
import productdetailReducer from './slice/detailSlice'
import cartReducer from './slice/cartSlice'

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    productdetail: productdetailReducer,
    wishlist: wishlistReducer,
    product: productReducer}
})