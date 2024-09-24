import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CurrentChatState {
    chatId: string | undefined,
}

const initialState: CurrentChatState = {
    chatId: undefined
}

export const currentChatSlice = createSlice({
    name: 'currentChat',
    initialState,
    reducers: {
        setCurrentChat: (state, action: PayloadAction<string>) => {
            state.chatId = action.payload
        },
    }
})

export const { setCurrentChat } = currentChatSlice.actions

export default currentChatSlice.reducer