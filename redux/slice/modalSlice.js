import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeWallet: null,
  isNewContactsModalOpen: false,
  isEditModal: false,
};

const modalsSlice = createSlice({
  name: "modals",

  initialState,

  reducers: {
    toggleNewContactsModal: (state) => {
      state.isNewContactsModalOpen = !state.isNewContactsModalOpen;
    },

    setActiveWallet: (state, action) => {
      state.activeWallet = action.payload;
    },

    toggleEditMeeting: (state) => {
      state.isEditModal = !state.isEditModal;
    },
  },
});

export const { toggleNewContactsModal, setActiveWallet, toggleEditMeeting } =
  modalsSlice.actions;

export default modalsSlice.reducer;
