import { createSlice } from "@reduxjs/toolkit";
import { initialCartState } from "./initialsStates";

const cartSlice = createSlice({
  name: "cart",
  initialState: initialCartState,
  reducers: {
    bouched(state, action) {
      state.totalQuantity = action.payload;
    },
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      state.totalQuantity++;
      if (!existingItem) {
        state.items.push({
          id: newItem.id,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          name: newItem.title,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice = existingItem.totalPrice + newItem.price;
      }
    },
    removeItemFromCart(state, action) {
      console.log(state.items);
      const id = action.payload;
      const exitingItem = state.items.find((item) => item.id === id);
      state.totalQuantity--;
      if (exitingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        exitingItem.quantity--;
        exitingItem.totalPrice = exitingItem.totalPrice - exitingItem.price;
      }
    },
    getCarts(state, action) {
      state.items = action.payload;
    },
  },
});

export default cartSlice;
