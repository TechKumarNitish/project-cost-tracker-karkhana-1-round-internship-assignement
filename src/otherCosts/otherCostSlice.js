import { createSlice } from "@reduxjs/toolkit";

const otherCostSlice = createSlice({
  name: "otherCosts",
  initialState: [],
  reducers: {
    setOtherCosts: (state, action) => action.payload,
    addOtherCost: (state, action) => { state.push(action.payload); },
    deleteOtherCost: (state, action) => state.filter(c => c.id !== action.payload),
    updateOtherCost: (state, action) => {
      const { id, ...rest } = action.payload;
      const idx = state.findIndex(c => c.id === id);
      if (idx !== -1) state[idx] = { ...state[idx], ...rest };
    },
  },
});

export const {
  setOtherCosts, addOtherCost, deleteOtherCost, updateOtherCost
} = otherCostSlice.actions;

export default otherCostSlice.reducer;
