// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./slices/formSlice";
import otherStateReducer from "./slices/otherStates";

export const store = configureStore({
  reducer: {
    form: formReducer,
    otherStates: otherStateReducer,
  },
});
