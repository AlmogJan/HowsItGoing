import { useDispatch } from "react-redux"
import { Chat } from "../services/chat/chat.entity"
import { setCurrentChat } from "../store/chat/currentChat.reducer"
import { Avatar } from "@mui/material"
import { useEffect, useState } from "react"
import { utilService } from "../services/util.service"
import { userService } from "../services/user/user.service"

type ChatPreviewProps = {
    chat: Chat
}

export function ChatPreview({ chat }: ChatPreviewProps) {
    const dispatch = useDispatch()
    const [lastMessageUser, setLastMessageUser] = useState<string | undefined>();
    const [lastMessageContent, setLastMessageContent] = useState<string | undefined>();
    const [chatPreviewHovered, setChatPreviewHovered] = useState<string | undefined>();


    useEffect(() => {
        const msg = chat.messages[chat.messages.length - 1]?.content
        if (msg) {
            setLastMessageContent(msg)
        }
    }, [chat])

    useEffect(() => {
        const userId = chat.messages[chat.messages.length - 1]?.userId
        getUser(userId)
    }, [lastMessageContent])

    async function getUser(userId: string) {
        const currUser = await userService.getUser(userId);
        setLastMessageUser(currUser.displayName)
    }
    return <div className={`list-item chat-preview ${chatPreviewHovered ? 'chat-preview-hovered' : ''}`}
        key={chat.id}
        onMouseEnter={() => setChatPreviewHovered(chat.id)}
        onMouseLeave={() => setChatPreviewHovered(undefined)}
        onClick={() => {
            dispatch(setCurrentChat(chat.id))
        }}>
        <Avatar alt={`${chat.name}`} />
        <div className="chat-preview-deatils-container">
            <span className="chat-preview-name">{utilService.getTxtToShow(chat.name, 20)}</span>
            <span className="chat-preview-last-message">{lastMessageUser}: {lastMessageContent && utilService.getTxtToShow(lastMessageContent, 10) || "No messages yet"}</span>
        </div>
    </div>
}