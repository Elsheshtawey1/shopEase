import { createSlice } from "@reduxjs/toolkit";

const searchSlise = createSlise({
  name: "search",
  initialState: "",
  reducers: {
    setSearch:(state , action)=>{}
  }
})