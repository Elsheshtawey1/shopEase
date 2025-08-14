import { createSlice } from "@reduxjs/toolkit";

const searchSlise = createSlise({
  name: "search",
  initialState: "",
  reducers: {
    setSearch:(state , action)=> action.payload,
    clearSearch: () => "",
  }
})
export const { setSearch, clearSearch } = searchSlise.actions;
export default searchSlise.reducer;