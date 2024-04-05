import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  meetings: [],
  activeMeeting: null,
  selectedMeeting: null,
  IncomingVideoCall: null,
};

const meetingSlice = createSlice({
  name: "meeting",

  initialState,

  reducers: {
    setMeetings: (state, action) => {
      state.meetings = action.payload;
    },

    setActiveMeeting: (state, action) => {
      state.activeMeeting = action.payload;
    },

    clearActiveMeeting: (state) => {
      state.activeMeeting = null;
    },

    updateMeeting: (state, action) => {
      state.meetings = state.meetings.map((meeting) =>
        meeting._id === action.payload._id ? action.payload : meeting
      );
    },

    addMeeting: (state, action) => {
      state.meetings.push(action.payload);
    },

    deleteMeeting: (state, action) => {
      state.meetings = state.meetings.filter(
        (meeting) => meeting._id !== action.payload
      );
    },

    clearMeetings: (state) => {
      state.meetings = [];
      state.activeMeeting = null;
    },

    setSelectedMeeting: (state, action) => {
      state.selectedMeeting = action.payload;
    },

    clearSelectedMeeting: (state) => {
      state.selectedMeeting = null;
    },

    setIncomingVideoCall: (state, action) => {
      state.IncomingVideoCall = action.payload;
    },

    clearIncomingVideoCall: (state) => {
      state.IncomingVideoCall = null;
    },
  },
});

export const {
  setMeetings,
  setActiveMeeting,
  updateMeeting,
  addMeeting,
  deleteMeeting,
  clearMeetings,
  clearActiveMeeting,
  setSelectedMeeting,
  clearSelectedMeeting,
  setIncomingVideoCall,
  clearIncomingVideoCall,
} = meetingSlice.actions;

export default meetingSlice.reducer;
