import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, userData: null },
  reducers: {
    login: (state, action) => { state.user = action.payload; },
    logout: (state) => { state.user = null; state.userData = null; },
    setUserData: (state, action) => { state.userData = action.payload; },
  },
});

export const { login, logout, setUserData } = authSlice.actions;
export default authSlice.reducer;
