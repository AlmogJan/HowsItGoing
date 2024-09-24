import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthLevel, User } from "../../services/user/user.entity";

export interface loggedInUserState {
    user: User,
    isAuthenticated: boolean
}

const initialState: loggedInUserState = {
    user: {
        authLevel: AuthLevel.User,
        email: "",
        id: "",
        name: "",
        displayName: "",
        profilePicture: ""
    },
    isAuthenticated: false
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action: PayloadAction<User>) => {
            state.user = action.payload
            state.isAuthenticated = true
        },
        logout: (state) => {
            state.user = initialState.user
            state.isAuthenticated = false
        },
    }
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer