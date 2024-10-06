import { createSlice } from "@reduxjs/toolkit";

export interface loginOrSignup {
    isLogin: boolean
}

const initialState: loginOrSignup = {
    isLogin: true
}

export const isLoginSlice = createSlice({
    name: 'isLogin',
    initialState,
    reducers: {
        setLogin: (state) => {
            state.isLogin = true
        },
        setSignup: (state) => {
            state.isLogin = false

        },
    }
})

export const { setLogin, setSignup } = isLoginSlice.actions

export default isLoginSlice.reducer