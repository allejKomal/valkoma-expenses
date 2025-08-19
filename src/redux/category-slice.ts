// store/categoriesSlice.ts
import type { Category } from "@/models/category.model"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"


interface CategoriesState {
    items: Category[]
}

const initialState: CategoriesState = {
    items: [],
}

export const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        addCategories: (state, action: PayloadAction<Category[]>) => {
            state.items = action.payload; 
        },
        removeCategory: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter((c) => c.id !== action.payload)
        },
        clearCategories: (state) => {
            state.items = []
        },
    },
})

export const { addCategories, removeCategory, clearCategories } = categoriesSlice.actions
export default categoriesSlice.reducer
