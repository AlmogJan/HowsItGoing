import { MessageDto } from "../messages/message.dto";
import { ContentType, Message } from "../messages/message.entity";
import { utilService } from "../util.service";
import { ChatDto } from "./chat.dto";
import { Chat } from "./chat.entity";
let messages: Message[] = [{
    id: '0gbe6fwa9617vktx',
    userId: '85hfnsgrpmfkhi2',
    contentType: ContentType.Text,
    content: 'Hi!',
    timestamp: 1725274183896,
}, {
    id: '0gbe6fwa9617vktx',
    userId: '85hfnsgrpmfkhi2',
    contentType: ContentType.Text,
    content: 'winter is coming!',
    timestamp: 1725274183896,
}];

let chats: Record<string, Chat> = {
    'KAdp26Hhd2f6XUqQu': {
        id: 'KAdp26Hhd2f6XUqQu',
        name: 'Dog Lovers! 🐕❤️',
        desc: 'a community for dog lovers from all around the world',
        image: 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII',
        usersNumber: 45,
        messages: []
    }, 'fA3ivP5vhQP68UB4t': {
        id: 'fA3ivP5vhQP68UB4t',
        name: 'A song of ice and fire fans ⚔️ ❄️ 👑',
        desc: 'We are the watchers of tv',
        image: 'iVBORw0KGgoAAAANSUhEUgAAAAgAAAAIAQMAAAD+wSzIAAAABlBMVEX///+/v7+jQ3Y5AAAADklEQVQI12P4AIX8EAgALgAD/aNpbtEAAAAASUVORK5CYII',
        usersNumber: 659,
        messages: messages
    }
}

export const chatService = {
    query,
    getById,
    add,
    remove,
    edit,
    getMessageById,
    addMessage,
    removeMessage,
    editMessage
}

function query() {
    return chats || null
}

function getById(id: string) {
    return chats[id] || null
}

function add(chatPostDto: ChatDto) {
    if (chatPostDto.name.length < 1) {
        throw {
            status: 400,
            message: 'A chat name need to be at least 1 char long'
        }
    }
    const newChat: Chat = {
        id: utilService.makeId(),
        name: chatPostDto.name,
        desc: chatPostDto.description,
        image: chatPostDto.image,
        usersNumber: 0,
        messages: []
    }
    chats[newChat.id] = newChat;
}

function remove(id: string) {
    try {
        delete chats[id]
        return true
    } catch (err) {
        console.log(`Chat with id: ${id} not found to remove`);
        return false
    }
}

function edit(id: string, ChatDto: ChatDto) {
    const chat = getById(id)
    if (chat) {
        chats[id] = {
            id,
            name: ChatDto.name,
            desc: ChatDto.description,
            image: ChatDto.image,
            usersNumber: chat.usersNumber,
            messages: chat.messages,
        }
        return true
    }
    return false
}

function getMessageById(messageId: string) {
    return messages.find(message => message.id === messageId) || null
}

function getMessageIndex(messageId: string) {
    return messages.findIndex(message => message.id === messageId)
}


function addMessage(userId: string, messageDto: MessageDto) {
    const chat = getById(messageDto.chatId)

    const newMessage: Message = {
        id: utilService.makeId(),
        userId: userId,
        timestamp: Date.now(),
        contentType: messageDto.contentType,
        content: messageDto.content,
    }
    chat.messages.push(newMessage)
}

function removeMessage(id: string) {
    const messageIndex = getMessageIndex(id)
    if (messageIndex === -1) {
        return false
    }
    messages.splice(messageIndex, 1)
    return true

}

function editMessage(id: string, messageDto: MessageDto) {
    const messageIndex = getMessageIndex(id)
    if (messageIndex === -1) {
        return false
    }
    const message = {
        id,
        userId: messages[messageIndex].userId,
        contentType: messageDto.contentType,
        content: messageDto.content,
        timestamp: messages[messageIndex].timestamp,
    }
    messages[messageIndex] = message
    return true
}

