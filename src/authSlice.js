import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, userData: null, userItems: [] },
  reducers: {
    login: (state, action) => { state.user = action.payload; },
    logout: (state) => { state.user = null; state.userData = null; state.userItems = []; },
    setUserData: (state, action) => { state.userData = action.payload; },
    setUserItems: (state, action) => { state.userItems = action.payload; },
    addUserItem: (state, action) => { state.userItems.push(action.payload); },
    deleteUserItem: (state, action) => {
      state.userItems = state.userItems.filter(i => i.id !== action.payload);
    },
    updateUserItem: (state, action) => {
      const { id, ...rest } = action.payload;
      const index = state.userItems.findIndex(i => i.id === id);
      if (index !== -1) state.userItems[index] = { ...state.userItems[index], ...rest };
    },
  },
});

export const {
  login, logout, setUserData, setUserItems,
  addUserItem, deleteUserItem, updateUserItem
} = authSlice.actions;

export default authSlice.reducer;
