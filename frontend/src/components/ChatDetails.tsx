import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";

export function ChatDetails() {
    const currentChatId = useSelector((state: RootState) => state.currentChat.chatId)
    const chats = useSelector((state: RootState) => state.chats.chats)
    const isLoggedInUser = useSelector((state: RootState) => state.user.isAuthenticated)
    const [isLoggedInUserState, setIsLoggedInUserState] = useState<Boolean>(false)
    const currChat = currentChatId ? chats[currentChatId] : undefined
    useEffect(() => {
        setIsLoggedInUserState(isLoggedInUser)
    }, [isLoggedInUser])
    return <div className="chat-details">
        {isLoggedInUser ?
            <>
                <div className="chat-details-header">
                    <button className="svg-button">
                        <img src="https://res.cloudinary.com/do4agaebw/image/upload/v1725364214/back_kd4mm9.svg" alt="" />
                    </button>
                    <span>Chat Details</span>
                </div >
                <div className="chat-details-title">
                    <span className="chat-details-name">{currChat?.name}</span>
                </div>
                <div className="chat-desc">
                    {currChat?.desc}
                </div>

            </> : <></>}
    </div>
}

