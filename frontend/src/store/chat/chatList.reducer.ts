import { createSlice } from "@reduxjs/toolkit";
import { ChatListContent } from "../../enums/chat.enum";

export interface ChatListState {
    content: ChatListContent
}

const initialState: ChatListState = {
    content: ChatListContent.ChatList,
}

export const chatListSlice = createSlice({
    name: 'chatDetailsState',
    initialState,
    reducers: {
        setChatList: (state) => {
            state.content = ChatListContent.ChatList;
        },
        setAdd: (state) => {
            state.content = ChatListContent.Add;
        },
        setSettings: (state) => {
            state.content = ChatListContent.Settings;
        }
    }
})

export const { setChatList, setAdd, setSettings } = chatListSlice.actions
export default chatListSlice.reducer