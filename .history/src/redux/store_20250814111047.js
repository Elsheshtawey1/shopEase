import { configureStore } from "@reduxjs/toolkit";
import appReducer from "./appSlice";
import checkoutReducer from "./checkoutSlice";
import searchReducer from "./searchSlice";
import themeReducer from "./themeSlice";
export const store = configureStore({
  reducer: {
    app: appReducer,
    checkout: checkoutReducer,
    search: searchReducer,
    
  },
});
