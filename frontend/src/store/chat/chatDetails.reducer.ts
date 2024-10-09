import { createSlice } from "@reduxjs/toolkit";
import { ChatDetailsContent } from "../../enums/chat.enum";
export interface ChatDetailsState {
    isOpen: boolean,
    content: ChatDetailsContent
}

const initialState: ChatDetailsState = {
    isOpen: false,
    content: ChatDetailsContent.None,
}

export const chatDetailsSlice = createSlice({
    name: 'chatDetailsState',
    initialState,
    reducers: {
        setOpenTrue: (state) => {
            state.isOpen = true
            console.log('set open true');
        },
        setOpenFalse: (state) => {
            state.isOpen = false
            state.content = ChatDetailsContent.None;
        },
        setDetails: (state) => {
            state.content = ChatDetailsContent.Details
        },
        setSearchInChat: (state) => {
            state.content = ChatDetailsContent.Search
        }
    }
})

export const { setOpenTrue, setOpenFalse, setDetails, setSearchInChat } = chatDetailsSlice.actions
export default chatDetailsSlice.reducer