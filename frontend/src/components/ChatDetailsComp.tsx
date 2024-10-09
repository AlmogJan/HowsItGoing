import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { useEffect, useState } from "react"
import { chatService } from "../services/chat/chat.service"
import { ChatDto } from "../services/chat/ChatDto"
import { Insertimg } from "./InsertImg"
import { AuthLevel } from "../services/user/user.entity"


export function ChatDetailsComp() {
    const loggedInUser = useSelector((state: RootState) => state.user)
    const chats = useSelector((state: RootState) => state.chats.chats)
    const currentChatId = useSelector((state: RootState) => state.currentChat.chatId)
    const currentChat = currentChatId ? chats[currentChatId] : undefined
    const [chatNameEditMode, setChatNameEditMode] = useState<boolean>(false)
    const [chatNameEditContent, setChatNameEditContent] = useState<string | undefined>()
    const [chatDescEditMode, setChatDescEditMode] = useState<boolean>(false)
    const [chatDescEditContent, setChatDescEditContent] = useState<string | undefined>()

    useEffect(() => {
        setChatNameEditContent(currentChat?.name)
        setChatDescEditContent(currentChat?.desc)
    }, [currentChat])

    return <div className="chat-details-comp">
        {loggedInUser.isAuthenticated && loggedInUser.user.authLevel === AuthLevel.Admin ?
            <Insertimg />
            :
            <img className="chat-details-img" src={currentChat?.image} alt="" />
        }
        {chatNameEditMode ?
            <div className="chat-details-title text-input-container">
                <input className="text-input" type="text" value={chatNameEditContent} onChange={(ev) => setChatNameEditContent(ev.target.value)} />
                <button className="svg-button"
                    onClick={() => {
                        if (currentChatId && currentChat && chatNameEditContent) {
                            const chatDto: ChatDto = {
                                name: chatNameEditContent,
                                description: currentChat?.desc,
                                image: currentChat?.desc,
                            }
                            chatService.editChat(currentChatId, chatDto)
                        }
                        setChatNameEditMode(false)
                    }
                    }>
                    <img src="https://res.cloudinary.com/do4agaebw/image/upload/v1725364214/V_dppo4c.svg" alt="" />
                </button>
            </div>
            :
            <div className="chat-details-title">
                <span className="chat-details-name">{currentChat?.name}</span>
                {loggedInUser.isAuthenticated && loggedInUser.user.authLevel === AuthLevel.Admin ?
                    <button className="svg-button"
                        onClick={() =>
                            setChatNameEditMode(true)
                        }>
                        <img src="https://res.cloudinary.com/do4agaebw/image/upload/v1727259739/edit_slv8jc.svg" alt="" />
                    </button>
                    :
                    <></>
                }
            </div>
        }
        <span className="chat-details-number-members">
            Group ● {currentChatId ? `${currentChat?.usersNumber} Members` : ""}</span>
        <div>

        </div>
        {chatDescEditMode ?
            <div className="chat-desc text-input-container">
                <input className="text-input" type="text" value={chatDescEditContent} onChange={(ev) => setChatDescEditContent(ev.target.value)} />
                <button className="svg-button"
                    onClick={() => {
                        if (currentChatId && currentChat && chatDescEditContent) {
                            const chatDto: ChatDto = {
                                name: currentChat.name,
                                description: chatDescEditContent,
                                image: currentChat?.desc,
                            }
                            chatService.editChat(currentChatId, chatDto)
                        }
                        setChatDescEditMode(false)
                    }
                    }>
                    <img src="https://res.cloudinary.com/do4agaebw/image/upload/v1725364214/V_dppo4c.svg" alt="" />
                </button>
            </div>
            :
            <div className="chat-desc">
                <span>
                    {currentChat?.desc}
                </span>
                {loggedInUser.isAuthenticated && loggedInUser.user.authLevel === AuthLevel.Admin ?
                    <button className="svg-button"
                        onClick={() =>
                            setChatDescEditMode(true)
                        }>
                        <img src="https://res.cloudinary.com/do4agaebw/image/upload/v1727259739/edit_slv8jc.svg" alt="" />
                    </button>
                    :
                    <></>
                }
            </div>
        }
    </div >

}