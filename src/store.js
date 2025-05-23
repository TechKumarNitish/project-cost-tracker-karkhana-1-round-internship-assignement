import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./redux/auth/authSlice";
import itemReducer from "./redux/items/itemSlice";
import otherCostReducer from "./redux/otherCosts/otherCostSlice";
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
