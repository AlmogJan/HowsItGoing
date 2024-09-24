import { useSelector } from "react-redux"
import { MessageComp } from "./MessageComp"
import { RootState } from "../store/store"

export function Messages() {
    const currentChatId = useSelector((state: RootState) => state.currentChat.chatId)
    const currentChat = useSelector((state: RootState) => currentChatId ? state.chats.chats[currentChatId] : undefined);

    return <div className="messages">
        {currentChat?.messages?.map((message, index) => (
            <MessageComp key={index} message={message} index={index} />
        ))}
    </div>
}