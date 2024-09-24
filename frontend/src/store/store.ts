import { configureStore } from '@reduxjs/toolkit'
import userReducer from './user/user.reducer'
import chatsReducer from './chat/chats.reducer'
import currentChatReducer from './chat/currentChat.reducer'
// ...

export const store = configureStore({
    reducer: {
        user: userReducer,
        chats: chatsReducer,
        currentChat: currentChatReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppStore = typeof store