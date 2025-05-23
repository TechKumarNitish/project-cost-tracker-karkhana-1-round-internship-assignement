import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { user: (()=>{
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  })()},
  reducers: {
    login: (state, action) => { state.user = action.payload; localStorage.setItem("user", JSON.stringify(action.payload)); },
    logout: (state) => { state.user = null; state.userData = null; localStorage.removeItem("user"); },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
