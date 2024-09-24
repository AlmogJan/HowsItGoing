import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { ChatPreview } from "./ChatPreview"
import { useEffect } from "react"

export function ChatList() {
    const chats = useSelector((state: RootState) => state.chats.chats)
    useEffect(() => {
        console.log(chats);
    }, [])
    return <div className="chat-list">
        <div className="text-input-container">
            <input type="text" className="text-input" placeholder="search chat" />
            <button className="svg-button">
                <img src="https://res.cloudinary.com/do4agaebw/image/upload/v1725364215/search_vmdqno.svg" alt="" />
            </button>
        </div>
        {Object.values(chats).map((chat, index) => (
            <ChatPreview key={index} chat={chat} />
        ))}
    </div>
}