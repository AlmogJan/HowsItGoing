import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { useEffect, useState } from "react"
import { chatService } from "../services/chat/chat.service"
import { ChatDto } from "../services/chat/ChatDto"
import { Insertimg } from "./InsertImg"


export function ChatDetailsComp() {
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

    // useEffect(() => {
    //     console.log('chatNameEditContent', chatNameEditContent);
    // }, [chatNameEditContent])
    // useEffect(() => {
    //     console.log('chatDescEditContent', chatDescEditContent);
    // }, [chatDescEditContent])

    // useEffect(() => {
    //     console.log('chatNameEditMode', chatNameEditMode);
    // }, [chatNameEditMode])

    // useEffect(() => {
    //     console.log('chatDescEditMode', chatDescEditMode);
    // }, [chatDescEditMode])

    return <div className="chat-details-comp">
        <Insertimg />
        {chatNameEditMode ?
            <div className="chat-details-title">
                <input type="text" value={chatNameEditContent} onChange={(ev) => setChatNameEditContent(ev.target.value)} />
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
                <button className="svg-button"
                    onClick={() =>
                        setChatNameEditMode(true)
                    }>
                    <img src="https://res.cloudinary.com/do4agaebw/image/upload/v1727259739/edit_slv8jc.svg" alt="" />
                </button>
            </div>
        }
        <span className="chat-details-number-members">
            Group ● {currentChatId ? `${currentChat?.usersNumber} Members` : ""}</span>
        <div>

        </div>
        {chatDescEditMode ?
            <div className="chat-desc">
                <input type="text" value={chatDescEditContent} onChange={(ev) => setChatDescEditContent(ev.target.value)} />
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
                <button className="svg-button"
                    onClick={() =>
                        setChatDescEditMode(true)
                    }>
                    <img src="https://res.cloudinary.com/do4agaebw/image/upload/v1727259739/edit_slv8jc.svg" alt="" />
                </button>
            </div>

        }

    </div >

}