// store/categoriesSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface UserState {
    key: string;
    secret: string;
    isAuthenticated: boolean;
}
const initialUserState: UserState = {
    key: "",
    secret: "",
    isAuthenticated: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        setUserCredentials: (state, action: PayloadAction<{ key: string; secret: string }>) => {
            state.key = action.payload.key;
            state.secret = action.payload.secret;
            state.isAuthenticated = true; // Mark as authenticated
        },
        logout: (state) => {
            state.key = "";
            state.secret = "";
            state.isAuthenticated = false; // Mark as logged out
        },
    },
});


export const { setUserCredentials, logout } = userSlice.actions;

// Export reducers
export default userSlice.reducer;
