import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export function ChatTitle() {
    const currentChatId = useSelector((state: RootState) => state.currentChat.chatId)
    const chats = useSelector((state: RootState) => state.chats.chats)

    const currentChat = currentChatId ? chats[currentChatId] : undefined;
    return currentChat ? <div className="chat-title">
        <Avatar alt={currentChat.name.toLocaleUpperCase()} src={currentChat.image} />
        <span className="chat-name">{currentChat?.name}</span>
    </div> : <></>

}