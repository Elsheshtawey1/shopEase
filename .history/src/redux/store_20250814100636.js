import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import checkoutReducer from "./checkoutSlice";

export const store = configureStore({
  reducer: {
    app: appReducer,
    checkout: checkoutReducer,
    search:searchReducer,
  },
});
