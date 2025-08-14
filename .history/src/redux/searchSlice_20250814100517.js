import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    setSearch: (state, action) => action.payload,
    clearSearch: () => "",
  },
});
export const { setSearch, clearSearch } = searchSlise.actions;
export default searchSlice.reducer;