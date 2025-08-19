// store/expensesSlice.ts
import type { Expense } from "@/models/expense.model"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"


interface ExpensesState {
  items: Expense[]
}

const initialState: ExpensesState = {
  items: [],
}

export const expensesSlice = createSlice({
  name: "expenses",
  initialState,
  reducers: {
    addExpense: (state, action: PayloadAction<Expense[]>) => {
      state.items = action.payload;
    },
    removeExpense: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((e) => e.id !== action.payload)
    },
    clearExpenses: (state) => {
      state.items = []
    },
  },
})

export const { addExpense, removeExpense, clearExpenses } = expensesSlice.actions
export default expensesSlice.reducer
