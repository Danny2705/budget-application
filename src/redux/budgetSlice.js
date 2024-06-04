import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  budgets: [],
};

const budgetSlice = createSlice({
  name: "budgets",
  initialState,
  reducers: {
    setBudgets: (state, action) => {
      state.budgets = action.payload;
    },
  },
});

export const { setBudgets } = budgetSlice.actions;
export default budgetSlice.reducer;
