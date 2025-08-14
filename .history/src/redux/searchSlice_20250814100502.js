import { createSlice } from "@reduxjs/toolkit";

const searchSlise = createSlice({
  name: "search",
  initialState: "",
  reducers: {
    setSearch: (state, action) => action.payload,
    clearSearch: () => "",
  },
});
export const { setSearch, clearSearch } = searchSlise.actions;
export default searchSlise.reducer;