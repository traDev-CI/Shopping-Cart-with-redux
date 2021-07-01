import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "../reducer/cartSlice";
import { products } from "../reducer/productsSlice";
import uiSlices from "../reducer/uiSlices";

const store = configureStore({
  reducer: {
    ui: uiSlices.reducer,
    card: cartSlice.reducer,
    products: products.reducer,
  },
});

export default store;
