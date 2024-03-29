"use client";

import { configureStore } from "@reduxjs/toolkit";

import modalReducer from "./slice/modalSlice";
import pushReducer from "./slice/PushSlice";
import userReducer from "./slice/userSlice";
import meetingReducer from "./slice/meetingSlice";

export const store = configureStore({
  reducer: {
    modals: modalReducer,
    push: pushReducer,
    meeting: meetingReducer,
    user: userReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
