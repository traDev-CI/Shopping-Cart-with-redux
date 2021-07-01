import { createSlice } from "@reduxjs/toolkit";
import { initialProductosState } from "./initialsStates";

export const products = createSlice({
  name: "products",
  initialState: initialProductosState,
  reducers: {
    getAllProducts(state, action) {
      state.products = action.payload;
    },
  },
});
