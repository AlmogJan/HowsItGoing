import { useDispatch } from "react-redux"
import { Chat } from "../services/chat/chat.entity"
import { setCurrentChat } from "../store/chat/currentChat.reducer"

type ChatPreviewProps = {
    chat: Chat
}
export function ChatPreview({ chat }: ChatPreviewProps) {
    const dispatch = useDispatch()

    return <div key={chat.id} onClick={() => {
        dispatch(setCurrentChat(chat.id))
    }}>
        <img src={`${chat.image}`} alt="" />
        <span>{chat.name}</span>
    </div>
}