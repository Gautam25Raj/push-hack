import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pushSign: false,
  currentContact: {},
  recentContact: [],
  recentRequest: [],
  messages: [],
};

const pushSlice = createSlice({
  name: "push",

  initialState,

  reducers: {
    setPushSign: (state, action) => {
      state.pushSign = action.payload;
    },

    setCurrentContact: (state, action) => {
      state.currentContact = action.payload;
    },

    setRecentContact: (state, action) => {
      state.recentContact = action.payload;
    },

    addRecentContact: (state, actionContact) => {
      state.recentContact.push(action.payload);
    },

    setRecentRequest: (state, action) => {
      state.recentRequest = action.payload;
    },

    updateRecentRequest: (state, action) => {
      state.recentRequest = state.recentRequest.filter(
        (request) => request.did !== action.payload
      );
    },

    addRecentRequest: (state, action) => {
      state.recentRequest.push(action.payload);
    },

    setMessages: (state, action) => {
      state.messages = action.payload.map((message) => message);
    },

    updateMessages: (state, action) => {
      state.messages.push(action.payload);
    },

    resetContacts: (state) => {
      initialState;
    },
  },
});

export const {
  setPushSign,
  setCurrentContact,
  setRecentContact,
  addRecentContact,
  setRecentRequest,
  addRecentRequest,
  resetContacts,
  setMessages,
  updateMessages,
  updateRecentRequest,
} = pushSlice.actions;

export default pushSlice.reducer;
