import { useDispatch } from "react-redux"
import { Chat } from "../services/chat/chat.entity"
import { setCurrentChat } from "../store/chat/currentChat.reducer"
import { Avatar } from "@mui/material"

type ChatPreviewProps = {
    chat: Chat
}
export function ChatPreview({ chat }: ChatPreviewProps) {
    const lastMessage = chat.messages[chat.messages.length - 1].content
    const dispatch = useDispatch()
    return <div className="list-item chat-preview" key={chat.id} onClick={() => {
        dispatch(setCurrentChat(chat.id))
    }}>
        <Avatar alt={`${chat.name}`} />
        <div className="chat-preview-deatils-container">
            <span className="chat-preview-name">{chat.name}</span>
            <span className="chat-preview-last-message">{lastMessage}</span>
        </div>
    </div>
}