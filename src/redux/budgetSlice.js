import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  budgets: localStorage.getItem("budgets") || [],
};

const budgetSlice = createSlice({
  name: "budgets",
  initialState,
  reducers: {
    setBudgets: (state, action) => {
      state.budgets = action.payload;
      localStorage.setItem("budgets", JSON.stringify(action.payload));
    },
    deleteBudget: (state) => {
      localStorage.removeItem("budgets");
      state.budgets = [];
    },
  },
});

export const { setBudgets, deleteBudget } = budgetSlice.actions;
export default budgetSlice.reducer;
