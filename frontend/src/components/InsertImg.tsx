import { useSelector } from "react-redux"
import { RootState } from "../store/store"

export function Insertimg() {
    const chats = useSelector((state: RootState) => state.chats.chats)
    const currentChatId = useSelector((state: RootState) => state.currentChat.chatId)
    const currentChat = currentChatId ? chats[currentChatId] : undefined
    return <div>
        <img className="chat-details-img" src={currentChat?.image} alt="" />
    </div>
}