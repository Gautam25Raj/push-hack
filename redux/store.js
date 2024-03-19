"use client";

import { configureStore } from "@reduxjs/toolkit";

import modalReducer from "./slice/modalSlice";
import pushReducer from "./slice/PushSlice";

export const store = configureStore({
  reducer: {
    modals: modalReducer,
    push: pushReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
