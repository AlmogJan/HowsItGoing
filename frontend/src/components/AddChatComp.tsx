import { useState } from "react";
import { Insertimg } from "./InsertImg";
import { ChatDto } from "../services/chat/ChatDto";
import { chatService } from "../services/chat/chat.service";

export function AddChatComp() {
    const [newChatName, setNewChatName] = useState<string>('')
    const [newChatDesc, setNewChatDesc] = useState<string>('')
    return <div className="add-chat-comp">
        <Insertimg />
        <div className="text-input-container">
            <input className="text-input" type="text" value={newChatName} placeholder="Group Chat Name" onChange={(ev) => setNewChatName(ev.target.value)} />
        </div>
        <div className="text-input-container">
            <input className="text-input" type="text" value={newChatDesc} placeholder="Group Chat description" onChange={(ev) => setNewChatDesc(ev.target.value)} />
        </div>
        <button className="primary-button" onClick={() => {
            const addChatDto: ChatDto = {
                name: newChatName,
                description: newChatDesc,
                image: 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII'
            }
            chatService.addChat(addChatDto)
        }}>
            Create New Chat
        </button>
    </div>
}