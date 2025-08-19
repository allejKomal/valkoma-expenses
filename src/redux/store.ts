import { configureStore } from "@reduxjs/toolkit"
import { crudApi } from "./curd-api"
import { expensesSlice } from "./expense-slice"
import { categoriesSlice } from "./category-slice"

export const store = configureStore({
    reducer: {
        [crudApi.reducerPath]: crudApi.reducer,
        expenses: expensesSlice.reducer,
        categories: categoriesSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(crudApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
