import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  product: JSON.parse(localStorage.getItem("cart")) || [],
  wishlist: JSON.parse(localStorage.getItem("wishlist")) || [],
  user: null,
};

export const appSlice = createSlice({
  name: "ecommerce",
  initialState,
  reducers: {
    // Cart reducers
    addToCart: (state, action) => {
      const item = state.product.find((item) => item.id === action.payload.id);
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.product.push(action.payload);
      }
      localStorage.setItem("cart", JSON.stringify(state.product));
    },
    removeItem: (state, action) => {
      state.product = state.product.filter((item) => item.id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.product));
    },
    clearCart: (state) => {
      state.product = [];
      localStorage.setItem("cart", JSON.stringify([]));
    },
    increaseQty: (state, action) => {
      const item = state.product.find((item) => item.id === action.payload);
      if (item) {
        item.quantity += 1;
        localStorage.setItem("cart", JSON.stringify(state.product));
      }
    },
    decreaseQty: (state, action) => {
      const item = state.product.find((item) => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        localStorage.setItem("cart", JSON.stringify(state.product));
      }
    },
    setCart: (state, action) => {
      state.product = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.product));
    },

    // Wishlist reducers
    addToWishlist: (state, action) => {
      const exists = state.wishlist.find((item) => item.id === action.payload.id);
      if (!exists) {
        state.wishlist.push(action.payload);
        localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
      }
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter((item) => item.id !== action.payload);
      localStorage.setItem("wishlist", JSON.stringify(state.wishlist));
    },
    clearWishlist: (state) => {
      state.wishlist = [];
      localStorage.setItem("wishlist", JSON.stringify([]));
    },

    // User reducers
    User: (state, action) => {
      state.user = action.payload;
    },
    logoutUser: (state) => {
      state.user = null;
    },
  },
});

export const { addToCart, removeItem, clearCart, increaseQty, decreaseQty, setCart, addToWishlist, removeFromWishlist, clearWishlist, User, logoutUser } = appSlice.actions;

export default appSlice.reducer;
