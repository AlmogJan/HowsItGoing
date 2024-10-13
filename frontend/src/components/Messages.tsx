import { useSelector } from "react-redux"
import { MessageComp } from "./MessageComp"
import { RootState } from "../store/store"
import { useEffect, useRef } from "react";

export function Messages() {
    const currentChatId = useSelector((state: RootState) => state.currentChat.chatId)
    const currentChat = useSelector((state: RootState) => currentChatId ? state.chats.chats[currentChatId] : undefined);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
            console.log('Scrolling to bottom', messagesEndRef.current);
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [currentChat?.messages]);

    return <div className="messages">
        {currentChat?.messages?.map((message, index) => (
            <MessageComp key={index} message={message} index={index} />
        ))}
        <span ref={messagesEndRef} className="messages-ref" />
    </div>
}