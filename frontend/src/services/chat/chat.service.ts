import axios from "axios"
import { ChatDto } from "./chat.dto"
import { MessageDto } from "../messages/Message.dto"
import { Chat } from "./chat.entity"
import { httpService } from "../http.service"

export const chatService = {
    getChat,
    query,
    removeChat,
    editChat,
    addChat,
    sendMessage,
    editMessage,
    removeMessage,
}

function getChat(id: string): Promise<Chat> {
    return httpService.get(`http://localhost:3030/api/chat/${id}`)

}
function query(): Promise<Record<string, Chat>> {
    return httpService.get("http://localhost:3030/api/chat")
}

function removeChat(id: string) {
    return httpService.remove(`http://localhost:3030/api/chat/${id}`)
}

function editChat(id: string, chatDto: ChatDto) {
    return httpService.put(`http://localhost:3030/api/chat/${id}`, chatDto)
}

function addChat(chatDto: ChatDto) {
    return httpService.post(`http://localhost:3030/api/chat`, chatDto)
}

function sendMessage(messageDto: MessageDto) {
    return httpService.post(`http://localhost:3030/api/chat/message`, messageDto)
}

function editMessage(id: string, messageDto: MessageDto) {
    return axios.put(`http://localhost:3030/api/chat/message/${id}`, messageDto)
}

function removeMessage(id: string) {
    return axios.delete(`http://localhost:3030/api/chat/message/${id}`)

}

