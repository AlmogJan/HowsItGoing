import { createSlice } from "@reduxjs/toolkit";


export interface ChatDetailsState {
    isOpen: boolean,
    content: ChatDetailsContent
}

export enum ChatDetailsContent {
    Details,
    Edit
}

const initialState: ChatDetailsState = {
    isOpen: false,
    content: ChatDetailsContent.Details
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
            console.log('set details');

        },
        setEdit: (state) => {
            state.content = ChatDetailsContent.Edit
            console.log('set edit');

        }
    }
})

export const { setOpenTrue, setOpenFalse, setDetails, setEdit } = chatDetailsSlice.actions
export default chatDetailsSlice.reducer