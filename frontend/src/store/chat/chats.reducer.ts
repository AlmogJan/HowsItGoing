import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Chat } from "../../services/chat/chat.entity";


export interface ChatsState {
    chats: Record<string, Chat>,
}

const initialState: ChatsState = {
    chats: {}
}

export const chatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        setChats: (state, action: PayloadAction<Record<string, Chat>>) => {
            state.chats = { ...action.payload }
        },
    }
})

export const { setChats } = chatsSlice.actions
export default chatsSlice.reducer