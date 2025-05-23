import { createSlice } from "@reduxjs/toolkit";

const itemSlice = createSlice({
  name: "items",
  initialState: [],
  reducers: {
    setItems: (state, action) => action.payload,
    addItem: (state, action) => { state.push(action.payload); },
    deleteItem: (state, action) => state.filter(i => i.id !== action.payload),
    updateItem: (state, action) => {
      const { id, ...rest } = action.payload;
      const idx = state.findIndex(i => i.id === id);
      if (idx !== -1) state[idx] = { ...state[idx], ...rest };
    },
  },
});

export const { setItems, addItem, deleteItem, updateItem } = itemSlice.actions;
export default itemSlice.reducer;
