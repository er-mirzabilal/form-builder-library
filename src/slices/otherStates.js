// src/slices/formSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const getIsSideDrawerOpen = (state) => state.otherStates.isSideDrawerOpen;
const initialState = {
  isSideDrawerOpen: false,
};

const formSlice = createSlice({
  name: "otherState",
  initialState,
  reducers: {
    setSideDrawerOpen(state, action) {
      const payload = action.payload;
      state.isSideDrawerOpen = payload;
    },
  },
});

export const { setSideDrawerOpen } = formSlice.actions;

export default formSlice.reducer;
