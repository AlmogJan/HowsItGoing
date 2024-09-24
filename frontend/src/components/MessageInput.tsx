import { useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"
import { MessageDto } from "../services/messages/Message.dto"
import { ContentType } from "../services/messages/Message.entity"
import { chatService } from "../services/chat/chat.service"

export function MessageInput() {
    const currentChatId = useSelector((state: RootState) => state.currentChat.chatId)
    const [msgToSend, setMsgToSend] = useState('')

    async function postMessage(messageDto: MessageDto) {
        if (currentChatId) {
            await chatService.sendMessage(messageDto)
            setMsgToSend('')
        }
    }
    return <div className="message-input-container message-input">
        <div className="text-input-container ">
            <input className="text-input" type="text" placeholder="type message" value={msgToSend} onChange={(ev) => setMsgToSend(ev.target.value)} />
            <button className="svg-button" onClick={() => {
                if (currentChatId) {
                    postMessage({
                        chatId: currentChatId,
                        contentType: ContentType.Text,
                        content: msgToSend.trim()
                    })
                }
            }}>
                <img src="https://res.cloudinary.com/do4agaebw/image/upload/v1725364214/send_v9e0s2.svg" alt="" />
            </button>
        </div>
    </div>
}