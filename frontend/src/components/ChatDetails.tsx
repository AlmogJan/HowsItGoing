import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useEffect, useState } from "react";
import { ChatDetailsContent, setOpenFalse } from "../store/chat/chatDetails.reducer";
import { ChatDetailsComp } from "./ChatDetailsComp";
import { AddChatComp } from "./AddChatComp";

export function ChatDetails() {
    const currentChatId = useSelector((state: RootState) => state.currentChat.chatId)
    const chatDetailsState = useSelector((state: RootState) => state.chatDetailsState)
    const chats = useSelector((state: RootState) => state.chats.chats)
    const isLoggedInUser = useSelector((state: RootState) => state.user.isAuthenticated)
    const dispatch = useDispatch()
    const [isLoggedInUserState, setIsLoggedInUserState] = useState<Boolean>(false)
    const currentChat = currentChatId ? chats[currentChatId] : undefined
    useEffect(() => {
        setIsLoggedInUserState(isLoggedInUser)
    }, [isLoggedInUser])

    return <div className="chat-details">
        {isLoggedInUserState ?
            <>
                <div className="chat-details-header">
                    <button className="svg-button"
                        onClick={() => {
                            dispatch(setOpenFalse())
                        }}
                    >
                        <img src="https://res.cloudinary.com/do4agaebw/image/upload/v1725364214/back_kd4mm9.svg" alt="" />
                    </button>
                    <span>
                        {chatDetailsState.compTitle}
                    </span>
                </div >
                <div>
                    {chatDetailsState.content === ChatDetailsContent.Details ?
                        <ChatDetailsComp /> : <AddChatComp />
                    }
                </div>
            </>
            :
            <></>
        }
    </div>
}

