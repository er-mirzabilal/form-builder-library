// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import formReducer from "./slices/formSlice";
import formBuilderReducer from "./slices/formBuilder";
import otherStateReducer from "./slices/otherStates";

export const store = configureStore({
  reducer: {
    formBuilder: formBuilderReducer,
    form: formReducer,
    otherStates: otherStateReducer,
  },
});
