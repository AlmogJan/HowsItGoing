import axios from "axios"

export const messageService = {
    getMessages
}

async function getMessages() {
    try {
        const result = await axios.get('http://localhost:3030/api/messages')
        return result.data
    } catch (err) {
        console.error(`failed to fetch messages from DB, Error: ${err}`)
    }
}