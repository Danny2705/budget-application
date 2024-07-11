import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactions: localStorage.getItem("transactions") || [],
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransaction: (state, action) => {
      state.transactions = action.payload;
      localStorage.setItem("transactions", JSON.stringify(action.payload));
    },
    deleteTransaction: (state) => {
      localStorage.removeItem("transactions");
      state.transactions = [];
    },
  },
});

export const { setTransaction, deleteTransaction} =
transactionSlice.actions;
export default transactionSlice.reducer;
