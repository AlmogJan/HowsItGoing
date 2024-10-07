import { createSlice } from "@reduxjs/toolkit";
export interface ChatDetailsState {
    isOpen: boolean,
    content: ChatDetailsContent
    compTitle: string,
}

export enum ChatDetailsContent {
    Details,
    Add
}

export const chatDetailsDesc: Record<string, ChatDetailsContent> = {
    "Chat Details": ChatDetailsContent.Details,
    "Add New Chat": ChatDetailsContent.Add

}

const chatDetailsDescArr = Object.keys(chatDetailsDesc)

const initialState: ChatDetailsState = {
    isOpen: false,
    content: ChatDetailsContent.Details,
    compTitle: chatDetailsDescArr[ChatDetailsContent.Details]
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
            console.log('set open false');

        },
        setDetails: (state) => {
            state.content = ChatDetailsContent.Details
            state.compTitle = chatDetailsDescArr[ChatDetailsContent.Details]
            console.log('set details');

        },
        setAddChat: (state) => {
            state.content = ChatDetailsContent.Add
            state.compTitle = chatDetailsDescArr[ChatDetailsContent.Add]
            console.log('set Add');

        }
    }
})

export const { setOpenTrue, setOpenFalse, setDetails, setAddChat } = chatDetailsSlice.actions
export default chatDetailsSlice.reducer