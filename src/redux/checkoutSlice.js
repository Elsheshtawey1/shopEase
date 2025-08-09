import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  shippingAddress: {
    fullName: "",
    address: "",
    city: "",
    country: "",
    postalCode: "",
  },
  paymentMethod: "",
  orderDetails: {},
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    saveOrderDetails: (state, action) => {
      state.orderDetails = action.payload;
      localStorage.setItem("orderDetails", JSON.stringify(action.payload));
    },
  },
});

export const { saveShippingAddress, savePaymentMethod, saveOrderDetails } = checkoutSlice.actions;
export default checkoutSlice.reducer;
