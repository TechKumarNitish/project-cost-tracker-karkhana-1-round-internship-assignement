import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import itemReducer from "./items/itemSlice";
import otherCostReducer from "./otherCosts/otherCostSlice";
// import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    items: itemReducer,
    otherCosts: otherCostReducer,
  },
  // middleware: (getDefaultMiddleware) =>
  // getDefaultMiddleware().concat(thunk)

});
