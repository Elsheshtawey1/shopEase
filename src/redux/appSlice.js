
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: [],
  user: null,
};

export const appSlice = createSlice({
  name: "ecommerce",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.product.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.product.push(action.payload);
      }
    },

    removeItem: (state, action) => {
      state.product = state.product.filter((item) => item.id !== action.payload);
    },

    clearCart: (state) => {
      state.product = [];
    },

    increaseQty: (state, action) => {
      const item = state.product.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decreaseQty: (state, action) => {
      const item = state.product.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },

    setCart: (state, action) => {
      state.product = action.payload;
    },

    User: (state, action) => {
      state.user = action.payload;
    },

    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { addToCart, removeItem, clearCart, increaseQty, decreaseQty, setCart, User, logoutUser } = appSlice.actions;

export default appSlice.reducer;
